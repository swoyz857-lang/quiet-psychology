import { useScrollReveal } from '../hooks/useScrollReveal';
import { cn } from '../lib/utils';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  animation?: 'up' | 'scale' | 'fade';
  delay?: number;
}

export default function ScrollReveal({
  children,
  className,
  animation = 'up',
  delay = 0,
}: ScrollRevealProps) {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={cn(
        'reveal-up',
        animation === 'scale' && 'reveal-scale',
        animation === 'fade' && 'reveal-fade',
        isVisible && 'visible',
        delay && `delay-${Math.min(delay, 700)}`,
        className
      )}
      style={delay && (delay < 100 || delay > 700) ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
