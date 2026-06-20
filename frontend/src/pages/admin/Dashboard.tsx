import { useEffect, useState } from 'react';
import { api } from '../../lib/api';
import { formatPrice, formatDate } from '../../lib/utils';
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
    return <p className="text-muted-gray">Loading dashboard...</p>;
  }

  const statCards = [
    { label: 'Total Revenue', value: formatPrice(stats.totalRevenue) },
    { label: 'Paid Orders', value: stats.totalOrders },
    { label: 'Subscribers', value: stats.totalSubscribers },
    { label: 'Reviews', value: stats.totalReviews },
    { label: 'Conversion Rate', value: `${stats.conversionRate}%` },
  ];

  return (
    <div className="space-y-10">
      <h1 className="font-serif text-3xl text-muted-white">Dashboard</h1>

      <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {statCards.map((s) => (
          <div key={s.label} className="bg-charcoal border border-white/5 p-6">
            <p className="text-xs tracking-widest uppercase text-muted-gray mb-2">{s.label}</p>
            <p className="font-serif text-2xl text-muted-white">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-charcoal border border-white/5 p-6">
          <h2 className="font-serif text-xl text-muted-white mb-4">Recent Orders</h2>
          <div className="space-y-3">
            {stats.recentOrders.length === 0 && <p className="text-muted-gray text-sm">No orders yet.</p>}
            {stats.recentOrders.map((o) => (
              <div key={o.id} className="flex justify-between text-sm border-b border-white/5 pb-2">
                <span className="text-muted-white">{o.email}</span>
                <span className="text-soft-gold">{formatPrice(o.amount)}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-charcoal border border-white/5 p-6">
          <h2 className="font-serif text-xl text-muted-white mb-4">Recent Reviews</h2>
          <div className="space-y-3">
            {stats.recentReviews.length === 0 && <p className="text-muted-gray text-sm">No reviews yet.</p>}
            {stats.recentReviews.map((r) => (
              <div key={r.id} className="text-sm border-b border-white/5 pb-2">
                <p className="text-muted-white truncate">{r.reviewText}</p>
                <p className="text-muted-gray text-xs">{r.displayName} · {formatDate(r.createdAt)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
