import { useState } from 'react';
import { useAnalytics } from '../../hooks/useAnalytics';
import { formatPrice } from '../../lib/utils';

const DAYS = [
  { label: '7 Days', value: 7 },
  { label: '30 Days', value: 30 },
  { label: '90 Days', value: 90 },
];

export default function AdminAnalytics() {
  const [days, setDays] = useState(30);
  const { data, loading } = useAnalytics(days);

  const metrics = data
    ? [
        { label: 'Page Views', value: data.pageViews },
        { label: 'Product Views', value: data.productViews },
        { label: 'Email Signups', value: data.emailSignups },
        { label: 'Checkout Starts', value: data.checkoutStarts },
        { label: 'Purchases', value: data.purchases },
        { label: 'Revenue', value: formatPrice(data.revenue) },
        { label: 'Conversion Rate', value: `${data.conversionRate}%` },
      ]
    : [];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="font-serif text-3xl text-muted-white">Analytics</h1>
        <div className="flex gap-2">
          {DAYS.map((d) => (
            <button
              key={d.value}
              onClick={() => setDays(d.value)}
              className={`px-4 py-2 text-sm border ${
                days === d.value
                  ? 'border-soft-gold text-soft-gold'
                  : 'border-white/10 text-muted-gray hover:text-muted-white'
              }`}
            >
              {d.label}
            </button>
          ))}
        </div>
      </div>

      {loading || !data ? (
        <p className="text-muted-gray">Loading analytics...</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {metrics.map((m) => (
            <div key={m.label} className="bg-charcoal border border-white/5 p-6">
              <p className="text-xs tracking-widest uppercase text-muted-gray mb-2">{m.label}</p>
              <p className="font-serif text-2xl text-muted-white">{m.value}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
