import { Hono } from 'hono';
import { z } from 'zod';
import { queryAll, queryOne, run } from '../db.js';
import { authenticate, requireAdmin } from '../middleware/auth.js';
import type { Subscriber } from '../types.js';

const subscriberSchema = z.object({
  email: z.string().email(),
  source: z.string().default('website'),
});

const app = new Hono();

function rowToSubscriber(row: Record<string, unknown>): Subscriber {
  return {
    id: row.id as number,
    email: row.email as string,
    source: row.source as string,
    status: row.status as 'active' | 'unsubscribed',
    createdAt: row.created_at as string,
  };
}

app.get('/', authenticate, requireAdmin, (c) => {
  const rows = queryAll('SELECT * FROM subscribers ORDER BY created_at DESC') as Record<string, unknown>[];
  return c.json(rows.map(rowToSubscriber));
});

app.post('/', async (c) => {
  const body = await c.req.json();
  const parsed = subscriberSchema.safeParse(body);
  if (!parsed.success) return c.json({ message: 'Invalid email' }, 400);

  const { email, source } = parsed.data;
  const existing = queryOne('SELECT * FROM subscribers WHERE email = ?', [email]) as Record<string, unknown> | undefined;
  if (existing) {
    return c.json(rowToSubscriber(existing));
  }

  const result = run('INSERT INTO subscribers (email, source) VALUES (?, ?)', [email, source]);
  const row = queryOne('SELECT * FROM subscribers WHERE id = ?', [Number(result.lastInsertRowid)]) as Record<string, unknown>;
  return c.json(rowToSubscriber(row), 201);
});

app.put('/:id/unsubscribe', authenticate, requireAdmin, (c) => {
  const id = parseInt(c.req.param('id'), 10);
  run("UPDATE subscribers SET status = 'unsubscribed' WHERE id = ?", [id]);
  const row = queryOne('SELECT * FROM subscribers WHERE id = ?', [id]) as Record<string, unknown>;
  if (!row) return c.json({ message: 'Subscriber not found' }, 404);
  return c.json(rowToSubscriber(row));
});

app.delete('/:id', authenticate, requireAdmin, (c) => {
  const id = parseInt(c.req.param('id'), 10);
  const existing = queryOne('SELECT * FROM subscribers WHERE id = ?', [id]) as Record<string, unknown> | undefined;
  if (!existing) return c.json({ message: 'Subscriber not found' }, 404);
  run('DELETE FROM subscribers WHERE id = ?', [id]);
  return c.json({ success: true });
});

export default app;
