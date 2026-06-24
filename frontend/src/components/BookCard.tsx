import { Link } from 'react-router-dom';
import type { Product } from '../types';
import { formatPrice } from '../lib/utils';
import Badge from './ui/Badge';
import TiltCard from './TiltCard';
import SpotlightCard from './SpotlightCard';


interface BookCardProps {
  product: Product;
  featured?: boolean;
}

export default function BookCard({ product, featured }: BookCardProps) {
  return (
    <TiltCard className="h-full">
      <SpotlightCard className="h-full">
        <Link
          to={`/books/${product.slug}`}
          className="group block surface-card hover:border-soft-gold/40 transition-all duration-500 hover:shadow-gold-soft hover:-translate-y-2 h-full"
        >
          <div className="aspect-[2/3] overflow-hidden bg-light-gray dark:bg-graphite relative">
            <div className="absolute inset-0 bg-gradient-to-t from-white/60 dark:from-obsidian/60 via-transparent to-transparent z-10 opacity-60 group-hover:opacity-40 transition-opacity" />
            <img
              src={product.coverImage}
              alt={product.title}
              className="h-full w-full object-cover transform transition-all duration-700 ease-out group-hover:scale-110"
              loading="lazy"
            />
            <div className="absolute inset-0 z-20 flex items-center justify-center bg-obsidian/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-500">
              <span className="px-5 py-2 border border-soft-gold/60 text-soft-gold text-xs tracking-[0.2em] uppercase bg-obsidian/60 hover:bg-soft-gold hover:text-obsidian transition-colors duration-300">
                View Intelligence
              </span>
            </div>
          </div>
          <div className="p-5 md:p-6 relative">
            {featured && (
              <Badge variant="gold" className="mb-3">
                Bestseller
              </Badge>
            )}
            <h3 className="font-serif text-xl md:text-2xl text-heading mb-2 group-hover:text-soft-gold transition-colors duration-300">
              {product.title}
            </h3>
            <p className="text-body text-sm leading-relaxed mb-4 line-clamp-2">
              {product.shortDescription}
            </p>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-soft-gold font-medium text-lg md:text-xl">{formatPrice(product.price)}</span>
              <span className="text-body text-sm line-through">
                {formatPrice(product.comparePrice)}
              </span>
            </div>

          </div>
        </Link>
      </SpotlightCard>
    </TiltCard>
  );
}
