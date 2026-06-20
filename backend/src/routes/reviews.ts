import { Hono } from 'hono';
import { z } from 'zod';
import { queryAll, queryOne, run } from '../db.js';
import { authenticate, requireAdmin } from '../middleware/auth.js';
import type { Review } from '../types.js';

const reviewSchema = z.object({
  productId: z.number().int(),
  name: z.string().min(1),
  displayName: z.string().min(1),
  rating: z.number().int().min(1).max(5),
  reviewText: z.string().min(10),
});

const app = new Hono();

function rowToReview(row: Record<string, unknown>): Review {
  return {
    id: row.id as number,
    productId: row.product_id as number,
    name: row.name as string,
    displayName: row.display_name as string,
    rating: row.rating as number,
    reviewText: row.review_text as string,
    approved: Boolean(row.approved),
    helpful: row.helpful as number,
    createdAt: row.created_at as string,
  };
}

app.get('/', (c) => {
  const productId = c.req.query('productId');
  let rows: Record<string, unknown>[];
  if (productId) {
    rows = queryAll(
      'SELECT * FROM reviews WHERE product_id = ? AND approved = 1 ORDER BY helpful DESC, created_at DESC',
      [productId]
    ) as Record<string, unknown>[];
  } else {
    rows = queryAll(
      'SELECT * FROM reviews WHERE approved = 1 ORDER BY helpful DESC, created_at DESC'
    ) as Record<string, unknown>[];
  }
  return c.json(rows.map(rowToReview));
});

app.get('/all', authenticate, requireAdmin, (c) => {
  const rows = queryAll('SELECT * FROM reviews ORDER BY created_at DESC') as Record<string, unknown>[];
  return c.json(rows.map(rowToReview));
});

app.get('/stats/:productId', (c) => {
  const productId = parseInt(c.req.param('productId'), 10);
  const stats = queryOne(
    `SELECT COUNT(*) as count, COALESCE(AVG(rating), 0) as average
     FROM reviews WHERE product_id = ? AND approved = 1`,
    [productId]
  ) as { count: number; average: number };
  return c.json({
    productId,
    count: stats.count,
    average: Number(stats.average.toFixed(1)),
  });
});

app.post('/', async (c) => {
  const body = await c.req.json();
  const parsed = reviewSchema.safeParse(body);
  if (!parsed.success) return c.json({ message: 'Invalid review data', errors: parsed.error.flatten() }, 400);

  const data = parsed.data;
  const result = run(
    'INSERT INTO reviews (product_id, name, display_name, rating, review_text, approved) VALUES (?, ?, ?, ?, ?, ?)',
    [data.productId, data.name, data.displayName, data.rating, data.reviewText, 0]
  );

  const row = queryOne('SELECT * FROM reviews WHERE id = ?', [Number(result.lastInsertRowid)]) as Record<string, unknown>;
  return c.json(rowToReview(row), 201);
});

app.put('/:id/approve', authenticate, requireAdmin, (c) => {
  const id = parseInt(c.req.param('id'), 10);
  run('UPDATE reviews SET approved = 1 WHERE id = ?', [id]);
  const row = queryOne('SELECT * FROM reviews WHERE id = ?', [id]) as Record<string, unknown>;
  if (!row) return c.json({ message: 'Review not found' }, 404);
  return c.json(rowToReview(row));
});

app.put('/:id/hide', authenticate, requireAdmin, (c) => {
  const id = parseInt(c.req.param('id'), 10);
  run('UPDATE reviews SET approved = 0 WHERE id = ?', [id]);
  const row = queryOne('SELECT * FROM reviews WHERE id = ?', [id]) as Record<string, unknown>;
  if (!row) return c.json({ message: 'Review not found' }, 404);
  return c.json(rowToReview(row));
});

app.delete('/:id', authenticate, requireAdmin, (c) => {
  const id = parseInt(c.req.param('id'), 10);
  const existing = queryOne('SELECT * FROM reviews WHERE id = ?', [id]) as Record<string, unknown> | undefined;
  if (!existing) return c.json({ message: 'Review not found' }, 404);
  run('DELETE FROM reviews WHERE id = ?', [id]);
  return c.json({ success: true });
});

export default app;
