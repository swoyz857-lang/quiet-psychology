import type { MiddlewareHandler } from 'hono';
import { verifyToken } from '../auth.js';
import type { AuthenticatedUser } from '../types.js';

declare module 'hono' {
  interface ContextVariableMap {
    user: AuthenticatedUser;
  }
}

export const authenticate: MiddlewareHandler = async (c, next) => {
  const authHeader = c.req.header('authorization');
  if (!authHeader?.startsWith('Bearer ')) {
    return c.json({ message: 'Unauthorized' }, 401);
  }
  const token = authHeader.slice(7);
  try {
    const payload = verifyToken(token);
    c.set('user', payload);
    await next();
  } catch {
    return c.json({ message: 'Invalid or expired token' }, 401);
  }
};

export const requireAdmin: MiddlewareHandler = async (c, next) => {
  const user = c.get('user');
  if (!user?.isAdmin) {
    return c.json({ message: 'Forbidden' }, 403);
  }
  await next();
};
