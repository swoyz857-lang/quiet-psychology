import { Star } from 'lucide-react';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { cn } from '../../lib/utils';

interface AnimatedStarRatingProps {
  rating: number;
  size?: number;
  className?: string;
}

export default function AnimatedStarRating({ rating, size = 18, className }: AnimatedStarRatingProps) {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>(0.3);
  const width = `${(rating / 5) * 100}%`;

  return (
    <div
      ref={ref}
      className={cn('relative inline-flex items-center gap-0.5', className)}
      aria-label={`${rating} out of 5 stars`}
    >
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={`empty-${i}`}
            size={size}
            className="text-black/15 dark:text-white/15"
          />
        ))}
      </div>
      <div
        className="absolute left-0 top-0 flex items-center gap-0.5 star-fill"
        style={{
          width,
          animationPlayState: isVisible ? 'running' : 'paused',
        }}
      >
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={`filled-${i}`}
            size={size}
            className="fill-soft-gold text-soft-gold flex-shrink-0"
          />
        ))}
      </div>
    </div>
  );
}
