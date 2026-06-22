import { useEffect } from 'react';
import SEO from '../components/SEO';
import SectionHeading from '../components/SectionHeading';
import { trackPageView } from '../hooks/useAnalytics';
import { Mail, Calendar } from 'lucide-react';

export default function Refund() {
  useEffect(() => {
    trackPageView('/refund');
  }, []);

  return (
    <>
      <SEO title="Refund Policy | Quiet Psychology" description="Refund policy for Quiet Psychology digital publications." pathname="/refund" />
      <section className="page-section">
        <div className="container-narrow">
          <SectionHeading title="Refund Policy" align="center" />

          <div className="mt-8 mb-12 flex flex-wrap items-center justify-center gap-4 text-xs text-body">
            <span className="flex items-center gap-1.5 surface-glass px-3 py-1.5">
              <Calendar size={12} className="text-soft-gold" /> Last Updated: June 2026
            </span>
          </div>

          <div className="space-y-10 md:space-y-12 text-body leading-relaxed">
            <p className="text-lg">
              Quiet Psychology sells digital products including ebooks, guides, and educational materials delivered electronically.
            </p>

            <div className="surface-card p-6 md:p-8 border-l-4 border-soft-gold">
              <h2 className="font-serif text-2xl text-heading mb-4">Digital Product Policy</h2>
              <p>
                Due to the instant and irreversible nature of digital product delivery, all sales are final.
              </p>
              <p className="mt-3">
                Once a product has been purchased and delivered, refunds, returns, and exchanges are not available.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-2xl text-heading mb-4">Exceptions</h2>
              <p className="mb-4">A replacement copy may be provided if:</p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 w-1.5 h-1.5 bg-soft-gold rounded-full shrink-0" />
                  The purchased file is corrupted or inaccessible.
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 w-1.5 h-1.5 bg-soft-gold rounded-full shrink-0" />
                  The customer did not receive the download due to a technical error.
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 w-1.5 h-1.5 bg-soft-gold rounded-full shrink-0" />
                  A duplicate product was accidentally delivered in error.
                </li>
              </ul>
              <p className="mt-4">
                In such cases, customers should contact{' '}
                <a href="mailto:support@quietpsychology.com" className="text-soft-gold hover:underline">
                  support@quietpsychology.com
                </a>{' '}
                within 7 days of purchase.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-2xl text-heading mb-4">Chargebacks</h2>
              <p>
                Customers agree to contact Quiet Psychology before initiating a payment dispute or chargeback.
              </p>
              <p className="mt-3">
                Unauthorized chargebacks may result in the suspension of future purchases.
              </p>
            </div>

            <div className="surface-card p-6 md:p-8">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-soft-gold/10 flex items-center justify-center shrink-0">
                  <Mail size={18} className="text-soft-gold" />
                </div>
                <div>
                  <h2 className="font-serif text-xl text-heading mb-2">Contact</h2>
                  <p className="mb-2">For refund-related inquiries:</p>
                  <a href="mailto:support@quietpsychology.com" className="text-soft-gold hover:underline font-medium">
                    support@quietpsychology.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
