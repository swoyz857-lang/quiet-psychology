import { useEffect, useState } from 'react';
import { X, ShoppingBag } from 'lucide-react';

const SALES = [
  { name: 'Someone in London', product: 'The No-Contact Blueprint', time: '2 minutes ago' },
  { name: 'A reader in Toronto', product: 'The No-Contact Blueprint', time: '5 minutes ago' },
  { name: 'Someone in Berlin', product: 'Texting Psychology', time: '8 minutes ago' },
  { name: 'A reader in Sydney', product: 'The No-Contact Blueprint', time: '12 minutes ago' },
  { name: 'Someone in New York', product: 'The Attachment Archive', time: '15 minutes ago' },
  { name: 'A reader in Dubai', product: 'The No-Contact Blueprint', time: '19 minutes ago' },
  { name: 'Someone in Stockholm', product: 'The Attraction Code', time: '23 minutes ago' },
  { name: 'A reader in Singapore', product: 'The No-Contact Blueprint', time: '28 minutes ago' },
];

export default function RecentSalesToast() {
  const [visible, setVisible] = useState(false);
  const [index, setIndex] = useState(0);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (dismissed || typeof window === 'undefined') return;

    const showTimer = setTimeout(() => setVisible(true), 4000);
    const rotateTimer = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % SALES.length);
        setVisible(true);
      }, 400);
    }, 8000);

    return () => {
      clearTimeout(showTimer);
      clearInterval(rotateTimer);
    };
  }, [dismissed]);

  if (dismissed) return null;

  const sale = SALES[index];

  return (
    <div
      className={`fixed bottom-20 right-4 sm:bottom-6 sm:right-6 z-30 w-[calc(100vw-2rem)] sm:w-80 surface-card p-4 shadow-2xl transition-all duration-500 ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0 pointer-events-none'
      }`}
    >
      <button
        onClick={() => setDismissed(true)}
        className="absolute right-2 top-2 text-body hover:text-soft-gold transition-colors"
        aria-label="Close"
      >
        <X size={14} />
      </button>
      <div className="flex items-start gap-3">
        <div className="w-9 h-9 flex items-center justify-center bg-soft-gold/10 text-soft-gold shrink-0">
          <ShoppingBag size={16} />
        </div>
        <div>
          <p className="text-sm text-heading leading-snug">
            {sale.name} purchased <span className="text-soft-gold">{sale.product}</span>
          </p>
          <p className="text-xs text-body mt-1">{sale.time}</p>
        </div>
      </div>
    </div>
  );
}
