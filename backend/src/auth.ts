import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { config } from './config.js';
import { queryOne, run } from './db.js';

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export async function ensureAdminPassword(): Promise<void> {
  const user = queryOne('SELECT id, password_hash FROM users WHERE email = ?', [
    config.adminEmail,
  ]) as { id: number; password_hash: string } | undefined;
  if (!user) return;

  const valid = await verifyPassword(config.adminPassword, user.password_hash);
  if (valid) return;

  const hash = await hashPassword(config.adminPassword);
  run('UPDATE users SET password_hash = ? WHERE id = ?', [hash, user.id]);
}

export function signToken(payload: { userId: number; email: string; isAdmin: boolean }): string {
  return jwt.sign(payload, config.jwtSecret, { expiresIn: '7d' });
}

export function verifyToken(token: string): { userId: number; email: string; isAdmin: boolean } {
  return jwt.verify(token, config.jwtSecret) as { userId: number; email: string; isAdmin: boolean };
}
