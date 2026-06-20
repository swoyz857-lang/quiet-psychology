import { Hono } from 'hono';
import { z } from 'zod';
import { queryAll, queryOne, run } from '../db.js';
import { authenticate, requireAdmin } from '../middleware/auth.js';
import type { AnalyticsEvent } from '../types.js';

const eventSchema = z.object({
  eventType: z.string(),
  payload: z.record(z.unknown()).optional(),
  path: z.string().optional(),
  sessionId: z.string().optional(),
});

const app = new Hono();

function rowToEvent(row: Record<string, unknown>): AnalyticsEvent {
  return {
    id: row.id as number,
    eventType: row.event_type as string,
    payload: row.payload as string,
    path: row.path as string,
    sessionId: row.session_id as string,
    createdAt: row.created_at as string,
  };
}

app.get('/', authenticate, requireAdmin, (c) => {
  const days = parseInt(c.req.query('days') || '30', 10);
  const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString();

  const pageViews = (
    queryOne("SELECT COUNT(*) as count FROM analytics_events WHERE event_type = 'page_view' AND created_at > ?", [
      since,
    ]) as { count: number }
  ).count;

  const productViews = (
    queryOne("SELECT COUNT(*) as count FROM analytics_events WHERE event_type = 'product_view' AND created_at > ?", [
      since,
    ]) as { count: number }
  ).count;

  const emailSignups = (
    queryOne("SELECT COUNT(*) as count FROM analytics_events WHERE event_type = 'email_signup' AND created_at > ?", [
      since,
    ]) as { count: number }
  ).count;

  const checkoutStarts = (
    queryOne("SELECT COUNT(*) as count FROM analytics_events WHERE event_type = 'checkout_start' AND created_at > ?", [
      since,
    ]) as { count: number }
  ).count;

  const purchases = (
    queryOne("SELECT COUNT(*) as count FROM analytics_events WHERE event_type = 'purchase' AND created_at > ?", [
      since,
    ]) as { count: number }
  ).count;

  const revenue = (
    queryOne(
      "SELECT COALESCE(SUM(CAST(payload AS INTEGER)), 0) as total FROM analytics_events WHERE event_type = 'revenue' AND created_at > ?",
      [since]
    ) as { total: number }
  ).total;

  const conversionRate = productViews > 0 ? Number(((purchases / productViews) * 100).toFixed(2)) : 0;

  return c.json({
    pageViews,
    productViews,
    emailSignups,
    checkoutStarts,
    purchases,
    revenue,
    conversionRate,
  });
});

app.get('/events', authenticate, requireAdmin, (c) => {
  const limit = parseInt(c.req.query('limit') || '100', 10);
  const rows = queryAll('SELECT * FROM analytics_events ORDER BY created_at DESC LIMIT ?', [limit]) as Record<string, unknown>[];
  return c.json(rows.map(rowToEvent));
});

app.post('/', async (c) => {
  const body = await c.req.json();
  const parsed = eventSchema.safeParse(body);
  if (!parsed.success) return c.json({ message: 'Invalid event data' }, 400);

  const data = parsed.data;
  const result = run('INSERT INTO analytics_events (event_type, payload, path, session_id) VALUES (?, ?, ?, ?)', [
    data.eventType,
    JSON.stringify(data.payload || {}),
    data.path || null,
    data.sessionId || null,
  ]);

  const row = queryOne('SELECT * FROM analytics_events WHERE id = ?', [Number(result.lastInsertRowid)]) as Record<string, unknown>;
  return c.json(rowToEvent(row), 201);
});

export default app;
