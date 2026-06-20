import { useState } from 'react';
import { api } from '../lib/api';
import { trackEmailSignup } from '../hooks/useAnalytics';
import Input from './ui/Input';
import Button from './ui/Button';

interface EmailCaptureProps {
  source?: string;
  title?: string;
  subtitle?: string;
}

export default function EmailCapture({
  source = 'website',
  title,
  subtitle = 'Receive research updates and new release notifications.',
}: EmailCaptureProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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

  return (
    <div>
      {title && <h4 className="font-serif text-xl text-heading mb-2">{title}</h4>}
      {subtitle && <p className="text-body text-sm mb-4">{subtitle}</p>}

      {status === 'success' ? (
        <p className="text-soft-gold text-sm">You are now subscribed to the archive.</p>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="flex-1"
          />
          <Button type="submit" disabled={loading}>
            {loading ? '...' : 'Subscribe'}
          </Button>
        </form>
      )}
      {status === 'error' && (
        <p className="mt-2 text-sm text-red-500 dark:text-red-400">Something went wrong. Please try again.</p>
      )}
    </div>
  );
}
