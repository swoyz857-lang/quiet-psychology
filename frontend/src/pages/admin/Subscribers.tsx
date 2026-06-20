import { useEffect, useState } from 'react';
import { api } from '../../lib/api';
import { formatDate } from '../../lib/utils';
import type { Subscriber } from '../../types';

export default function AdminSubscribers() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);

  const load = () => {
    api.subscribers
      .list()
      .then(setSubscribers)
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  const remove = async (id: number) => {
    if (!confirm('Delete this subscriber?')) return;
    await api.subscribers.delete(id);
    load();
  };

  const unsubscribe = async (id: number) => {
    await api.subscribers.unsubscribe(id);
    load();
  };

  const exportCsv = () => {
    const csv = ['Email,Source,Status,Date', ...subscribers.map((s) => `${s.email},${s.source},${s.status},${s.createdAt}`)].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'subscribers.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  if (loading) return <p className="text-muted-gray">Loading subscribers...</p>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-serif text-3xl text-muted-white">Subscribers</h1>
        <button onClick={exportCsv} className="text-sm text-soft-gold hover:underline">
          Export CSV
        </button>
      </div>

      <div className="bg-charcoal border border-white/5 overflow-hidden overflow-x-auto no-scrollbar">
        <table className="w-full text-left text-sm">
          <thead className="bg-white/5 text-muted-gray">
            <tr>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Source</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {subscribers.map((s) => (
              <tr key={s.id}>
                <td className="px-6 py-4 text-muted-white">{s.email}</td>
                <td className="px-6 py-4 text-muted-gray">{s.source}</td>
                <td className="px-6 py-4 text-muted-gray capitalize">{s.status}</td>
                <td className="px-6 py-4 text-muted-gray">{formatDate(s.createdAt)}</td>
                <td className="px-6 py-4 text-right space-x-3">
                  {s.status === 'active' && (
                    <button onClick={() => unsubscribe(s.id)} className="text-yellow-500 hover:underline">
                      Unsubscribe
                    </button>
                  )}
                  <button onClick={() => remove(s.id)} className="text-red-400 hover:underline">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
