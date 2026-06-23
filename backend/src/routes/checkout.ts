import { Hono } from 'hono';
import { z } from 'zod';
import crypto from 'crypto';
import { queryOne, run } from '../db.js';
import { config } from '../config.js';
import { createOrder, fulfillOrderByCheckoutId, fulfillOrderByExternalId } from './orders.js';
import { trackEvent } from '../services/analytics.js';
import type { Order } from '../types.js';
import { sendDownloadConfirmation } from '../services/email.js';

const checkoutSchema = z.object({
  slug: z.string(),
  email: z.string().email(),
  name: z.string().optional(),
});

const app = new Hono();

const LS_API_BASE = 'https://api.lemonsqueezy.com/v1';

async function lemonsqueezyRequest(path: string, options: RequestInit = {}) {
  const res = await fetch(`${LS_API_BASE}${path}`, {
    ...options,
    headers: {
      Accept: 'application/vnd.api+json',
      'Content-Type': 'application/vnd.api+json',
      Authorization: `Bearer ${config.lemonsqueezy.apiKey}`,
      ...options.headers,
    },
  });
  return res;
}

app.post('/session', async (c) => {
  const body = await c.req.json();
  const parsed = checkoutSchema.safeParse(body);
  if (!parsed.success) return c.json({ message: 'Invalid checkout data' }, 400);

  const { slug, email, name } = parsed.data;
  const product = queryOne('SELECT * FROM products WHERE slug = ? AND visibility = ?', [slug, 'visible']) as
    | Record<string, unknown>
    | undefined;
  if (!product) return c.json({ message: 'Product not found' }, 404);

  const externalUrl = (product.external_checkout_url as string | undefined) || '';

  const order = createOrder({
    email,
    name,
    productId: product.id as number,
    amount: product.price as number,
    status: 'pending',
  });

  trackEvent({
    eventType: 'checkout_start',
    payload: { productId: product.id, productSlug: slug, orderId: order.id },
    path: `/checkout/${slug}`,
  });

  if (externalUrl) {
    const checkoutUrl = new URL(externalUrl);
    checkoutUrl.searchParams.set('email', email);
    if (name) checkoutUrl.searchParams.set('name', name);
    return c.json({ checkoutId: null, url: checkoutUrl.toString() });
  }

  if (!config.lemonsqueezy.apiKey || !config.lemonsqueezy.storeId) {
    return c.json({ message: 'No checkout URL configured for this product. Add an external checkout URL in the admin panel or configure a payment provider.' }, 503);
  }

  const variantId = product.lemonsqueezy_variant_id as string | undefined;
  if (!variantId || variantId.startsWith('ls_variant_')) {
    return c.json({ message: 'Payment not configured for this product' }, 400);
  }

  const redirectUrl = `${config.frontendUrl}/thank-you`;

  const res = await lemonsqueezyRequest('/checkouts', {
    method: 'POST',
    body: JSON.stringify({
      data: {
        type: 'checkouts',
        attributes: {
          product_options: {
            redirect_url: redirectUrl,
          },
          checkout_data: {
            email,
            name: name || '',
            custom: {
              quietOrderId: String(order.id),
            },
          },
        },
        relationships: {
          store: {
            data: {
              type: 'stores',
              id: config.lemonsqueezy.storeId,
            },
          },
          variant: {
            data: {
              type: 'variants',
              id: variantId,
            },
          },
        },
      },
    }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: 'Payment provider error' }));
    console.error('LemonSqueezy checkout error:', err);
    return c.json({ message: 'Unable to create checkout' }, 502);
  }

  const data = (await res.json()) as {
    data: {
      id: string;
      attributes: { url: string };
    };
  };
  const checkoutId = data.data.id;
  const checkoutUrl = data.data.attributes.url;

  run('UPDATE orders SET checkout_id = ? WHERE id = ?', [checkoutId, order.id]);

  return c.json({ checkoutId, url: checkoutUrl });
});

function verifyWebhookSignature(payload: string, signature: string, secret: string): boolean {
  const hmac = crypto.createHmac('sha256', secret);
  hmac.update(payload);
  const digest = hmac.digest('hex');
  return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(digest));
}

