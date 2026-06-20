import { useRef, useState, type MouseEvent, type TouchEvent } from 'react';
import { cn } from '../lib/utils';

interface Book3DProps {
  src: string;
  alt: string;
  className?: string;
}

export default function Book3D({ src, alt, className }: Book3DProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMove = (clientX: number, clientY: number) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (clientY - rect.top - rect.height / 2) / (rect.height / 2);
    const y = (clientX - rect.left - rect.width / 2) / (rect.width / 2);
    setRotate({ x: x * -12, y: y * 12 });
  };

  const onMouseMove = (e: MouseEvent<HTMLDivElement>) => handleMove(e.clientX, e.clientY);
  const onTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    if (e.touches.length > 0) handleMove(e.touches[0].clientX, e.touches[0].clientY);
  };

  const reset = () => {
    setRotate({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <div
      ref={ref}
      className={cn('perspective-[1200px]', className)}
      onMouseMove={onMouseMove}
      onMouseLeave={reset}
      onMouseEnter={() => setIsHovered(true)}
      onTouchMove={onTouchMove}
      onTouchEnd={reset}
    >
      <div
        className="relative w-full transition-transform duration-200 ease-out will-change-transform"
        style={{
          transformStyle: 'preserve-3d',
          transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) ${isHovered ? 'scale(1.04)' : 'scale(1)'}`,
        }}
      >
        <img
          src={src}
          alt={alt}
          className="relative w-full rounded shadow-2xl"
          style={{
            boxShadow: '0 25px 60px -15px rgba(0,0,0,0.5), 0 0 40px rgba(201,169,98,0.15)',
          }}
        />
        <div
          className="pointer-events-none absolute inset-0 rounded bg-gradient-to-tr from-white/10 via-transparent to-black/20 mix-blend-overlay opacity-0 hover:opacity-100 transition-opacity duration-300"
          style={{ transform: 'translateZ(2px)' }}
        />
      </div>
    </div>
  );
}
