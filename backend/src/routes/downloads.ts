import { Hono } from 'hono';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { queryOne } from '../db.js';

const app = new Hono();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const downloadsDir = path.resolve(__dirname, '../../downloads');

const MIME_TYPES: Record<string, string> = {
  pdf: 'application/pdf',
  epub: 'application/epub+zip',
};

app.get('/:slug/:format', async (c) => {
  const slug = c.req.param('slug');
  const format = c.req.param('format');
  const token = c.req.query('token');

  if (!token) {
    return c.json({ message: 'Download token required' }, 401);
  }

  const order = queryOne('SELECT * FROM orders WHERE download_token = ? AND status = ?', [token, 'paid']) as
    | Record<string, unknown>
    | undefined;
  if (!order) {
    return c.json({ message: 'Invalid or unpaid order' }, 403);
  }

  const product = queryOne('SELECT * FROM products WHERE id = ?', [order.product_id as number]) as
    | Record<string, unknown>
    | undefined;
  if (!product || (product.slug as string) !== slug) {
    return c.json({ message: 'Product mismatch' }, 403);
  }

  if (!['pdf', 'epub'].includes(format)) {
    return c.json({ message: 'Invalid format' }, 400);
  }

  const filePath = path.join(downloadsDir, `${slug}.${format}`);
  if (!fs.existsSync(filePath)) {
    return c.json({ message: 'File not found' }, 404);
  }

  const file = fs.readFileSync(filePath);
  const filename = `${slug}.${format}`;

  c.header('Content-Type', MIME_TYPES[format]);
  c.header('Content-Disposition', `attachment; filename="${filename}"`);
  return c.body(file);
});

export default app;
