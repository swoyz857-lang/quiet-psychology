import { useEffect, useState } from 'react';
import { api } from '../lib/api';

export function useAnalytics(days = 30) {
  const [data, setData] = useState<Record<string, number> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api.analytics
      .get(days)
      .then(setData)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [days]);

  return { data, loading, error };
}

export function trackPageView(path: string) {
  api.analytics.track('page_view', { path }, path).catch(() => {});
}

export function trackProductView(slug: string, productId: number) {
  api.analytics.track('product_view', { slug, productId }, `/books/${slug}`).catch(() => {});
}

export function trackEmailSignup(source: string) {
  api.analytics.track('email_signup', { source }, window.location.pathname).catch(() => {});
}
