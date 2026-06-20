import { useEffect, useState } from 'react';
import { api } from '../../lib/api';
import { formatDate } from '../../lib/utils';
import StarRating from '../../components/ui/StarRating';
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
      <h1 className="font-serif text-3xl text-muted-white">Reviews</h1>
      <div className="space-y-4">
        {reviews.map((r) => (
          <div key={r.id} className="bg-charcoal border border-white/5 p-6">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-3">
              <div>
                <p className="text-muted-white font-medium">{r.displayName}</p>
                <p className="text-muted-gray text-xs">{formatDate(r.createdAt)}</p>
              </div>
              <StarRating rating={r.rating} />
            </div>
            <p className="text-muted-gray leading-relaxed mb-4">{r.reviewText}</p>
            <div className="flex items-center gap-3 text-sm">
              {r.approved ? (
                <button onClick={() => hide(r.id)} className="text-yellow-500 hover:underline">
                  Hide
                </button>
              ) : (
                <button onClick={() => approve(r.id)} className="text-soft-gold hover:underline">
                  Approve
                </button>
              )}
              <button onClick={() => remove(r.id)} className="text-red-400 hover:underline">
                Delete
              </button>
              <span className="text-muted-gray">{r.approved ? 'Approved' : 'Pending'}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
