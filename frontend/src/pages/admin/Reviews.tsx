import { useEffect, useState } from 'react';
import { api } from '../../lib/api';
import { formatDate } from '../../lib/utils';
import { Star, Check, EyeOff, Trash2 } from 'lucide-react';

import type { Review } from '../../types';

export default function AdminReviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  const load = () => {
    api.reviews
      .listAll()
      .then(setReviews)
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  const approve = async (id: number) => {
    await api.reviews.approve(id);
    load();
  };

  const hide = async (id: number) => {
    await api.reviews.hide(id);
    load();
  };

  const remove = async (id: number) => {
    if (!confirm('Delete this review?')) return;
    await api.reviews.delete(id);
    load();
  };

  if (loading) return <p className="text-muted-gray">Loading reviews...</p>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-3xl text-muted-white">Reviews</h1>
        <p className="text-muted-gray text-sm mt-1">Approve, hide, or delete reader reviews</p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {reviews.map((r) => (
          <div key={r.id} className="bg-charcoal border border-white/5 p-5 hover:border-white/10 transition-colors">
            <div className="flex items-start justify-between gap-4 mb-3">
              <div>
                <p className="text-muted-white font-medium">{r.displayName}</p>
                <p className="text-muted-gray text-xs">{formatDate(r.createdAt)}</p>
              </div>
              <div className="flex items-center gap-1 bg-soft-gold/10 px-2 py-1">
                <Star size={12} className="text-soft-gold fill-soft-gold" />
                <span className="text-sm font-medium text-soft-gold">{r.rating}</span>
              </div>
            </div>
            <p className="text-muted-gray leading-relaxed mb-4 text-sm">{r.reviewText}</p>
            <div className="flex items-center justify-between pt-3 border-t border-white/5">
              <div className="flex items-center gap-3 text-sm">
                {r.approved ? (
                  <button onClick={() => hide(r.id)} className="flex items-center gap-1.5 text-yellow-500 hover:text-yellow-400 transition-colors">
                    <EyeOff size={14} /> Hide
                  </button>
                ) : (
                  <button onClick={() => approve(r.id)} className="flex items-center gap-1.5 text-soft-gold hover:text-soft-gold-light transition-colors">
                    <Check size={14} /> Approve
                  </button>
                )}
                <button onClick={() => remove(r.id)} className="flex items-center gap-1.5 text-red-400 hover:text-red-300 transition-colors">
                  <Trash2 size={14} /> Delete
                </button>
              </div>
              <span className={`text-xs px-2 py-1 border ${r.approved ? 'bg-green-500/10 text-green-500 border-green-500/20' : 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'}`}>
                {r.approved ? 'Approved' : 'Pending'}
              </span>
            </div>
          </div>
        ))}
      </div>

      {reviews.length === 0 && (
        <div className="p-8 text-center text-muted-gray text-sm bg-charcoal border border-white/5">
          No reviews yet.
        </div>
      )}
    </div>
  );
}
