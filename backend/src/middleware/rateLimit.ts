import type { Context, Next } from 'hono';

interface Window {
  count: number;
  resetAt: number;
}

const store = new Map<string, Window>();

function getIp(c: Context): string {
  const forwarded = c.req.header('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0].trim();
  const realIp = c.req.header('x-real-ip');
  if (realIp) return realIp;
  return 'unknown';
}

export function createRateLimiter(options: { windowMs: number; max: number }) {
  return async function rateLimit(c: Context, next: Next) {
    const key = getIp(c);
    const now = Date.now();
    const windowData = store.get(key);

    if (!windowData || now >= windowData.resetAt) {
      store.set(key, { count: 1, resetAt: now + options.windowMs });
      await next();
      return;
    }

    if (windowData.count >= options.max) {
      return c.json({ message: 'Too many requests, please try again later.' }, 429);
    }

    windowData.count += 1;
    await next();
  };
}
