import { useEffect } from 'react';
import SEO from '../components/SEO';
import SectionHeading from '../components/SectionHeading';
import { trackPageView } from '../hooks/useAnalytics';

export default function Terms() {
  useEffect(() => {
    trackPageView('/terms');
  }, []);

  return (
    <>
      <SEO title="Terms of Service | Quiet Psychology" description="Terms of service for Quiet Psychology." pathname="/terms" />
      <section className="page-section">
        <div className="container-narrow">
          <SectionHeading title="Terms of Service" align="center" />
          <div className="mt-12 md:mt-16 space-y-8 md:space-y-10 text-body leading-relaxed">
            <p>
              By accessing or purchasing from Quiet Psychology, you agree to these terms. Please read them
              carefully.
            </p>
            <div>
              <h2 className="font-serif text-2xl text-heading mb-3">Digital Products</h2>
              <p>
                All products are digital. Upon purchase, you receive access to downloadable PDF and EPUB files.
                These files are for personal use only and may not be redistributed, resold, or shared.
              </p>
            </div>
            <div>
              <h2 className="font-serif text-2xl text-heading mb-3">No Medical or Therapeutic Advice</h2>
              <p>
                Quiet Psychology publications are educational resources. They are not a substitute for therapy,
                counseling, or medical advice.
              </p>
            </div>
            <div>
              <h2 className="font-serif text-2xl text-heading mb-3">Intellectual Property</h2>
              <p>
                All content, branding, and materials on this site are the property of Quiet Psychology.
                Unauthorized reproduction or distribution is prohibited.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
