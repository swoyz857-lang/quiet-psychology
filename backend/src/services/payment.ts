import { config } from '../config.js';

export function isPaymentConfigured(): boolean {
  return Boolean(
    config.lemonsqueezy.apiKey && config.lemonsqueezy.webhookSecret && config.lemonsqueezy.storeId
  );
}
