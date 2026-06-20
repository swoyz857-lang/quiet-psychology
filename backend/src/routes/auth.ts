import { Hono } from 'hono';
import { z } from 'zod';
import { queryOne, run } from '../db.js';
import { hashPassword, signToken, verifyPassword } from '../auth.js';
import { config } from '../config.js';
import { authenticate } from '../middleware/auth.js';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(7),
});

const app = new Hono();

app.post('/login', async (c) => {
  const body = await c.req.json();
  const parsed = loginSchema.safeParse(body);
  if (!parsed.success) {
    return c.json({ message: 'Invalid credentials' }, 400);
  }

  const { email, password } = parsed.data;
  let user = queryOne('SELECT * FROM users WHERE email = ?', [email]) as
    | { id: number; email: string; password_hash: string; is_admin: number }
    | undefined;

  if (!user && email === config.adminEmail) {
    const hash = await hashPassword(config.adminPassword);
    const result = run('INSERT INTO users (email, name, password_hash, is_admin) VALUES (?, ?, ?, ?)', [
      email,
      'Admin',
      hash,
      1,
    ]);
    user = {
      id: Number(result.lastInsertRowid),
      email,
      password_hash: hash,
      is_admin: 1,
    };
  }

  if (!user) {
    return c.json({ message: 'Invalid credentials' }, 401);
  }

  const valid = await verifyPassword(password, user.password_hash);
  if (!valid) {
    return c.json({ message: 'Invalid credentials' }, 401);
  }

  const token = signToken({
    userId: user.id,
    email: user.email,
    isAdmin: Boolean(user.is_admin),
  });

  return c.json({
    token,
    user: {
      id: user.id,
      email: user.email,
      isAdmin: Boolean(user.is_admin),
    },
  });
});

app.get('/me', authenticate, (c) => {
  const user = c.get('user');
  return c.json({ user });
});

export default app;
