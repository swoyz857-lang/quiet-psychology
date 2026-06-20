import type {
  Product,
  Order,
  Review,
  Subscriber,
  SupportTicket,
  AnalyticsEvent,
  SiteSetting,
  User,
  AnalyticsEventType,
} from '@quiet-psychology/types';

export type { Product, Order, Review, Subscriber, SupportTicket, AnalyticsEvent, SiteSetting, User, AnalyticsEventType };

export interface AuthenticatedUser {
  userId: number;
  email: string;
  isAdmin: boolean;
}

export interface ApiError {
  message: string;
  code?: string;
  status?: number;
}
