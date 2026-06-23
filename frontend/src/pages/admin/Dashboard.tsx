import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
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
  BarChart3,
} from 'lucide-react';
import type { Order, Review, SupportTicket } from '../../types';

interface DashboardStats {
  totalRevenue: number;
  totalOrders: number;
  totalSubscribers: number;
  totalReviews: number;
  conversionRate: number;
  dailyRevenue: { date: string; revenue: number; orders: number }[];
  statusDistribution: { status: string; count: number }[];
  productSales: { product_id: number; revenue: number; orders: number }[];
  recentOrders: Order[];
  recentReviews: Review[];
  recentTickets: SupportTicket[];
}

const statusColors: Record<string, string> = {
  pending: '#EAB308',
  paid: '#22C55E',
  failed: '#EF4444',
  refunded: '#9CA3AF',
};

const productColors = ['#C8A05A', '#A0AEC0', '#4A5568', '#2D3748', '#1A202C'];

function shortDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.auth
      .dashboard()
      .then((data) => setStats(data as DashboardStats))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const revenueChartData = useMemo(() => {
    if (!stats) return [];
    return stats.dailyRevenue.map((d) => ({ name: shortDate(d.date), revenue: d.revenue, orders: d.orders }));
  }, [stats]);

  const statusChartData = useMemo(() => {
    if (!stats) return [];
    return stats.statusDistribution.map((s) => ({ name: s.status, value: s.count }));
  }, [stats]);

  const productChartData = useMemo(() => {
    if (!stats) return [];
    return stats.productSales.map((p) => ({ name: `Product #${p.product_id}`, value: p.revenue, orders: p.orders }));
  }, [stats]);

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
        <div className="lg:col-span-2 bg-charcoal border border-white/5 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-serif text-xl text-muted-white">Revenue Trend</h2>
              <p className="text-muted-gray text-xs mt-1">Last 30 days of paid orders</p>
            </div>
            <BarChart3 size={18} className="text-soft-gold" />
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#C8A05A" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#C8A05A" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="name" tick={{ fill: '#9CA3AF', fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#9CA3AF', fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v}`} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1A1A1A', border: '1px solid rgba(255,255,255,0.1)', color: '#E5E5E5' }}
                  itemStyle={{ color: '#E5E5E5' }}
                  formatter={(value) => [typeof value === 'number' ? formatPrice(value) : value, 'Revenue']}
                />
                <Area type="monotone" dataKey="revenue" stroke="#C8A05A" strokeWidth={2} fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-charcoal border border-white/5 p-6">
            <h2 className="font-serif text-xl text-muted-white mb-4">Order Status</h2>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusChartData}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={3}
                    stroke="none"
                  >
                    {statusChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={statusColors[entry.name] || '#4B5563'} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ backgroundColor: '#1A1A1A', border: '1px solid rgba(255,255,255,0.1)' }}
                    itemStyle={{ color: '#E5E5E5' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {statusChartData.map((s) => (
                <span key={s.name} className="inline-flex items-center gap-1.5 text-xs text-muted-gray">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: statusColors[s.name] || '#4B5563' }} />
                  {s.name.charAt(0).toUpperCase() + s.name.slice(1)} ({s.value})
                </span>
              ))}
            </div>
          </div>
        </div>
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
            <h2 className="font-serif text-xl text-muted-white mb-4">Top Products</h2>
            {productChartData.length === 0 ? (
              <p className="text-muted-gray text-sm">No paid orders yet.</p>
            ) : (
              <div className="space-y-4">
                {productChartData.map((p, i) => (
                  <div key={p.name} className="flex items-center gap-3">
                    <div className="w-2 h-10 rounded-sm" style={{ backgroundColor: productColors[i % productColors.length] }} />
                    <div className="flex-1">
                      <p className="text-sm text-muted-white">{p.name}</p>
                      <p className="text-xs text-muted-gray">{p.orders} orders</p>
                    </div>
                    <span className="text-sm font-medium text-soft-gold">{formatPrice(p.value)}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

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
              Configure payment provider, SMTP, and domain settings from the Settings page.
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
