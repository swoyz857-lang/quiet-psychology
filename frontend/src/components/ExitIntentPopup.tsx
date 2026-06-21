import { useEffect, useState } from 'react';
import { X, Star, Users, BookOpen } from 'lucide-react';
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
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-2xl bg-obsidian border border-white/10 shadow-2xl animate-fade-in-up overflow-hidden">
        {/* Gradient accents */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-soft-gold/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-soft-gold/10 rounded-full blur-3xl pointer-events-none" />

        <button
          onClick={close}
          className="absolute right-4 top-4 z-20 p-2 text-muted-gray hover:text-muted-white transition-colors"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        <div className="relative z-10 grid md:grid-cols-5">
          {/* Left: content */}
          <div className="md:col-span-3 p-8 md:p-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-soft-gold/10 border border-soft-gold/20 rounded-full mb-5">
              <BookOpen size={12} className="text-soft-gold" />
              <span className="text-[10px] tracking-[0.2em] uppercase text-soft-gold font-medium">
                Before You Go
              </span>
            </div>

            <h3 className="font-serif text-2xl md:text-3xl text-muted-white mb-3 leading-tight">
              Get the <span className="italic text-soft-gold">Free Chapter</span>
            </h3>
            <p className="text-muted-gray text-sm md:text-base leading-relaxed mb-6">
              Join the private archive and receive a preview of The No-Contact Blueprint — plus early access to every new release before it goes public.
            </p>

            <div className="flex flex-wrap items-center gap-3 mb-6 text-xs text-muted-gray">
              <span className="flex items-center gap-1.5 bg-white/5 px-2.5 py-1">
                <Star size={10} className="text-soft-gold fill-soft-gold" /> 4.8 rating
              </span>
              <span className="flex items-center gap-1.5 bg-white/5 px-2.5 py-1">
                <Users size={10} className="text-soft-gold" /> 2,874 sold
              </span>
            </div>

            <EmailCapture
              source="exit-intent"
              variant="boxed"
              subtitle=""
              benefits={[
                'Instant PDF preview chapter',
                'First access to new publications',
                'No spam. One-click unsubscribe.',
              ]}
            />
          </div>

          {/* Right: visual */}
          <div className="hidden md:flex md:col-span-2 items-center justify-center relative bg-gradient-to-br from-soft-gold/5 to-transparent p-8">
            <div className="relative w-48">
              <div className="absolute -inset-8 bg-soft-gold/20 rounded-full blur-3xl" />
              <img
                src="/covers/no-contact-blueprint.png"
                alt="The No-Contact Blueprint"
                className="relative w-full rounded-sm shadow-book"
              />
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-soft-gold text-obsidian text-[10px] font-medium tracking-widest uppercase px-4 py-1.5">
                Free Preview
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
