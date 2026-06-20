import { useEffect } from 'react';
import SEO from '../components/SEO';
import SectionHeading from '../components/SectionHeading';
import { trackPageView } from '../hooks/useAnalytics';

export default function Privacy() {
  useEffect(() => {
    trackPageView('/privacy');
  }, []);

  return (
    <>
      <SEO title="Privacy Policy | Quiet Psychology" description="Privacy policy for Quiet Psychology." pathname="/privacy" />
      <section className="page-section">
        <div className="container-narrow">
          <SectionHeading title="Privacy Policy" align="center" />
          <div className="mt-12 md:mt-16 space-y-8 md:space-y-10 text-body leading-relaxed">
            <p>
              Quiet Psychology respects your privacy. This policy explains what information we collect, how we
              use it, and how we protect it.
            </p>
            <div>
              <h2 className="font-serif text-2xl text-heading mb-3">Information We Collect</h2>
              <p>
                We collect your email address when you subscribe, purchase a publication, or contact support.
                We also collect anonymized analytics data to improve the archive.
              </p>
            </div>
            <div>
              <h2 className="font-serif text-2xl text-heading mb-3">How We Use Information</h2>
              <p>
                Your information is used to deliver purchases, respond to inquiries, send research updates (if
                subscribed), and improve our platform. We do not sell your data.
              </p>
            </div>
            <div>
              <h2 className="font-serif text-2xl text-heading mb-3">Security</h2>
              <p>
                We use industry-standard security practices to protect your data. Payment processing is handled
                by Stripe and never touches our servers.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
