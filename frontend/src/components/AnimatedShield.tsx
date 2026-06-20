import { Shield } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { cn } from '../lib/utils';

interface AnimatedShieldProps {
  size?: number;
  className?: string;
}

export default function AnimatedShield({ size = 22, className }: AnimatedShieldProps) {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>(0.3);

  return (
    <div ref={ref} className={cn('h-6 flex items-center justify-center', className)}>
      <Shield
        size={size}
        className={cn(
          'text-soft-gold',
          isVisible && 'shield-pop'
        )}
        strokeWidth={1.5}
      />
    </div>
  );
}