app.post('/webhook', async (c) => {
  if (!config.lemonsqueezy.webhookSecret) {
    return c.json({ received: true });
  }

  const signature = c.req.header('X-Signature') || '';
  const rawBody = await c.req.raw.text();

  if (!verifyWebhookSignature(rawBody, signature, config.lemonsqueezy.webhookSecret)) {
    return c.json({ message: 'Invalid signature' }, 400);
  }

  let event: Record<string, unknown>;
  try {
    event = JSON.parse(rawBody);
  } catch {
    return c.json({ message: 'Invalid payload' }, 400);
  }

  const eventMeta = event.meta as Record<string, unknown> | undefined;
  const eventName = eventMeta?.event_name as string | undefined;
  const eventData = event.data as Record<string, unknown> | undefined;
  if (!eventName || !eventData) {
    return c.json({ received: true });
  }

  if (eventName === 'order_created') {
    const customData = (eventMeta?.custom_data as Record<string, unknown> | undefined) || {};
    const attrs = eventData.attributes as Record<string, unknown>;
    const relationships = eventData.relationships as Record<string, { data?: { id: string } }>;
    const externalOrderId = String(eventData.id);
    const checkoutId = relationships?.checkout?.data?.id;
    const customerEmail = (attrs.user_email as string) || (attrs.customer_email as string) || '';
    const quietOrderId = customData.quietOrderId ? Number(customData.quietOrderId) : null;

    let order: ReturnType<typeof fulfillOrderByCheckoutId> | undefined;
    if (checkoutId) {
      order = fulfillOrderByCheckoutId(checkoutId);
    }
    if (!order && quietOrderId) {
      const pendingOrder = queryOne('SELECT * FROM orders WHERE id = ? AND status = ?', [quietOrderId, 'pending']) as
        | Record<string, unknown>
        | undefined;
      if (pendingOrder) {
        run("UPDATE orders SET status = 'paid', updated_at = CURRENT_TIMESTAMP WHERE id = ?", [pendingOrder.id as number]);
        order = queryOne('SELECT * FROM orders WHERE id = ?', [pendingOrder.id as number]) as unknown as Order;
      }
    }
    if (!order && externalOrderId) {
      order = fulfillOrderByExternalId(externalOrderId);
    }

    if (order) {
      if (customerEmail && customerEmail !== order.email) {
        run('UPDATE orders SET email = ? WHERE id = ?', [customerEmail, order.id]);
        order = { ...order, email: customerEmail };
      }
      run('UPDATE orders SET external_order_id = ? WHERE id = ?', [externalOrderId, order.id]);

      trackEvent({
        eventType: 'purchase',
        payload: { orderId: order.id, productId: order.productId },
      });
      trackEvent({
        eventType: 'revenue',
        payload: String(order.amount),
      });

      const product = queryOne('SELECT * FROM products WHERE id = ?', [order.productId]) as Record<string, unknown>;
      if (product) {
        const downloadUrl = `${config.frontendUrl}/download?token=${order.downloadToken}`;
        sendDownloadConfirmation(
          order.email,
          downloadUrl,
          product.title as string
        ).catch((err) => console.error('Failed to send download email:', err));
      }
    }
  }

  if (eventName === 'order_refunded') {
    const externalOrderId = String(eventData.id);
    const order = queryOne('SELECT * FROM orders WHERE external_order_id = ?', [externalOrderId]) as
      | Record<string, unknown>
      | undefined;
    if (order) {
      run("UPDATE orders SET status = 'refunded', updated_at = CURRENT_TIMESTAMP WHERE id = ?", [order.id as number]);
    }
  }

  return c.json({ received: true });
});

app.get('/verify/:token', (c) => {
  const token = c.req.param('token');
  const order = queryOne('SELECT * FROM orders WHERE download_token = ? AND status = ?', [token, 'paid']) as
    | Record<string, unknown>
    | undefined;
  if (!order) return c.json({ message: 'Invalid or unpaid order' }, 404);

  const product = queryOne('SELECT * FROM products WHERE id = ?', [order.product_id as number]) as Record<string, unknown>;
  return c.json({
    orderId: order.id,
    email: order.email,
    product: {
      id: product.id,
      title: product.title,
      pdfUrl: product.pdf_url,
      epubUrl: product.epub_url,
    },
  });
});

app.get('/verify-session', (c) => {
  const checkoutId = c.req.query('checkout_id');
  if (!checkoutId) return c.json({ message: 'Checkout ID required' }, 400);

  const order = queryOne('SELECT * FROM orders WHERE checkout_id = ? AND status = ?', [checkoutId, 'paid']) as
    | Record<string, unknown>
    | undefined;
  if (!order) return c.json({ message: 'Order not found or not paid' }, 404);

  const product = queryOne('SELECT * FROM products WHERE id = ?', [order.product_id as number]) as Record<string, unknown>;
  return c.json({
    orderId: order.id,
    downloadToken: order.download_token,
    email: order.email,
    product: {
      id: product.id,
      title: product.title,
      pdfUrl: product.pdf_url,
      epubUrl: product.epub_url,
    },
  });
});

export default app;
