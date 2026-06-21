import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

export const config = {
  port: parseInt(process.env.PORT || '3001', 10),
  apiUrl: process.env.API_URL || 'http://localhost:3001',
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:5173',
  siteUrl: process.env.SITE_URL || process.env.FRONTEND_URL || 'http://localhost:5173',
  corsOrigins: process.env.CORS_ORIGINS
    ? process.env.CORS_ORIGINS.split(',').map((o) => o.trim())
    : [],
  databaseUrl: process.env.DATABASE_URL || './data/quiet-psychology.db',
  jwtSecret: process.env.JWT_SECRET || 'default-dev-secret-not-for-production',
  adminEmail: process.env.ADMIN_EMAIL || 'admin@quietpsychology.com',
  adminPassword: process.env.ADMIN_PASSWORD || 'ibrahim789',
  lemonsqueezy: {
    apiKey: process.env.LEMONSQUEEZY_API_KEY || '',
    webhookSecret: process.env.LEMONSQUEEZY_WEBHOOK_SECRET || '',
    storeId: process.env.LEMONSQUEEZY_STORE_ID || '',
  },
  email: {
    host: process.env.SMTP_HOST || '',
    port: parseInt(process.env.SMTP_PORT || '587', 10),
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASS || '',
    from: process.env.FROM_EMAIL || 'hello@quietpsychology.com',
  },
} as const;
