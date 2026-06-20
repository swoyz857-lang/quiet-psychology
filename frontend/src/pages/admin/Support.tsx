import { useEffect, useState } from 'react';
import { api } from '../../lib/api';
import { formatDate } from '../../lib/utils';
import type { SupportTicket } from '../../types';

const STATUSES = ['open', 'in_progress', 'resolved'];

export default function AdminSupport() {
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [loading, setLoading] = useState(true);

  const load = () => {
    api.support
      .list()
      .then(setTickets)
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  const updateStatus = async (id: number, status: string) => {
    await api.support.updateStatus(id, status);
    load();
  };

  const remove = async (id: number) => {
    if (!confirm('Delete this ticket?')) return;
    await api.support.delete(id);
    load();
  };

  if (loading) return <p className="text-muted-gray">Loading tickets...</p>;

  return (
    <div className="space-y-6">
      <h1 className="font-serif text-3xl text-muted-white">Support Tickets</h1>
      <div className="space-y-4">
        {tickets.map((t) => (
          <div key={t.id} className="bg-charcoal border border-white/5 p-6">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-3">
              <div>
                <p className="text-muted-white font-medium">{t.subject}</p>
                <p className="text-muted-gray text-xs">
                  {t.name} · {t.email} · {formatDate(t.createdAt)}
                </p>
              </div>
              <span className="text-xs tracking-widest uppercase text-muted-gray border border-white/10 px-3 py-1">
                {t.status}
              </span>
            </div>
            <p className="text-muted-gray leading-relaxed mb-4">{t.message}</p>
            <div className="flex items-center gap-3 text-sm">
              <select
                value={t.status}
                onChange={(e) => updateStatus(t.id, e.target.value)}
                className="bg-charcoal border border-white/10 px-3 py-1 text-muted-white"
              >
                {STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {s.replace('_', ' ')}
                  </option>
                ))}
              </select>
              <button onClick={() => remove(t.id)} className="text-red-400 hover:underline">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
