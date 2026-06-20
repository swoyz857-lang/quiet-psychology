import { useState } from 'react';
import { useOrders } from '../../hooks/useOrders';
import { formatPrice, formatDate } from '../../lib/utils';

const STATUSES = ['all', 'pending', 'paid', 'failed', 'refunded'];

export default function AdminOrders() {
  const [status, setStatus] = useState<string | undefined>(undefined);
  const { orders, loading, updateStatus } = useOrders(status);

  if (loading) return <p className="text-muted-gray">Loading orders...</p>;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="font-serif text-3xl text-muted-white">Orders</h1>
        <select
          value={status || 'all'}
          onChange={(e) => setStatus(e.target.value === 'all' ? undefined : e.target.value)}
          className="bg-charcoal border border-white/10 px-4 py-2 text-muted-white"
        >
          {STATUSES.map((s) => (
            <option key={s} value={s}>
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div className="bg-charcoal border border-white/5 overflow-hidden overflow-x-auto no-scrollbar">
        <table className="w-full text-left text-sm">
          <thead className="bg-white/5 text-muted-gray">
            <tr>
              <th className="px-6 py-4">ID</th>
              <th className="px-6 py-4">Customer</th>
              <th className="px-6 py-4">Amount</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {orders.map((o) => (
              <tr key={o.id}>
                <td className="px-6 py-4 text-muted-white">#{o.id}</td>
                <td className="px-6 py-4 text-muted-gray">{o.email}</td>
                <td className="px-6 py-4 text-soft-gold">{formatPrice(o.amount)}</td>
                <td className="px-6 py-4 text-muted-gray capitalize">{o.status}</td>
                <td className="px-6 py-4 text-muted-gray">{formatDate(o.createdAt)}</td>
                <td className="px-6 py-4">
                  <select
                    value={o.status}
                    onChange={(e) => updateStatus(o.id, e.target.value)}
                    className="bg-charcoal border border-white/10 px-3 py-1 text-muted-white text-sm"
                  >
                    {STATUSES.slice(1).map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
