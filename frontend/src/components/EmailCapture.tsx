import { useState } from 'react';
import { api } from '../lib/api';
import { trackEmailSignup } from '../hooks/useAnalytics';
import { Mail, Check, ArrowRight, Sparkles, Lock, Eye } from 'lucide-react';
import Button from './ui/Button';

interface EmailCaptureProps {
  source?: string;
  title?: string;
  subtitle?: string;
  variant?: 'inline' | 'boxed' | 'hero';
  benefits?: string[];
}

const DEFAULT_BENEFITS = [
  'Free chapter from The No-Contact Blueprint',
  'Early access to new releases',
  'No spam. Unsubscribe anytime.',
];

export default function EmailCapture({
  source = 'website',
  title,
  subtitle,
  variant = 'inline',
  benefits = DEFAULT_BENEFITS,
}: EmailCaptureProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    try {
      await api.subscribers.create(email, source);
      trackEmailSignup(source);
      setStatus('success');
      setEmail('');
    } catch {
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  const isBoxed = variant === 'boxed' || variant === 'hero';

  return (
    <div
      className={`
        ${isBoxed ? 'bg-charcoal/60 backdrop-blur-sm border border-white/10 p-6 md:p-8 shadow-2xl' : ''}
        ${variant === 'hero' ? 'relative overflow-hidden' : ''}
      `}
    >
      {variant === 'hero' && (
        <>
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-soft-gold/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-soft-gold/10 rounded-full blur-3xl pointer-events-none" />
        </>
      )}

      <div className="relative z-10">
        {title && (
          <h4 className="font-serif text-2xl md:text-3xl text-heading mb-2 md:mb-3">{title}</h4>
        )}
        {subtitle && (
          <p className="text-body text-sm md:text-base mb-5 md:mb-6 leading-relaxed">{subtitle}</p>
        )}

        {isBoxed && (
          <ul className="space-y-2 mb-6">
            {benefits.map((benefit, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-body">
                <span className="mt-0.5 flex-shrink-0 w-4 h-4 rounded-full bg-soft-gold/10 flex items-center justify-center">
                  <Check size={10} className="text-soft-gold" />
                </span>
                {benefit}
              </li>
            ))}
          </ul>
        )}

        {status === 'success' ? (
          <div className="bg-green-500/10 border border-green-500/20 p-4 md:p-5 text-center">
            <div className="w-10 h-10 mx-auto mb-3 bg-green-500/10 rounded-full flex items-center justify-center">
              <Sparkles size={18} className="text-green-500" />
            </div>
            <p className="text-heading font-medium mb-1">Welcome to the archive.</p>
            <p className="text-body text-sm">Check your inbox for the free chapter preview.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="relative group">
              <Mail
                size={16}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-gray group-focus-within:text-soft-gold transition-colors"
              />
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={`
                  w-full bg-white/5 dark:bg-black/20 border border-white/10 text-heading placeholder:text-body/60
                  focus:border-soft-gold/50 focus:outline-none focus:ring-1 focus:ring-soft-gold/30
                  transition-all
                  ${isBoxed ? 'pl-11 pr-4 py-4 text-sm' : 'pl-11 pr-4 py-3.5 text-sm'}
                `}
              />
            </div>
            <Button
              type="submit"
              disabled={loading}
              className={`w-full group/btn ${isBoxed ? 'h-12 text-base' : ''}`}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-obsidian/30 border-t-obsidian rounded-full animate-spin" />
                  Joining...
                </span>
              ) : (
                <span className="flex items-center justify-center">
                  Get Free Access <ArrowRight size={16} className="ml-2 group-hover/btn:translate-x-1 transition-transform" />
                </span>
              )}
            </Button>
          </form>
        )}

        {status === 'error' && (
          <p className="mt-3 text-sm text-red-500 dark:text-red-400 text-center">
            Something went wrong. Please try again.
          </p>
        )}

        {isBoxed && status !== 'success' && (
          <div className="mt-4 flex items-center justify-center gap-4 text-[10px] md:text-xs text-body/70">
            <span className="flex items-center gap-1">
              <Lock size={10} /> Secure signup
            </span>
            <span className="flex items-center gap-1">
              <Eye size={10} /> No spam, ever
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
