import type { Review } from '../types';
import StarRating from './ui/StarRating';
import { formatDate } from '../lib/utils';
import { Quote } from 'lucide-react';
import TiltCard from './TiltCard';
import SpotlightCard from './SpotlightCard';

interface ReviewCardProps {
  review: Review;
}

export default function ReviewCard({ review }: ReviewCardProps) {
  return (
    <TiltCard className="h-full">
      <SpotlightCard className="h-full">
        <div className="relative surface-card hover:border-soft-gold/30 transition-colors duration-300 h-full p-6 md:p-8">
          <Quote size={24} className="absolute top-6 right-6 text-soft-gold/15" />
          <div className="flex items-center justify-between mb-4">
            <StarRating rating={review.rating} />
            <span className="text-xs text-body tracking-wide">{formatDate(review.createdAt)}</span>
          </div>
          <p className="text-heading leading-relaxed mb-4">{review.reviewText}</p>
          <p className="text-sm text-soft-gold">— {review.displayName}</p>
        </div>
      </SpotlightCard>
    </TiltCard>
  );
}
