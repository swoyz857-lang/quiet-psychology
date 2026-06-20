import { cn } from '../../lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export default function Card({ children, className }: CardProps) {
  return (
    <div
      className={cn(
        'surface-card p-6 md:p-8 transition-all duration-300 hover:border-black/15 dark:hover:border-white/15',
        className
      )}
    >
      {children}
    </div>
  );
}
