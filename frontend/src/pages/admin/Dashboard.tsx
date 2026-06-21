import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../lib/api';
import { formatPrice, formatDate } from '../../lib/utils';
import {
  TrendingUp,
  ShoppingBag,
  Users,
  Star,
  Percent,
  BookOpen,
  ArrowRight,
  MessageSquare,
} from 'lucide-react';
import type { Order, Review, SupportTicket } from '../../types';

export default function AdminDashboard() {
  const [stats, setStats] = useState<{
    totalRevenue: number;
    totalOrders: number;
    totalSubscribers: number;
    totalReviews: number;
    conversionRate: number;
    recentOrders: Order[];
    recentReviews: Review[];
    recentTickets: SupportTicket[];
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.auth
      .dashboard()
      .then(setStats)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading || !stats) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-muted-gray">Loading dashboard...</p>
      </div>
    );
  }

  const statCards = [
    { label: 'Total Revenue', value: formatPrice(stats.totalRevenue), icon: TrendingUp, href: '/admin/orders' },
    { label: 'Paid Orders', value: stats.totalOrders, icon: ShoppingBag, href: '/admin/orders' },
    { label: 'Subscribers', value: stats.totalSubscribers, icon: Users, href: '/admin/subscribers' },
    { label: 'Reviews', value: stats.totalReviews, icon: Star, href: '/admin/reviews' },
    { label: 'Conversion Rate', value: `${stats.conversionRate}%`, icon: Percent, href: '/admin/analytics' },
  ];

  const quickLinks = [
    { label: 'Manage Products', href: '/admin/products', icon: BookOpen },
    { label: 'View Orders', href: '/admin/orders', icon: ShoppingBag },
    { label: 'Support Tickets', href: '/admin/support', icon: MessageSquare },
  ];

  return (
    <div className="space-y-8 md:space-y-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl text-muted-white">Dashboard</h1>
          <p className="text-muted-gray text-sm mt-1">Overview of your archive performance</p>
        </div>
        <Link
          to="/admin/products"
          className="inline-flex items-center gap-2 bg-soft-gold text-obsidian px-5 py-2.5 text-sm font-medium hover:bg-soft-gold-light transition-colors"
        >
          Manage Products <ArrowRight size={16} />
        </Link>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 md:gap-4">
        {statCards.map((s) => (
          <Link
            key={s.label}
            to={s.href}
            className="group bg-charcoal border border-white/5 p-5 hover:border-soft-gold/30 transition-colors"
          >
            <div className="flex items-center justify-between mb-3">
              <s.icon size={18} className="text-soft-gold" />
              <ArrowRight size={14} className="text-muted-gray opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <p className="text-xs tracking-widest uppercase text-muted-gray mb-1">{s.label}</p>
            <p className="font-serif text-2xl text-muted-white">{s.value}</p>
          </Link>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-charcoal border border-white/5 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-serif text-xl text-muted-white">Recent Orders</h2>
              <Link to="/admin/orders" className="text-xs text-soft-gold hover:underline">
                View all
              </Link>
            </div>
            <div className="space-y-3">
              {stats.recentOrders.length === 0 && <p className="text-muted-gray text-sm">No orders yet.</p>}
              {stats.recentOrders.map((o) => (
                <div key={o.id} className="flex items-center justify-between text-sm border-b border-white/5 pb-3 last:border-0">
                  <div>
                    <p className="text-muted-white">{o.email}</p>
                    <p className="text-muted-gray text-xs">{formatDate(o.createdAt)}</p>
                  </div>
                  <span className="text-soft-gold font-medium">{formatPrice(o.amount)}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            <div className="bg-charcoal border border-white/5 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-serif text-xl text-muted-white">Recent Reviews</h2>
                <Link to="/admin/reviews" className="text-xs text-soft-gold hover:underline">
                  View all
                </Link>
              </div>
              <div className="space-y-3">
                {stats.recentReviews.length === 0 && <p className="text-muted-gray text-sm">No reviews yet.</p>}
                {stats.recentReviews.slice(0, 3).map((r) => (
                  <div key={r.id} className="text-sm border-b border-white/5 pb-3 last:border-0">
                    <p className="text-muted-white truncate">{r.reviewText}</p>
                    <p className="text-muted-gray text-xs mt-1">
                      {r.displayName} · {formatDate(r.createdAt)}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-charcoal border border-white/5 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-serif text-xl text-muted-white">Support Tickets</h2>
                <Link to="/admin/support" className="text-xs text-soft-gold hover:underline">
                  View all
                </Link>
              </div>
              <div className="space-y-3">
                {stats.recentTickets.length === 0 && <p className="text-muted-gray text-sm">No tickets yet.</p>}
                {stats.recentTickets.slice(0, 3).map((t) => (
                  <div key={t.id} className="text-sm border-b border-white/5 pb-3 last:border-0">
                    <p className="text-muted-white truncate">{t.subject}</p>
                    <p className="text-muted-gray text-xs mt-1">
                      {t.name} · <span className="text-soft-gold">{t.status}</span>
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-charcoal border border-white/5 p-6">
            <h2 className="font-serif text-xl text-muted-white mb-4">Quick Actions</h2>
            <div className="space-y-2">
              {quickLinks.map((q) => (
                <Link
                  key={q.label}
                  to={q.href}
                  className="flex items-center gap-3 p-3 text-sm text-muted-gray hover:text-muted-white hover:bg-white/5 transition-colors"
                >
                  <q.icon size={16} className="text-soft-gold" />
                  {q.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-soft-gold/10 to-transparent border border-soft-gold/20 p-6">
            <h3 className="font-serif text-lg text-muted-white mb-2">Need help?</h3>
            <p className="text-muted-gray text-sm mb-4">
              Configure LemonSqueezy, SMTP, and domain settings from the Settings page.
            </p>
            <Link to="/admin/settings" className="text-sm text-soft-gold hover:underline">
              Open Settings →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
