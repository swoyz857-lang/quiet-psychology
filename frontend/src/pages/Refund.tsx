import { useEffect } from 'react';
import SEO from '../components/SEO';
import SectionHeading from '../components/SectionHeading';
import { trackPageView } from '../hooks/useAnalytics';

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
          <div className="mt-12 md:mt-16 space-y-8 md:space-y-10 text-body leading-relaxed">
            <div className="surface-card p-6 md:p-8 border-l-4 border-soft-gold">
              <h2 className="font-serif text-xl md:text-2xl text-heading mb-2">All Sales Are Final</h2>
              <p>
                Due to the immediate and irrevocable nature of digital products, all purchases made through
                Quiet Psychology are final. We do not offer refunds, exchanges, or returns under any
                circumstances.
              </p>
            </div>
            <div>
              <h2 className="font-serif text-2xl text-heading mb-3">Product Access</h2>
              <p>
                Upon successful payment, you will receive instant access to downloadable PDF and EPUB files.
                Please ensure that your email address and payment details are correct before completing your
                purchase.
              </p>
            </div>
            <div>
              <h2 className="font-serif text-2xl text-heading mb-3">Technical Issues</h2>
              <p>
                If you experience difficulty downloading or accessing your files, contact our support team at{' '}
                <a href="mailto:hello@quietpsychology.com" className="text-soft-gold hover:underline">
                  hello@quietpsychology.com
                </a>{' '}
                and we will assist you in resolving the issue promptly.
              </p>
            </div>
            <div>
              <h2 className="font-serif text-2xl text-heading mb-3">Disputes</h2>
              <p>
                Chargebacks or payment disputes filed without first contacting support may result in permanent
                suspension of access to the archive and any future purchases.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
