import { Hono } from 'hono';
import { queryAll, queryOne, run } from '../db.js';
import { authenticate, requireAdmin } from '../middleware/auth.js';
import type { Order } from '../types.js';
import crypto from 'crypto';

const app = new Hono();

function rowToOrder(row: Record<string, unknown>): Order {
  return {
    id: row.id as number,
    userId: row.user_id as number | null,
    email: row.email as string,
    name: (row.name as string) || '',
    productId: row.product_id as number,
    amount: row.amount as number,
    status: row.status as 'pending' | 'paid' | 'failed' | 'refunded',
    checkoutId: row.checkout_id as string | null,
    externalOrderId: row.external_order_id as string | null,
    downloadToken: row.download_token as string,
    createdAt: row.created_at as string,
    updatedAt: row.updated_at as string,
  };
}

export function createOrder(input: {
  email: string;
  name?: string;
  productId: number;
  amount: number;
  checkoutId?: string;
  externalOrderId?: string;
  status?: Order['status'];
}): Order {
  const token = crypto.randomBytes(32).toString('hex');
  const result = run(
    'INSERT INTO orders (email, name, product_id, amount, status, checkout_id, external_order_id, download_token) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    [
      input.email,
      input.name || null,
      input.productId,
      input.amount,
      input.status || 'pending',
      input.checkoutId || null,
      input.externalOrderId || null,
      token,
    ]
  );
  return queryOne('SELECT * FROM orders WHERE id = ?', [Number(result.lastInsertRowid)]) as unknown as Order;
}

export function fulfillOrderByExternalId(externalOrderId: string): Order | undefined {
  const order = queryOne('SELECT * FROM orders WHERE external_order_id = ?', [externalOrderId]) as
    | Record<string, unknown>
    | undefined;
  if (!order) return undefined;
  run("UPDATE orders SET status = 'paid', updated_at = CURRENT_TIMESTAMP WHERE id = ?", [order.id as number]);
  return rowToOrder(queryOne('SELECT * FROM orders WHERE id = ?', [order.id as number]) as Record<string, unknown>);
}

export function fulfillOrderByCheckoutId(checkoutId: string): Order | undefined {
  const order = queryOne('SELECT * FROM orders WHERE checkout_id = ?', [checkoutId]) as
    | Record<string, unknown>
    | undefined;
  if (!order) return undefined;
  run("UPDATE orders SET status = 'paid', updated_at = CURRENT_TIMESTAMP WHERE id = ?", [order.id as number]);
  return rowToOrder(queryOne('SELECT * FROM orders WHERE id = ?', [order.id as number]) as Record<string, unknown>);
}

app.get('/', authenticate, requireAdmin, (c) => {
  const status = c.req.query('status');
  let rows: Record<string, unknown>[];
  if (status) {
    rows = queryAll('SELECT * FROM orders WHERE status = ? ORDER BY created_at DESC', [status]) as Record<string, unknown>[];
  } else {
    rows = queryAll('SELECT * FROM orders ORDER BY created_at DESC') as Record<string, unknown>[];
  }
  return c.json(rows.map(rowToOrder));
});

app.get('/:id', authenticate, requireAdmin, (c) => {
  const id = parseInt(c.req.param('id'), 10);
  const row = queryOne('SELECT * FROM orders WHERE id = ?', [id]) as Record<string, unknown> | undefined;
  if (!row) return c.json({ message: 'Order not found' }, 404);
  return c.json(rowToOrder(row));
});

app.put('/:id/status', authenticate, requireAdmin, async (c) => {
  const id = parseInt(c.req.param('id'), 10);
  const { status } = await c.req.json();
  const validStatuses = ['pending', 'paid', 'failed', 'refunded'];
  if (!validStatuses.includes(status)) return c.json({ message: 'Invalid status' }, 400);
  run('UPDATE orders SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?', [status, id]);
  const row = queryOne('SELECT * FROM orders WHERE id = ?', [id]) as Record<string, unknown>;
  return c.json(rowToOrder(row));
});

app.delete('/:id', authenticate, requireAdmin, (c) => {
  const id = parseInt(c.req.param('id'), 10);
  const row = queryOne('SELECT * FROM orders WHERE id = ?', [id]) as Record<string, unknown> | undefined;
  if (!row) return c.json({ message: 'Order not found' }, 404);
  run('DELETE FROM orders WHERE id = ?', [id]);
  return c.json({ success: true, message: 'Order deleted' });
});

export default app;
