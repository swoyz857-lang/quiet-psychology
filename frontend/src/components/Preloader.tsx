import { useEffect, useState } from 'react';

export default function Preloader() {
  const [loading, setLoading] = useState(true);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFade(true);
      setTimeout(() => setLoading(false), 700);
    }, 1600);
    return () => clearTimeout(timer);
  }, []);

  if (!loading) return null;

  return (
    <div
      className={`fixed inset-0 z-[200] flex items-center justify-center bg-cream dark:bg-obsidian transition-opacity duration-700 ${
        fade ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="relative flex flex-col items-center">
        <div className="relative w-24 h-24 md:w-32 md:h-32 animate-pulse">
          <img
            src="/logo.png"
            alt="Quiet Psychology"
            className="h-full w-full object-contain drop-shadow-[0_0_40px_rgba(201,169,98,0.5)]"
          />
        </div>
        <div className="mt-8 h-px w-32 bg-gradient-to-r from-transparent via-soft-gold to-transparent overflow-hidden">
          <div className="h-full w-1/2 bg-soft-gold-light animate-[shimmer_1.2s_linear_infinite]" />
        </div>
      </div>
    </div>
  );
}
