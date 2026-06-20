import { useMemo } from 'react';

const COUNT = 16;

export default function Sparkles() {
  const sparkles = useMemo(() => {
    return Array.from({ length: COUNT }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: Math.random() * 2 + 1,
      delay: `${Math.random() * 5}s`,
      duration: `${Math.random() * 3 + 3}s`,
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {sparkles.map((s) => (
        <span
          key={s.id}
          className="absolute rounded-full bg-soft-gold/60 animate-twinkle"
          style={{
            left: s.left,
            top: s.top,
            width: s.size,
            height: s.size,
            animationDelay: s.delay,
            animationDuration: s.duration,
            boxShadow: '0 0 4px rgba(201,169,98,0.4)',
          }}
        />
      ))}
    </div>
  );
}
