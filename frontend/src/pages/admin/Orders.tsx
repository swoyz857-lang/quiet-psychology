import { useState } from 'react';
import { useOrders } from '../../hooks/useOrders';
import { formatPrice, formatDate } from '../../lib/utils';
import { ShoppingBag, Filter, ChevronDown } from 'lucide-react';

const STATUSES = ['all', 'pending', 'paid', 'failed', 'refunded'];

const statusStyles: Record<string, string> = {
  pending: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
  paid: 'bg-green-500/10 text-green-500 border-green-500/20',
  failed: 'bg-red-500/10 text-red-500 border-red-500/20',
  refunded: 'bg-muted-gray/10 text-muted-gray border-muted-gray/20',
};

export default function AdminOrders() {
  const [status, setStatus] = useState<string | undefined>(undefined);
  const { orders, loading, updateStatus } = useOrders(status);

  if (loading) return <p className="text-muted-gray">Loading orders...</p>;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl text-muted-white">Orders</h1>
          <p className="text-muted-gray text-sm mt-1">Manage customer purchases and statuses</p>
        </div>
        <div className="relative">
          <Filter size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-gray" />
          <select
            value={status || 'all'}
            onChange={(e) => setStatus(e.target.value === 'all' ? undefined : e.target.value)}
            className="bg-charcoal border border-white/10 pl-10 pr-8 py-2.5 text-muted-white appearance-none"
          >
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </option>
            ))}
          </select>
          <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-gray pointer-events-none" />
        </div>
      </div>

      <div className="bg-charcoal border border-white/5 overflow-hidden overflow-x-auto no-scrollbar">
        <table className="w-full text-left text-sm">
          <thead className="bg-white/5 text-muted-gray">
            <tr>
              <th className="px-4 md:px-6 py-4">Order</th>
              <th className="px-4 md:px-6 py-4">Customer</th>
              <th className="px-4 md:px-6 py-4">Amount</th>
              <th className="px-4 md:px-6 py-4">Status</th>
              <th className="px-4 md:px-6 py-4">Date</th>
              <th className="px-4 md:px-6 py-4">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {orders.map((o) => (
              <tr key={o.id} className="hover:bg-white/[0.02] transition-colors">
                <td className="px-4 md:px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-white/5 flex items-center justify-center">
                      <ShoppingBag size={14} className="text-soft-gold" />
                    </div>
                    <span className="text-muted-white font-medium">#{o.id}</span>
                  </div>
                </td>
                <td className="px-4 md:px-6 py-4">
                  <p className="text-muted-white">{o.name || '—'}</p>
                  <p className="text-muted-gray text-xs">{o.email}</p>
                </td>
                <td className="px-4 md:px-6 py-4 text-soft-gold font-medium">{formatPrice(o.amount)}</td>
                <td className="px-4 md:px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-1 text-xs font-medium border ${statusStyles[o.status] || 'bg-white/5 text-muted-gray border-white/10'}`}>
                    {o.status}
                  </span>
                </td>
                <td className="px-4 md:px-6 py-4 text-muted-gray">{formatDate(o.createdAt)}</td>
                <td className="px-4 md:px-6 py-4">
                  <div className="relative">
                    <select
                      value={o.status}
                      onChange={(e) => updateStatus(o.id, e.target.value)}
                      className="bg-charcoal border border-white/10 px-3 py-1.5 text-muted-white text-sm appearance-none pr-8"
                    >
                      {STATUSES.slice(1).map((s) => (
                        <option key={s} value={s}>
                          {s.charAt(0).toUpperCase() + s.slice(1)}
                        </option>
                      ))}
                    </select>
                    <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-gray pointer-events-none" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {orders.length === 0 && (
          <div className="p-8 text-center text-muted-gray text-sm">No orders found.</div>
        )}
      </div>
    </div>
  );
}
