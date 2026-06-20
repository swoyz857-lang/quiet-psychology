import type { MiddlewareHandler } from 'hono';

export const errorHandler: MiddlewareHandler = async (c, next) => {
  try {
    await next();
  } catch (error) {
    console.error('Unhandled error:', error);
    const message = error instanceof Error ? error.message : 'Internal server error';
    return c.json({ message }, 500);
  }
};
