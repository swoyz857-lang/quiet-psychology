import { cn } from '../../lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'gold' | 'default' | 'outline';
  className?: string;
}

export default function Badge({ children, variant = 'default', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-3 py-1 text-xs font-medium tracking-widest uppercase',
        {
          'bg-soft-gold text-obsidian': variant === 'gold',
          'bg-black/5 dark:bg-white/5 text-dark-text dark:text-muted-white': variant === 'default',
          'border border-black/10 dark:border-white/10 text-light-text dark:text-muted-gray': variant === 'outline',
        },
        className
      )}
    >
      {children}
    </span>
  );
}
