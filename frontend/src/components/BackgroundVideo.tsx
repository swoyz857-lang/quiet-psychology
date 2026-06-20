import { useEffect, useRef, useState } from 'react';
import { cn } from '../lib/utils';

interface BackgroundVideoProps {
  src?: string;
  poster?: string;
  className?: string;
  overlayClassName?: string;
  children?: React.ReactNode;
}

export default function BackgroundVideo({
  src,
  poster,
  className,
  overlayClassName,
  children,
}: BackgroundVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldPlay, setShouldPlay] = useState(false);

  useEffect(() => {
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setShouldPlay(!!src && !isTouch && !prefersReducedMotion);
  }, [src]);

  if (!src) {
    return (
      <div className={cn('absolute inset-0 overflow-hidden', className)}>
        <div className="absolute inset-0 bg-cream dark:bg-obsidian transition-colors duration-500" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(201,169,98,0.18),transparent_55%)]" />
        {children}
      </div>
    );
  }

  return (
    <div className={cn('absolute inset-0 overflow-hidden', className)}>
      {shouldPlay ? (
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={poster}
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src={src} type="video/mp4" />
        </video>
      ) : (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: poster ? `url(${poster})` : undefined }}
        >
          {!poster && (
            <>
              <div className="absolute inset-0 bg-cream dark:bg-obsidian transition-colors duration-500" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(201,169,98,0.12),transparent_55%)]" />
            </>
          )}
        </div>
      )}
      <div
        className={cn(
          'absolute inset-0 bg-obsidian/60 dark:bg-obsidian/60',
          overlayClassName
        )}
      />
      {children}
    </div>
  );
}
