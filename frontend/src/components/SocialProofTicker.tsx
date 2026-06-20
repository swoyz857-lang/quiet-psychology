import { useEffect, useState } from 'react';
import { TrendingUp } from 'lucide-react';

const MESSAGES = [
  'A reader from London just purchased The No-Contact Blueprint',
  'Someone from New York downloaded The Attachment Archive',
  'A reader from Sydney bought The Attraction Code',
  'Someone from Berlin purchased The No-Contact Blueprint',
  'A reader from Toronto downloaded The Texting Psychology',
  'Someone from Paris bought The Attachment Archive',
];

export default function SocialProofTicker() {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [key, setKey] = useState(0);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    const cycle = () => {
      const msg = MESSAGES[Math.floor(Math.random() * MESSAGES.length)];
      setMessage(msg);
      setKey((k) => k + 1);
      setVisible(true);

      timeout = setTimeout(() => {
        setVisible(false);
        timeout = setTimeout(cycle, Math.random() * 8000 + 12000);
      }, 5000);
    };

    timeout = setTimeout(cycle, 8000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div
      className={`fixed bottom-24 left-4 sm:left-6 z-30 transition-all duration-700 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
      aria-live="polite"
      aria-atomic="true"
    >
      <div className="flex items-center gap-3 surface-glass px-4 py-2.5 shadow-lg border border-soft-gold/20 max-w-xs">
        <div className="flex-shrink-0 w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <TrendingUp size={14} className="flex-shrink-0 text-soft-gold" />
        <p key={key} className="text-[11px] leading-snug text-body">
          {message}
        </p>
      </div>
    </div>
  );
}
