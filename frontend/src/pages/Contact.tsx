import { useEffect, useState } from 'react';
import { Mail, MessageSquare } from 'lucide-react';
import SEO from '../components/SEO';
import SectionHeading from '../components/SectionHeading';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { api } from '../lib/api';
import { trackPageView } from '../hooks/useAnalytics';

export default function Contact() {
  useEffect(() => {
    trackPageView('/contact');
  }, []);

  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await api.support.create(form);
      setSubmitted(true);
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch {
      setError('Message could not be sent. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SEO title="Contact | Quiet Psychology" description="Get in touch with the Quiet Psychology support team." pathname="/contact" />
      <section className="page-section overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(201,169,98,0.06),transparent_50%)]" />
        <div className="relative z-10 container-narrow">
          <SectionHeading
            eyebrow="Contact"
            title="Get in Touch"
            description="Have a question? Send a message and our team will respond within 24 hours."
          />

          <div className="mt-12 md:mt-16 grid md:grid-cols-2 gap-6 md:gap-8">
            <div className="space-y-6 md:space-y-8">
              <div className="surface-elevated p-6 md:p-8">
                <Mail size={24} className="text-soft-gold mb-4" />
                <h2 className="font-serif text-xl text-heading mb-2">Email</h2>
                <a
                  href="mailto:hello@quietpsychology.com"
                  className="text-soft-gold hover:text-soft-gold-light transition-colors"
                >
                  hello@quietpsychology.com
                </a>
              </div>
              <div className="surface-elevated p-6 md:p-8">
                <MessageSquare size={24} className="text-soft-gold mb-4" />
                <h2 className="font-serif text-xl text-heading mb-2">Quick Support</h2>
                <p className="text-body text-sm">
                  Use the form for purchase issues, download problems, or general questions.
                </p>
              </div>
            </div>

            <div className="surface-card p-6 md:p-8">
              {submitted ? (
                <div className="text-center py-12">
                  <p className="text-soft-gold text-lg font-medium mb-2">Your message has been sent.</p>
                  <p className="text-body text-sm">We will get back to you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input
                    label="Name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                  />
                  <Input
                    label="Email"
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    required
                  />
                  <Input
                    label="Subject"
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    required
                  />
                  <div>
                    <label className="mb-2 block text-sm font-medium tracking-wide text-light-text dark:text-muted-gray">
                      Message
                    </label>
                    <textarea
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      rows={5}
                      className="w-full bg-white dark:bg-charcoal border border-black/10 dark:border-white/10 px-4 py-3 text-dark-text dark:text-muted-white placeholder:text-light-text/70 dark:placeholder:text-muted-gray focus:border-soft-gold/50 focus:outline-none transition-colors"
                      required
                    />
                  </div>
                  {error && <p className="text-sm text-red-500 dark:text-red-400">{error}</p>}
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
