import { cn } from '../../lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export default function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'relative inline-flex items-center justify-center font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-soft-gold/50 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden',
        {
          'bg-soft-gold text-obsidian hover:bg-soft-gold-light hover:shadow-gold-soft hover:-translate-y-0.5': variant === 'primary',
          'bg-light-gray dark:bg-charcoal text-dark-text dark:text-muted-white border border-black/10 dark:border-white/10 hover:border-soft-gold/40 hover:bg-white dark:hover:bg-white/5': variant === 'secondary',
          'border border-soft-gold text-soft-gold hover:bg-soft-gold/10 hover:shadow-[0_0_30px_rgba(201,169,98,0.15)]': variant === 'outline',
          'text-light-text dark:text-muted-gray hover:text-dark-text dark:hover:text-muted-white': variant === 'ghost',
          'px-5 py-2.5 text-sm': size === 'sm',
          'px-8 py-3.5 text-base': size === 'md',
          'px-10 py-4 text-lg': size === 'lg',
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
