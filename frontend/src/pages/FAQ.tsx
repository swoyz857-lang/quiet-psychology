import { useEffect } from 'react';
import SEO from '../components/SEO';
import SectionHeading from '../components/SectionHeading';
import Accordion from '../components/ui/Accordion';
import JsonLd from '../components/JsonLd';
import { trackPageView } from '../hooks/useAnalytics';
import { FAQ_ITEMS } from '../lib/constants';

export default function FAQ() {
  useEffect(() => {
    trackPageView('/faq');
  }, []);

  return (
    <>
      <SEO title="FAQ | Quiet Psychology" description="Frequently asked questions about purchases, downloads, and our publications." pathname="/faq" />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: FAQ_ITEMS.map((item) => ({
            '@type': 'Question',
            name: item.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: item.answer,
            },
          })),
        }}
      />
      <section className="page-section overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(201,169,98,0.06),transparent_60%)]" />
        <div className="relative z-10 container-narrow">
          <SectionHeading
            eyebrow="Support"
            title="Frequently Asked Questions"
            description="Clear answers about our archive, products, and purchase process."
          />
          <div className="mt-12 md:mt-16 surface-card p-6 md:p-10">
            <Accordion items={FAQ_ITEMS} />
          </div>
        </div>
      </section>
    </>
  );
}
