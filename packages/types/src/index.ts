export interface Product {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  shortDescription: string;
  price: number;
  comparePrice: number;
  coverImage: string;
  pdfUrl: string;
  epubUrl: string;
  visibility: 'visible' | 'hidden';
  featured: number;
  stock: number;
  lemonsqueezyVariantId: string | null;
  lemonsqueezyProductId: string | null;
  metaTitle: string;
  metaDescription: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProductInput {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  shortDescription: string;
  price: number;
  comparePrice: number;
  coverImage: string;
  pdfUrl: string;
  epubUrl: string;
  visibility?: 'visible' | 'hidden';
  featured?: number;
  stock?: number;
  lemonsqueezyVariantId?: string | null;
  lemonsqueezyProductId?: string | null;
  metaTitle: string;
  metaDescription: string;
}

export interface User {
  id: number;
  email: string;
  name: string;
  isAdmin: boolean;
  createdAt: string;
}

export interface Order {
  id: number;
  userId: number | null;
  email: string;
  name: string;
  productId: number;
  amount: number;
  status: 'pending' | 'paid' | 'failed' | 'refunded';
  checkoutId: string | null;
  externalOrderId: string | null;
  downloadToken: string;
  createdAt: string;
  updatedAt: string;
}

export interface Review {
  id: number;
  productId: number;
  name: string;
  displayName: string;
  rating: number;
  reviewText: string;
  approved: boolean;
  helpful: number;
  createdAt: string;
}

export interface Subscriber {
  id: number;
  email: string;
  source: string;
  status: 'active' | 'unsubscribed';
  createdAt: string;
}

export interface SupportTicket {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: 'open' | 'in_progress' | 'resolved';
  createdAt: string;
  updatedAt: string;
}

export interface SiteSetting {
  key: string;
  value: string;
}

export interface AnalyticsEvent {
  id: number;
  eventType: string;
  payload: string;
  path: string;
  sessionId: string;
  createdAt: string;
}

export interface DashboardStats {
  totalRevenue: number;
  totalOrders: number;
  totalSubscribers: number;
  totalReviews: number;
  conversionRate: number;
  recentOrders: Order[];
  recentReviews: Review[];
  recentTickets: SupportTicket[];
}

export type AnalyticsEventType =
  | 'page_view'
  | 'product_view'
  | 'email_signup'
  | 'checkout_start'
  | 'purchase'
  | 'revenue'
  | 'review_submission';
