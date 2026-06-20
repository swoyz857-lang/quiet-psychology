import { Hono } from 'hono';
import { z } from 'zod';
import { queryAll, run } from '../db.js';
import { authenticate, requireAdmin } from '../middleware/auth.js';
import type { SiteSetting } from '../types.js';

const settingSchema = z.record(z.string());

const app = new Hono();

function rowToSetting(row: Record<string, unknown>): SiteSetting {
  return {
    key: row.key as string,
    value: row.value as string,
  };
}

app.get('/', (c) => {
  const rows = queryAll('SELECT * FROM settings') as Record<string, unknown>[];
  const settings: Record<string, string> = {};
  for (const row of rows) {
    settings[row.key as string] = row.value as string;
  }
  return c.json(settings);
});

app.put('/', authenticate, requireAdmin, async (c) => {
  const body = await c.req.json();
  const parsed = settingSchema.safeParse(body);
  if (!parsed.success) return c.json({ message: 'Invalid settings' }, 400);

  for (const [key, value] of Object.entries(parsed.data)) {
    run('INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)', [key, value]);
  }

  const rows = queryAll('SELECT * FROM settings') as Record<string, unknown>[];
  const settings: Record<string, string> = {};
  for (const row of rows) {
    settings[row.key as string] = row.value as string;
  }
  return c.json(settings);
});

export default app;
