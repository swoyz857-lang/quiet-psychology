import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { serveStatic } from '@hono/node-server/serve-static';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { config } from './config.js';
import { initializeDb, queryOne, queryAll, initDatabase, seedDatabase, closeDatabase } from './db.js';
import { errorHandler } from './middleware/error.js';
import { createRateLimiter } from './middleware/rateLimit.js';
import authRoutes from './routes/auth.js';
import productsRoutes from './routes/products.js';
import ordersRoutes from './routes/orders.js';
import reviewsRoutes from './routes/reviews.js';
import subscribersRoutes from './routes/subscribers.js';
import supportRoutes from './routes/support.js';
import analyticsRoutes from './routes/analytics.js';
import settingsRoutes from './routes/settings.js';
import checkoutRoutes from './routes/checkout.js';
import downloadRoutes from './routes/downloads.js';
import { trackEvent } from './services/analytics.js';
import { ensureAdminPassword } from './auth.js';

const app = new Hono();

app.use(logger());
const corsOrigins = [config.frontendUrl, 'http://localhost:5173', 'http://127.0.0.1:5173', ...config.corsOrigins].filter(
  Boolean
);
app.use(
  cors({
    origin: corsOrigins,
    credentials: true,
  })
);
app.use(errorHandler);

const strictLimiter = createRateLimiter({ windowMs: 60_000, max: 10 });
const standardLimiter = createRateLimiter({ windowMs: 60_000, max: 30 });

app.route('/api/auth', authRoutes);
app.route('/api/products', productsRoutes);
app.route('/api/orders', ordersRoutes);
app.use('/api/reviews/*', standardLimiter);
app.route('/api/reviews', reviewsRoutes);
app.use('/api/subscribers/*', strictLimiter);
app.route('/api/subscribers', subscribersRoutes);
app.use('/api/support/*', strictLimiter);
app.route('/api/support', supportRoutes);
app.use('/api/analytics/*', standardLimiter);
app.route('/api/analytics', analyticsRoutes);
app.route('/api/settings', settingsRoutes);
app.use('/api/checkout/session', standardLimiter);
app.route('/api/checkout', checkoutRoutes);
app.route('/api/downloads', downloadRoutes);

app.get('/api/health', (c) => c.json({ status: 'ok', timestamp: new Date().toISOString() }));

app.get('/api/dashboard', async (c) => {
  const authHeader = c.req.header('authorization');
  if (!authHeader?.startsWith('Bearer ')) return c.json({ message: 'Unauthorized' }, 401);
  const token = authHeader.slice(7);
  const { verifyToken } = await import('./auth.js');
  try {
    const user = verifyToken(token);
    if (!user.isAdmin) return c.json({ message: 'Forbidden' }, 403);
  } catch {
    return c.json({ message: 'Invalid token' }, 401);
  }

  const totalRevenue = (
    queryOne("SELECT COALESCE(SUM(amount), 0) as total FROM orders WHERE status = 'paid'") as { total: number }
  ).total;
  const totalOrders = (queryOne("SELECT COUNT(*) as count FROM orders WHERE status = 'paid'") as { count: number }).count;
  const totalSubscribers = (
    queryOne("SELECT COUNT(*) as count FROM subscribers WHERE status = 'active'") as { count: number }
  ).count;
  const totalReviews = (queryOne('SELECT COUNT(*) as count FROM reviews') as { count: number }).count;
  const productViews = (
    queryOne("SELECT COUNT(*) as count FROM analytics_events WHERE event_type = 'product_view'") as { count: number }
  ).count;
  const conversionRate = productViews > 0 ? Number(((totalOrders / productViews) * 100).toFixed(2)) : 0;

  const dailyRevenue = queryAll(
    "SELECT DATE(created_at) as date, COALESCE(SUM(amount), 0) as revenue, COUNT(*) as orders FROM orders WHERE status = 'paid' AND created_at >= DATE('now', '-30 days') GROUP BY DATE(created_at) ORDER BY DATE(created_at)"
  ) as { date: string; revenue: number; orders: number }[];

  const statusDistribution = queryAll(
    'SELECT status, COUNT(*) as count FROM orders GROUP BY status'
  ) as { status: string; count: number }[];

  const productSales = queryAll(
    "SELECT product_id, COALESCE(SUM(amount), 0) as revenue, COUNT(*) as orders FROM orders WHERE status = 'paid' GROUP BY product_id ORDER BY revenue DESC LIMIT 5"
  ) as { product_id: number; revenue: number; orders: number }[];

  const recentOrders = queryAll('SELECT * FROM orders ORDER BY created_at DESC LIMIT 5') as Record<string, unknown>[];
  const recentReviews = queryAll('SELECT * FROM reviews ORDER BY created_at DESC LIMIT 5') as Record<string, unknown>[];
  const recentTickets = queryAll('SELECT * FROM support_tickets ORDER BY created_at DESC LIMIT 5') as Record<string, unknown>[];

  return c.json({
    totalRevenue,
    totalOrders,
    totalSubscribers,
    totalReviews,
    conversionRate,
    dailyRevenue,
    statusDistribution,
    productSales,
    recentOrders,
    recentReviews,
    recentTickets,
  });
});

