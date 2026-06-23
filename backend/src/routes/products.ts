import { Hono } from 'hono';
import { z } from 'zod';
import { queryAll, queryOne, run } from '../db.js';
import type { BindParams } from 'sql.js';
import { authenticate, requireAdmin } from '../middleware/auth.js';
import type { Product } from '../types.js';

const productSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  subtitle: z.string().min(1),
  description: z.string().min(1),
  shortDescription: z.string().min(1),
  price: z.number().int().positive(),
  comparePrice: z.number().int().positive(),
  stock: z.number().int().min(0).default(0),
  lemonsqueezyVariantId: z.string().nullable().optional(),
  lemonsqueezyProductId: z.string().nullable().optional(),
  externalCheckoutUrl: z.string().url().nullable().optional(),
  coverImage: z.string().min(1),
  pdfUrl: z.string().min(1),
  epubUrl: z.string().min(1),
  visibility: z.enum(['visible', 'hidden']).default('visible'),
  featured: z.number().int().default(0),
  metaTitle: z.string().min(1),
  metaDescription: z.string().min(1),
});

const app = new Hono();

function rowToProduct(row: Record<string, unknown>): Product {
  return {
    id: row.id as number,
    slug: row.slug as string,
    title: row.title as string,
    subtitle: row.subtitle as string,
    description: row.description as string,
    shortDescription: row.short_description as string,
    price: row.price as number,
    comparePrice: row.compare_price as number,
    coverImage: row.cover_image as string,
    pdfUrl: row.pdf_url as string,
    epubUrl: row.epub_url as string,
    visibility: row.visibility as 'visible' | 'hidden',
    featured: row.featured as number,
    stock: (row.stock as number) ?? 0,
    lemonsqueezyVariantId: (row.lemonsqueezy_variant_id as string | null) ?? null,
    lemonsqueezyProductId: (row.lemonsqueezy_product_id as string | null) ?? null,
    externalCheckoutUrl: (row.external_checkout_url as string | null) ?? null,
    metaTitle: row.meta_title as string,
    metaDescription: row.meta_description as string,
    createdAt: row.created_at as string,
    updatedAt: row.updated_at as string,
  };
}

app.get('/', (c) => {
  const rows = queryAll(
    "SELECT * FROM products WHERE visibility = 'visible' ORDER BY featured ASC, id ASC"
  ) as Record<string, unknown>[];
  return c.json(rows.map(rowToProduct));
});

app.get('/all', authenticate, requireAdmin, (c) => {
  const rows = queryAll('SELECT * FROM products ORDER BY featured ASC, id ASC') as Record<string, unknown>[];
  return c.json(rows.map(rowToProduct));
});

app.get('/:slug', (c) => {
  const slug = c.req.param('slug');
  const row = queryOne("SELECT * FROM products WHERE slug = ? AND visibility = 'visible'", [slug]) as Record<string, unknown> | undefined;
  if (!row) return c.json({ message: 'Product not found' }, 404);
  return c.json(rowToProduct(row));
});

app.post('/', authenticate, requireAdmin, async (c) => {
  const body = await c.req.json();
  const parsed = productSchema.safeParse(body);
  if (!parsed.success) return c.json({ message: 'Invalid product data', errors: parsed.error.flatten() }, 400);

  const data = parsed.data;
  const result = run(
    `INSERT INTO products (
      slug, title, subtitle, description, short_description, price, compare_price,
      cover_image, pdf_url, epub_url, visibility, featured, stock,
      lemonsqueezy_variant_id, lemonsqueezy_product_id, external_checkout_url, meta_title, meta_description
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      data.slug,
      data.title,
      data.subtitle,
      data.description,
      data.shortDescription,
      data.price,
      data.comparePrice,
      data.coverImage,
      data.pdfUrl,
      data.epubUrl,
      data.visibility,
      data.featured,
      data.stock,
      data.lemonsqueezyVariantId ?? null,
      data.lemonsqueezyProductId ?? null,
      data.externalCheckoutUrl ?? null,
      data.metaTitle,
      data.metaDescription,
    ]
  );

  const row = queryOne('SELECT * FROM products WHERE id = ?', [Number(result.lastInsertRowid)]) as Record<string, unknown>;
  return c.json(rowToProduct(row), 201);
});

app.put('/:id', authenticate, requireAdmin, async (c) => {
  const id = parseInt(c.req.param('id'), 10);
  const body = await c.req.json();
  const parsed = productSchema.partial().safeParse(body);
  if (!parsed.success) return c.json({ message: 'Invalid product data', errors: parsed.error.flatten() }, 400);

  const existing = queryOne('SELECT * FROM products WHERE id = ?', [id]) as Record<string, unknown> | undefined;
  if (!existing) return c.json({ message: 'Product not found' }, 404);

  const data = parsed.data;
  const fields: string[] = [];
  const values: BindParams = [];

  const map: Record<string, string> = {
    shortDescription: 'short_description',
    comparePrice: 'compare_price',
    coverImage: 'cover_image',
    pdfUrl: 'pdf_url',
    epubUrl: 'epub_url',
    metaTitle: 'meta_title',
    metaDescription: 'meta_description',
    stock: 'stock',
    lemonsqueezyVariantId: 'lemonsqueezy_variant_id',
    lemonsqueezyProductId: 'lemonsqueezy_product_id',
    externalCheckoutUrl: 'external_checkout_url',
  };

  for (const [key, value] of Object.entries(data)) {
    if (value !== undefined) {
      fields.push(`${map[key] || key} = ?`);
      values.push(value);
    }
  }

  if (fields.length === 0) return c.json({ message: 'No fields to update' }, 400);

  values.push(id);
  run(`UPDATE products SET ${fields.join(', ')}, updated_at = CURRENT_TIMESTAMP WHERE id = ?`, values);

  const row = queryOne('SELECT * FROM products WHERE id = ?', [id]) as Record<string, unknown>;
  return c.json(rowToProduct(row));
});

app.delete('/:id', authenticate, requireAdmin, (c) => {
  const id = parseInt(c.req.param('id'), 10);
  const existing = queryOne('SELECT * FROM products WHERE id = ?', [id]) as Record<string, unknown> | undefined;
  if (!existing) return c.json({ message: 'Product not found' }, 404);
  run('DELETE FROM products WHERE id = ?', [id]);
  return c.json({ success: true });
});

export default app;
