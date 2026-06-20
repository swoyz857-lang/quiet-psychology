import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import EmailCapture from './EmailCapture';

export default function ExitIntentPopup() {
  const [show, setShow] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const isMobile = /Mobi|Android/i.test(navigator.userAgent);
    if (isMobile) return;

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY < 10 && !dismissed && !show) {
        setShow(true);
      }
    };

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setShow(false);
    };

    document.addEventListener('mouseout', handleMouseLeave);
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('mouseout', handleMouseLeave);
      document.removeEventListener('keydown', handleKey);
    };
  }, [dismissed, show]);

  const close = () => {
    setShow(false);
    setDismissed(true);
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/70 dark:bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-md surface-card p-8 md:p-10 shadow-2xl animate-fade-in-up">
        <button
          onClick={close}
          className="absolute right-4 top-4 text-body hover:text-soft-gold transition-colors"
          aria-label="Close"
        >
          <X size={20} />
        </button>
        <p className="text-xs tracking-[0.2em] uppercase text-soft-gold mb-3 font-medium">Before You Go</p>
        <h3 className="font-serif text-2xl md:text-3xl text-heading mb-3">
          Get the Free Chapter
        </h3>
        <p className="text-body mb-6">
          Join the archive and receive a private preview of the No-Contact Blueprint — plus early access to new releases.
        </p>
        <EmailCapture source="exit-intent" subtitle="" />
      </div>
    </div>
  );
}
