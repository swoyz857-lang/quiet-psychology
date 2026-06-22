import { useState, useMemo } from 'react';
import { useOrders } from '../../hooks/useOrders';
import type { Order } from '../../types';
import { formatPrice, formatDate } from '../../lib/utils';
import {
  ShoppingBag,
  Filter,
  ChevronDown,
  Search,
  Trash2,
  Eye,
  Download,
  Calendar,
  Mail,
  CreditCard,
  Package,
} from 'lucide-react';
import Modal from '../../components/ui/Modal';

const STATUSES = ['all', 'pending', 'paid', 'failed', 'refunded'];

const statusStyles: Record<string, string> = {
  pending: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
  paid: 'bg-green-500/10 text-green-500 border-green-500/20',
  failed: 'bg-red-500/10 text-red-500 border-red-500/20',
  refunded: 'bg-muted-gray/10 text-muted-gray border-muted-gray/20',
};

export default function AdminOrders() {
  const [status, setStatus] = useState<string | undefined>(undefined);
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<Order | null>(null);
  const [deleting, setDeleting] = useState<number | null>(null);
  const { orders, loading, error, updateStatus, remove } = useOrders(status);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return orders.filter(
      (o) =>
        o.email.toLowerCase().includes(q) ||
        o.name?.toLowerCase().includes(q) ||
        String(o.id).includes(q)
    );
  }, [orders, search]);

  const exportCsv = () => {
    const headers = ['ID', 'Email', 'Name', 'Amount', 'Status', 'Date'];
    const rows = filtered.map((o) => [
      o.id,
      `"${o.email}"`,
      `"${o.name || ''}"`,
      formatPrice(o.amount),
      o.status,
      formatDate(o.createdAt),
    ]);
    const csv = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `orders-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this order? This action cannot be undone.')) return;
    setDeleting(id);
    try {
      await remove(id);
      if (selected?.id === id) setSelected(null);
    } catch {
      alert('Failed to delete order. Please try again.');
    } finally {
      setDeleting(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-muted-gray">Loading orders...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="bg-red-500/10 border border-red-500/20 p-6 text-center">
          <p className="text-red-400">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl text-muted-white">Orders</h1>
          <p className="text-muted-gray text-sm mt-1">Manage customer purchases, statuses, and records.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={exportCsv}
            className="flex items-center gap-2 px-4 py-2.5 text-sm text-muted-white bg-white/5 hover:bg-white/10 transition-colors"
          >
            <Download size={16} /> Export CSV
          </button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-gray" />
          <input
            type="text"
            placeholder="Search by email, name, or order ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-charcoal border border-white/10 pl-11 pr-4 py-3 text-muted-white placeholder:text-muted-gray focus:border-soft-gold/50 focus:outline-none"
          />
        </div>
        <div className="relative">
          <Filter size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-gray" />
          <select
            value={status || 'all'}
            onChange={(e) => setStatus(e.target.value === 'all' ? undefined : e.target.value)}
            className="bg-charcoal border border-white/10 pl-10 pr-8 py-3 text-muted-white appearance-none"
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
              <th className="px-4 md:px-6 py-4">Product</th>
              <th className="px-4 md:px-6 py-4">Amount</th>
              <th className="px-4 md:px-6 py-4">Status</th>
              <th className="px-4 md:px-6 py-4">Date</th>
              <th className="px-4 md:px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {filtered.map((o) => (
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
                <td className="px-4 md:px-6 py-4 text-muted-gray text-xs">#{o.productId}</td>
                <td className="px-4 md:px-6 py-4 text-soft-gold font-medium">{formatPrice(o.amount)}</td>
                <td className="px-4 md:px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-1 text-xs font-medium border ${statusStyles[o.status] || 'bg-white/5 text-muted-gray border-white/10'}`}>
                    {o.status}
                  </span>
                </td>
                <td className="px-4 md:px-6 py-4 text-muted-gray">{formatDate(o.createdAt)}</td>
                <td className="px-4 md:px-6 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => setSelected(o)}
                      className="p-2 text-muted-gray hover:text-soft-gold transition-colors"
                      title="View details"
                    >
                      <Eye size={16} />
                    </button>
                    <select
                      value={o.status}
                      onChange={(e) => updateStatus(o.id, e.target.value)}
                      className="bg-charcoal border border-white/10 px-2 py-1 text-muted-white text-xs appearance-none"
                    >
                      {STATUSES.slice(1).map((s) => (
                        <option key={s} value={s}>
                          {s.charAt(0).toUpperCase() + s.slice(1)}
                        </option>
                      ))}
                    </select>
                    <button
                      onClick={() => handleDelete(o.id)}
                      disabled={deleting === o.id}
                      className="p-2 text-muted-gray hover:text-red-400 transition-colors disabled:opacity-50"
                      title="Delete order"
                    >
                      {deleting === o.id ? (
                        <span className="w-4 h-4 border-2 border-red-400/30 border-t-red-400 rounded-full animate-spin inline-block" />
                      ) : (
                        <Trash2 size={16} />
                      )}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="p-8 text-center text-muted-gray text-sm">No orders found.</div>
        )}
      </div>

      <Modal open={!!selected} onClose={() => setSelected(null)} title={`Order #${selected?.id}`}>
        {selected && (
          <div className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/5 p-4">
                <p className="text-xs text-muted-gray mb-1">Status</p>
                <span className={`inline-flex items-center px-2.5 py-1 text-xs font-medium border ${statusStyles[selected.status]}`}>
                  {selected.status}
                </span>
              </div>
              <div className="bg-white/5 p-4">
                <p className="text-xs text-muted-gray mb-1">Amount</p>
                <p className="text-lg font-serif text-muted-white">{formatPrice(selected.amount)}</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <Mail size={16} className="text-soft-gold" />
                <span className="text-muted-gray">Email:</span>
                <span className="text-muted-white">{selected.email}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Package size={16} className="text-soft-gold" />
                <span className="text-muted-gray">Product ID:</span>
                <span className="text-muted-white">#{selected.productId}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <CreditCard size={16} className="text-soft-gold" />
                <span className="text-muted-gray">Checkout ID:</span>
                <span className="text-muted-white text-xs break-all">{selected.checkoutId || '—'}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Calendar size={16} className="text-soft-gold" />
                <span className="text-muted-gray">Date:</span>
                <span className="text-muted-white">{formatDate(selected.createdAt)}</span>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex gap-3">
              <button
                onClick={() => handleDelete(selected.id)}
                disabled={deleting === selected.id}
                className="flex-1 flex items-center justify-center gap-2 bg-red-500/10 border border-red-500/20 text-red-400 py-2.5 text-sm hover:bg-red-500/20 transition-colors disabled:opacity-50"
              >
                <Trash2 size={16} /> Delete Order
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
