import { formatPrice } from '../lib/utils';

interface PricingDisplayProps {
  price: number;
  comparePrice: number;
  size?: 'sm' | 'md' | 'lg';
  layout?: 'horizontal' | 'vertical';
  showDiscount?: boolean;
}

export default function PricingDisplay({
  price,
  comparePrice,
  size = 'md',
  layout = 'horizontal',
  showDiscount = false,
}: PricingDisplayProps) {
  const discount = comparePrice > price ? Math.round(((comparePrice - price) / comparePrice) * 100) : 0;

  const sizeClasses = {
    sm: { current: 'text-xl', compare: 'text-sm', badge: 'text-[10px]' },
    md: { current: 'text-2xl md:text-3xl', compare: 'text-base', badge: 'text-xs' },
    lg: { current: 'text-4xl md:text-5xl lg:text-6xl', compare: 'text-lg md:text-2xl', badge: 'text-sm' },
  };

  return (
    <div className={layout === 'vertical' ? 'flex flex-col items-start gap-2' : 'flex items-baseline gap-3 md:gap-4'}>
      <div className="flex items-center gap-3">
        <span className={`font-serif ${sizeClasses[size].current} text-soft-gold`}>
          {formatPrice(price)}
        </span>
        {showDiscount && discount > 0 && (
          <span className={`${sizeClasses[size].badge} px-2 py-0.5 bg-soft-gold/10 text-soft-gold border border-soft-gold/20 font-medium tracking-wide`}>
            Save {discount}%
          </span>
        )}
      </div>
      <span className={`${sizeClasses[size].compare} text-body line-through`}>
        {formatPrice(comparePrice)}
      </span>
    </div>
  );
}
