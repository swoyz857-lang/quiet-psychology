import { Hono } from 'hono';
import { z } from 'zod';
import { queryAll, queryOne, run } from '../db.js';
import { authenticate, requireAdmin } from '../middleware/auth.js';
import type { SupportTicket } from '../types.js';

const ticketSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  subject: z.string().min(1),
  message: z.string().min(10),
});

const app = new Hono();

function rowToTicket(row: Record<string, unknown>): SupportTicket {
  return {
    id: row.id as number,
    name: row.name as string,
    email: row.email as string,
    subject: row.subject as string,
    message: row.message as string,
    status: row.status as 'open' | 'in_progress' | 'resolved',
    createdAt: row.created_at as string,
    updatedAt: row.updated_at as string,
  };
}

app.get('/', authenticate, requireAdmin, (c) => {
  const status = c.req.query('status');
  let rows: Record<string, unknown>[];
  if (status) {
    rows = queryAll('SELECT * FROM support_tickets WHERE status = ? ORDER BY created_at DESC', [
      status,
    ]) as Record<string, unknown>[];
  } else {
    rows = queryAll('SELECT * FROM support_tickets ORDER BY created_at DESC') as Record<string, unknown>[];
  }
  return c.json(rows.map(rowToTicket));
});

app.post('/', async (c) => {
  const body = await c.req.json();
  const parsed = ticketSchema.safeParse(body);
  if (!parsed.success) return c.json({ message: 'Invalid support ticket', errors: parsed.error.flatten() }, 400);

  const data = parsed.data;
  const result = run('INSERT INTO support_tickets (name, email, subject, message) VALUES (?, ?, ?, ?)', [
    data.name,
    data.email,
    data.subject,
    data.message,
  ]);

  const row = queryOne('SELECT * FROM support_tickets WHERE id = ?', [Number(result.lastInsertRowid)]) as Record<string, unknown>;
  return c.json(rowToTicket(row), 201);
});

app.put('/:id/status', authenticate, requireAdmin, async (c) => {
  const id = parseInt(c.req.param('id'), 10);
  const { status } = await c.req.json();
  const validStatuses = ['open', 'in_progress', 'resolved'];
  if (!validStatuses.includes(status)) return c.json({ message: 'Invalid status' }, 400);

  run('UPDATE support_tickets SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?', [status, id]);
  const row = queryOne('SELECT * FROM support_tickets WHERE id = ?', [id]) as Record<string, unknown>;
  if (!row) return c.json({ message: 'Ticket not found' }, 404);
  return c.json(rowToTicket(row));
});

app.delete('/:id', authenticate, requireAdmin, (c) => {
  const id = parseInt(c.req.param('id'), 10);
  const existing = queryOne('SELECT * FROM support_tickets WHERE id = ?', [id]) as Record<string, unknown> | undefined;
  if (!existing) return c.json({ message: 'Ticket not found' }, 404);
  run('DELETE FROM support_tickets WHERE id = ?', [id]);
  return c.json({ success: true });
});

export default app;
