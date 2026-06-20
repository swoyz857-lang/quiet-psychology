import type { Product, ProductInput, Order, Review, Subscriber, SupportTicket, AnalyticsEvent } from '../types';

const API_URL = import.meta.env.VITE_API_URL || '';

async function fetchJson<T>(path: string, options?: RequestInit): Promise<T> {
  const token = localStorage.getItem('qp_token');
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options?.headers,
    },
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: 'Request failed' }));
    throw new Error(err.message || 'Request failed');
  }
  return res.json();
}

export const api = {
  products: {
    list: () => fetchJson<Product[]>('/api/products'),
    listAll: () => fetchJson<Product[]>('/api/products/all'),
    get: (slug: string) => fetchJson<Product>(`/api/products/${slug}`),
    create: (data: ProductInput) => fetchJson<Product>('/api/products', { method: 'POST', body: JSON.stringify(data) }),
    update: (id: number, data: Partial<ProductInput>) =>
      fetchJson<Product>(`/api/products/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    delete: (id: number) => fetchJson<{ success: boolean }>(`/api/products/${id}`, { method: 'DELETE' }),
  },
  orders: {
    list: (status?: string) => fetchJson<Order[]>(`/api/orders${status ? `?status=${status}` : ''}`),
    updateStatus: (id: number, status: string) =>
      fetchJson<Order>(`/api/orders/${id}/status`, { method: 'PUT', body: JSON.stringify({ status }) }),
  },
  reviews: {
    list: (productId?: number) => fetchJson<Review[]>(`/api/reviews${productId ? `?productId=${productId}` : ''}`),
    listAll: () => fetchJson<Review[]>('/api/reviews/all'),
    stats: (productId: number) => fetchJson<{ count: number; average: number }>(`/api/reviews/stats/${productId}`),
    create: (data: Omit<Review, 'id' | 'approved' | 'helpful' | 'createdAt'>) =>
      fetchJson<Review>('/api/reviews', { method: 'POST', body: JSON.stringify(data) }),
    approve: (id: number) => fetchJson<Review>(`/api/reviews/${id}/approve`, { method: 'PUT' }),
    hide: (id: number) => fetchJson<Review>(`/api/reviews/${id}/hide`, { method: 'PUT' }),
    delete: (id: number) => fetchJson<{ success: boolean }>(`/api/reviews/${id}`, { method: 'DELETE' }),
  },
  subscribers: {
    list: () => fetchJson<Subscriber[]>('/api/subscribers'),
    create: (email: string, source?: string) =>
      fetchJson<Subscriber>('/api/subscribers', { method: 'POST', body: JSON.stringify({ email, source }) }),
    unsubscribe: (id: number) => fetchJson<Subscriber>(`/api/subscribers/${id}/unsubscribe`, { method: 'PUT' }),
    delete: (id: number) => fetchJson<{ success: boolean }>(`/api/subscribers/${id}`, { method: 'DELETE' }),
  },
  support: {
    list: (status?: string) => fetchJson<SupportTicket[]>(`/api/support${status ? `?status=${status}` : ''}`),
    create: (data: Omit<SupportTicket, 'id' | 'status' | 'createdAt' | 'updatedAt'>) =>
      fetchJson<SupportTicket>('/api/support', { method: 'POST', body: JSON.stringify(data) }),
    updateStatus: (id: number, status: string) =>
      fetchJson<SupportTicket>(`/api/support/${id}/status`, { method: 'PUT', body: JSON.stringify({ status }) }),
    delete: (id: number) => fetchJson<{ success: boolean }>(`/api/support/${id}`, { method: 'DELETE' }),
  },
  analytics: {
    get: (days?: number) => fetchJson<Record<string, number>>(`/api/analytics${days ? `?days=${days}` : ''}`),
    events: (limit?: number) => fetchJson<AnalyticsEvent[]>(`/api/analytics/events${limit ? `?limit=${limit}` : ''}`),
    track: (eventType: string, payload?: Record<string, unknown>, path?: string) =>
      fetchJson<AnalyticsEvent>('/api/analytics', {
        method: 'POST',
        body: JSON.stringify({ eventType, payload, path, sessionId: getSessionId() }),
      }),
  },
  settings: {
    get: () => fetchJson<Record<string, string>>('/api/settings'),
    update: (data: Record<string, string>) =>
      fetchJson<Record<string, string>>('/api/settings', { method: 'PUT', body: JSON.stringify(data) }),
  },
  checkout: {
    createSession: (slug: string, email: string, name?: string) =>
      fetchJson<{ checkoutId: string; url: string }>('/api/checkout/session', {
        method: 'POST',
        body: JSON.stringify({ slug, email, name }),
      }),
    verify: (token: string) => fetchJson<{ orderId: number; email: string; product: Product }>(`/api/checkout/verify/${token}`),
    verifyCheckout: (checkoutId: string) =>
      fetchJson<{ product: Product; downloadToken: string }>(`/api/checkout/verify-session?checkout_id=${checkoutId}`),
  },
  auth: {
    login: (email: string, password: string) =>
      fetchJson<{ token: string; user: { id: number; email: string; isAdmin: boolean } }>('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      }),
    me: () => fetchJson<{ user: { id: number; email: string; isAdmin: boolean } }>('/api/auth/me'),
    dashboard: () => fetchJson<{
      totalRevenue: number;
      totalOrders: number;
      totalSubscribers: number;
      totalReviews: number;
      conversionRate: number;
      recentOrders: Order[];
      recentReviews: Review[];
      recentTickets: SupportTicket[];
    }>('/api/dashboard'),
  },
};

function getSessionId(): string {
  let id = sessionStorage.getItem('qp_session_id');
  if (!id) {
    id = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    sessionStorage.setItem('qp_session_id', id);
  }
  return id;
}
