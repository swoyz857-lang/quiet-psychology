import { useEffect } from 'react';
import SEO from '../components/SEO';
import SectionHeading from '../components/SectionHeading';
import JsonLd from '../components/JsonLd';
import Card from '../components/ui/Card';
import { trackPageView } from '../hooks/useAnalytics';

export default function About() {
  useEffect(() => {
    trackPageView('/about');
  }, []);

  return (
    <>
      <SEO title="About | Quiet Psychology" description="Learn about Quiet Psychology — a premium publisher of behavioral intelligence." pathname="/about" />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'AboutPage',
          name: 'About Quiet Psychology',
          url: `${import.meta.env.VITE_SITE_URL || 'https://quietpsychology.com'}/about`,
          mainEntity: {
            '@type': 'Organization',
            name: 'Quiet Psychology',
            url: 'https://quietpsychology.com',
            logo: 'https://quietpsychology.com/logo.png',
            description: 'A premium publisher of behavioral intelligence research and digital publications.',
          },
        }}
      />
      <section className="page-section overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(201,169,98,0.08),transparent_60%)]" />
        <div className="relative z-10 container-site">
          <SectionHeading
            eyebrow="About"
            title="A Publisher for Behavioral Intelligence"
            description="Quiet Psychology is not a coaching company. It is not a therapy business. It is an archive of premium psychological frameworks."
          />

          <div className="mt-14 md:mt-20 space-y-8 md:space-y-12">
            <div className="surface-elevated p-8 md:p-12">
              <h2 className="font-serif text-2xl md:text-3xl text-heading mb-4">What We Are</h2>
              <p className="text-body leading-relaxed text-lg">
                Quiet Psychology is a luxury digital publishing company focused on behavioral intelligence.
                We produce research-driven publications on breakups, attachment, communication, and attraction.
                Every book is designed as an intellectual asset that the reader returns to, studies, and applies.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="surface-elevated p-8 md:p-10">
                <h2 className="font-serif text-2xl text-heading mb-4">Publishing Philosophy</h2>
                <p className="text-body leading-relaxed">
                  We do not sell advice. We sell understanding. We avoid motivational language, exaggeration, and guru
                  positioning. Instead, we present frameworks with clarity, authority, and precision.
                </p>
              </div>
              <div className="surface-elevated p-8 md:p-10">
                <h2 className="font-serif text-2xl text-heading mb-4">Research-Driven Approach</h2>
                <p className="text-body leading-relaxed">
                  Every publication is grounded in behavioral psychology, attachment theory, communication research, and
                  mating dynamics. We translate complex behavioral patterns into practical frameworks without diluting
                  the science behind them.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 md:mt-16 grid md:grid-cols-3 gap-6">
            {[
              { title: 'Intelligent', description: 'Frameworks built on behavioral science.' },
              { title: 'Premium', description: 'High-value intellectual assets.' },
              { title: 'Minimal', description: 'No filler. Only what matters.' },
            ].map((item) => (
              <Card key={item.title} className="text-center hover:border-soft-gold/30">
                <h3 className="font-serif text-2xl text-heading mb-2">{item.title}</h3>
                <p className="text-body">{item.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
