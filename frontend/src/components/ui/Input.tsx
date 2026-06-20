import { cn } from '../../lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export default function Input({ label, error, className, ...props }: InputProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="mb-2 block text-sm font-medium tracking-wide text-light-text dark:text-muted-gray">
          {label}
        </label>
      )}
      <input
        className={cn(
          'w-full bg-white dark:bg-charcoal border border-black/10 dark:border-white/10 px-4 py-3 text-dark-text dark:text-muted-white placeholder:text-light-text/70 dark:placeholder:text-muted-gray focus:border-soft-gold/50 focus:outline-none transition-colors',
          error && 'border-red-500/50',
          className
        )}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-500 dark:text-red-400">{error}</p>}
    </div>
  );
}