app.get('/api/sitemap', (c) => {
  const products = queryAll("SELECT slug FROM products WHERE visibility = 'visible'") as { slug: string }[];
  return c.json({ products: products.map((p) => p.slug) });
});

const staticPaths = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/archive', priority: '0.9', changefreq: 'weekly' },
  { path: '/about', priority: '0.6', changefreq: 'monthly' },
  { path: '/faq', priority: '0.6', changefreq: 'monthly' },
  { path: '/contact', priority: '0.6', changefreq: 'monthly' },
  { path: '/privacy', priority: '0.3', changefreq: 'yearly' },
  { path: '/terms', priority: '0.3', changefreq: 'yearly' },
  { path: '/refund', priority: '0.3', changefreq: 'yearly' },
  { path: '/blog', priority: '0.7', changefreq: 'weekly' },
];

app.get('/sitemap.xml', (c) => {
  const products = queryAll("SELECT slug, updated_at FROM products WHERE visibility = 'visible'") as {
    slug: string;
    updated_at: string;
  }[];
  const siteUrl = config.siteUrl.replace(/\/$/, '');
  const today = new Date().toISOString();

  const productUrls = products.map((p) => {
    const lastmod = p.updated_at ? new Date(p.updated_at).toISOString() : today;
    return `  <url>\n    <loc>${siteUrl}/books/${p.slug}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.9</priority>\n  </url>`;
  });

  const staticUrls = staticPaths.map((p) => {
    return `  <url>\n    <loc>${siteUrl}${p.path}</loc>\n    <changefreq>${p.changefreq}</changefreq>\n    <priority>${p.priority}</priority>\n  </url>`;
  });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${[
    ...staticUrls,
    ...productUrls,
  ].join('\n')}\n</urlset>`;

  c.header('Content-Type', 'application/xml');
  return c.body(xml);
});

app.get('/robots.txt', (c) => {
  const siteUrl = config.siteUrl.replace(/\/$/, '');
  const text = `User-agent: *\nAllow: /\nDisallow: /admin\nDisallow: /download\nDisallow: /api/\nSitemap: ${siteUrl}/sitemap.xml\n`;
  c.header('Content-Type', 'text/plain');
  return c.body(text);
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distPath = path.resolve(__dirname, '../../frontend/dist');

if (fs.existsSync(distPath)) {
  app.use('*', serveStatic({ root: distPath }));
  app.get('*', (c) => {
    const indexPath = path.join(distPath, 'index.html');
    if (fs.existsSync(indexPath)) {
      return c.html(fs.readFileSync(indexPath, 'utf-8'));
    }
    return c.notFound();
  });
}

async function start() {
  await initializeDb();

  const usersTable = queryOne("SELECT name FROM sqlite_master WHERE type='table' AND name='users'");
  if (!usersTable) {
    console.log('Database is empty. Initializing schema and seed data...');
    initDatabase();
    seedDatabase();
  }

  await ensureAdminPassword();

  if (process.argv.includes('--init')) {
    initDatabase();
    closeDatabase();
    process.exit(0);
  }

  if (process.argv.includes('--seed')) {
    seedDatabase();
    closeDatabase();
    process.exit(0);
  }

  serve({
    fetch: app.fetch,
    port: config.port,
  });

  console.log(`Quiet Psychology API running on ${config.apiUrl}`);
}

start();
