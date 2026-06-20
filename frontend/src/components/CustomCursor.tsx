import { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouch) return;

    let rafId: number;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const onMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      setHidden(false);
    };

    const onLeave = () => setHidden(true);
    const onEnter = () => setHidden(false);

    const animate = () => {
      currentX += (targetX - currentX) * 0.15;
      currentY += (targetY - currentY) * 0.15;
      setPos({ x: currentX, y: currentY });
      rafId = requestAnimationFrame(animate);
    };

    const onHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = target.closest('a, button, [role="button"], input, textarea, select, label');
      setHovering(!!isInteractive);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseout', onLeave);
    window.addEventListener('mouseover', onEnter);
    window.addEventListener('mouseover', onHover, { passive: true });
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseout', onLeave);
      window.removeEventListener('mouseover', onEnter);
      window.removeEventListener('mouseover', onHover);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference hidden md:block"
        style={{
          transform: `translate3d(${pos.x - 6}px, ${pos.y - 6}px, 0)`,
          opacity: hidden ? 0 : 1,
          transition: 'opacity 0.3s ease, width 0.3s ease, height 0.3s ease',
        }}
      >
        <div
          className={`rounded-full border border-soft-gold transition-all duration-300 ${
            hovering ? 'w-12 h-12 -m-3 opacity-60' : 'w-3 h-3 opacity-100'
          }`}
        />
      </div>
      <style>{`
        @media (pointer: fine) {
          body {
            cursor: none;
          }
          a, button, [role="button"], input, textarea, select, label {
            cursor: none;
          }
        }
      `}</style>
    </>
  );
}
