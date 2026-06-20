import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Lock, Eye, Sparkles, Flame } from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import { useParallax } from '../hooks/useParallax';
import { trackPageView } from '../hooks/useAnalytics';
import SEO from '../components/SEO';
import JsonLd from '../components/JsonLd';
import SectionHeading from '../components/SectionHeading';
import ScrollReveal from '../components/ScrollReveal';

import MagneticButton from '../components/MagneticButton';
import SpotlightCard from '../components/SpotlightCard';
import BookCard from '../components/BookCard';
import TrustIndicators from '../components/TrustIndicators';
import Typewriter from '../components/Typewriter';
import Book3D from '../components/Book3D';
import EmailCapture from '../components/EmailCapture';
import ReviewCard from '../components/ReviewCard';
import Accordion from '../components/ui/Accordion';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import StarRating from '../components/ui/StarRating';
import PricingDisplay from '../components/PricingDisplay';
import BackgroundVideo from '../components/BackgroundVideo';
import { FAQ_ITEMS, TRUST_METRICS } from '../lib/constants';
import { DEMO_REVIEWS } from '../lib/demoReviews';
import { api } from '../lib/api';
import type { Review } from '../types';

const BOOK_BENEFITS = [
  {
    title: 'Flip the dynamic',
    description: 'Regain psychological leverage after a breakup or ghosting by understanding silence as strategy.',
  },
  {
    title: 'Cut dependency loops',
    description: 'Identify and interrupt the emotional cycles that keep you attached to someone who has withdrawn.',
  },
  {
    title: 'Rebuild perceived value',
    description: 'Shift how you are seen through a step-by-step behavioral reset rooted in mating psychology.',
  },
  {
    title: 'A permanent framework',
    description: 'Not motivational advice. A reusable mental model for relationships, attachment, and attraction.',
  },
];

export default function Home() {
  const { products, loading } = useProducts();
  const [reviews, setReviews] = useState<Review[]>([]);
  const parallaxY = useParallax(0.25);

  useEffect(() => {
    trackPageView('/');
    api.reviews.list().then((data) => {
      const merged = data.length > 0 ? data : DEMO_REVIEWS;
      setReviews(merged);
    }).catch(() => setReviews(DEMO_REVIEWS));
  }, []);

  const featured = products.find((p) => p.slug === 'the-no-contact-blueprint') || products[0];
  const otherProducts = products.filter((p) => p.slug !== featured?.slug);

  return (
    <>
      <SEO pathname="/" />
      <JsonLd
        data={[
          {
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'Quiet Psychology',
            url: 'https://quietpsychology.com',
            logo: 'https://quietpsychology.com/logo.png',
            sameAs: [
              'https://instagram.com/quietpsychology',
              'https://twitter.com/quietpsychology',
            ],
          },
          {
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: 'Quiet Psychology',
            url: 'https://quietpsychology.com',
            potentialAction: {
              '@type': 'SearchAction',
              target: 'https://quietpsychology.com/archive?q={search_term_string}',
              'query-input': 'required name=search_term_string',
            },
          },
        ]}
      />

      {/* Hero */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8 pt-28 md:pt-32 pb-8 md:pb-16">
        <div
          className="absolute inset-0 transition-transform duration-100 ease-out"
          style={{ transform: `translateY(${parallaxY}px)` }}
        >
          <BackgroundVideo
            overlayClassName="bg-cream/40 dark:bg-obsidian/60"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(201,169,98,0.18),transparent_55%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(201,169,98,0.1),transparent_40%)]" />
          </BackgroundVideo>
        </div>

        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-soft-gold/25 animate-float blur-[1px]"
              style={{
                width: `${3 + (i % 4)}px`,
                height: `${3 + (i % 4)}px`,
                left: `${8 + (i * 7) % 85}%`,
                top: `${12 + (i * 11) % 76}%`,
                animationDelay: `${i * 0.6}s`,
                animationDuration: `${8 + (i % 5) * 2}s`,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 mx-auto max-w-7xl w-full">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="order-2 lg:order-1 text-center lg:text-left animate-fade-in relative">
              <div className="hidden lg:flex absolute -left-10 top-0 bottom-0 items-center">
                <span className="text-[10px] tracking-[0.3em] uppercase text-soft-gold/60 writing-mode-vertical rotate-180" style={{ writingMode: 'vertical-rl' }}>
                  Premium Archive
                </span>
              </div>

              <div className="inline-flex items-center gap-2 px-4 py-2 surface-glass rounded-full mb-6 md:mb-8 hero-glow">
                <Sparkles size={14} className="text-soft-gold" />
                <span className="text-xs tracking-[0.2em] uppercase text-soft-gold font-medium">
                  Premium Bestseller
                </span>
              </div>

              <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-heading leading-[1.05] mb-5 md:mb-6">
                <span className="block">The No-Contact</span>
                <span className="italic gradient-text gold-text-glow">Blueprint</span>
              </h1>

              <p className="text-body text-lg md:text-xl leading-relaxed mb-6 md:mb-8 max-w-xl mx-auto lg:mx-0 min-h-[3.5rem]">
                <Typewriter
                  text="The strategic intelligence guide for turning silence into power after a breakup or ghosting."
                  delay={600}
                  speed={28}
                />
              </p>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 md:gap-5 mb-8 md:mb-10 text-sm text-body">
                <div className="flex items-center gap-2 surface-glass px-3 py-1.5">
                  <StarRating rating={TRUST_METRICS.rating} size={16} />
                  <span className="text-heading font-medium">{TRUST_METRICS.rating.toFixed(1)}</span>
                </div>
                <span className="hidden sm:inline text-body/60">|</span>
                <span>{TRUST_METRICS.reviews}+ verified readers</span>
                <span className="hidden sm:inline text-body/60">|</span>
                <span>{TRUST_METRICS.purchases.toLocaleString('en-US')} sold</span>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-8 md:mb-10">
                <MagneticButton strength={0.2}>
                  <Link to={featured ? `/checkout/${featured.slug}` : '/archive'}>
                    <Button size="lg" className="w-full sm:w-auto pulse-gold shimmer-border group h-14 px-10 shadow-[0_0_40px_-10px_rgba(201,169,98,0.3)] hover:shadow-[0_0_60px_-10px_rgba(201,169,98,0.5)]">
                      <span className="flex items-center">
                        Get Instant Access <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </Button>
                  </Link>
                </MagneticButton>
                <MagneticButton strength={0.15}>
                  <Link to={featured ? `/books/${featured.slug}` : '/archive'}>
                    <Button variant="outline" size="lg" className="w-full sm:w-auto hover:shadow-[0_0_30px_rgba(201,169,98,0.15)]">
                      Read More
                    </Button>
                  </Link>
                </MagneticButton>
              </div>

              <div className="inline-flex flex-wrap items-center justify-center lg:justify-start gap-2 md:gap-3 p-1.5 surface-glass rounded-lg">
                {[
                  { icon: Lock, text: 'PDF + EPUB' },
                  { icon: Eye, text: 'Instant Download' },
                  { icon: Sparkles, text: 'Lifetime Access' },
                ].map(({ icon: Icon, text }) => (
                  <span key={text} className="flex items-center gap-2 px-3 py-1.5 text-xs md:text-sm text-body">
                    <Icon size={13} className="text-soft-gold" /> {text}
                  </span>
                ))}
              </div>
            </div>

            <div className="order-1 lg:order-2 flex justify-center animate-fade-in hero-float" style={{ animationDelay: '0.15s' }}>
              {featured && (
                <Link
                  to={`/books/${featured.slug}`}
                  className="group relative block w-full max-w-[300px] sm:max-w-sm lg:max-w-md"
                >
                  <div className="absolute -inset-8 sm:-inset-12 bg-gradient-to-tr from-soft-gold/25 via-transparent to-soft-gold/10 rounded-full blur-3xl opacity-60 group-hover:opacity-100 transition-opacity duration-700" />
                  <div className="absolute inset-x-0 -bottom-8 h-16 bg-soft-gold/30 blur-3xl rounded-full opacity-60 group-hover:opacity-90 transition-opacity" />
                  <Book3D src={featured.coverImage} alt={featured.title} className="relative w-full" />
                  <div className="absolute -bottom-4 left-0 right-0 z-20 p-4 sm:p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                    <div className="surface-glass px-4 py-3 shadow-lg">
                      <p className="text-[10px] tracking-widest uppercase text-soft-gold mb-0.5">Limited Pricing</p>
                      <div className="font-serif">
                        <PricingDisplay price={featured.price} comparePrice={featured.comparePrice} size="sm" layout="horizontal" showDiscount />
                      </div>
                      {featured.stock > 0 && (
                        <p className="flex items-center gap-1.5 mt-2 text-[10px] text-soft-gold/90">
                          <Flame size={10} className="text-soft-gold" />
                          Only {featured.stock.toLocaleString('en-US')} left
                        </p>
                      )}
                    </div>
                  </div>
                </Link>
              )}
            </div>
          </div>
        </div>

        <div className="relative z-10 mt-12 md:mt-16">
          <Link to="#benefits" className="group flex flex-col items-center gap-2 text-body hover:text-soft-gold transition-colors">
            <span className="text-[10px] tracking-[0.25em] uppercase text-soft-gold/70">Discover</span>
            <span className="w-px h-10 bg-gradient-to-b from-soft-gold/60 to-transparent group-hover:h-12 transition-all duration-300" />
          </Link>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-cream dark:from-obsidian to-transparent pointer-events-none" />
      </section>

      {/* Benefits */}
      <section id="benefits" className="page-section surface-elevated">
        <div className="container-site">
          <ScrollReveal>
            <SectionHeading
              eyebrow="Why It Works"
              title="Silence, Reframed as Strategy"
              description="The No-Contact Blueprint turns post-breakup confusion into a clear, behavioral framework."
            />
          </ScrollReveal>
          <div className="mt-14 md:mt-20 grid md:grid-cols-2 gap-4 md:gap-6">
            {BOOK_BENEFITS.map((benefit, index) => (
              <ScrollReveal key={index} delay={index * 100}>
                <SpotlightCard className="h-full">
                  <Card className="flex items-start gap-4 md:gap-5 group hover:border-soft-gold/30 h-full">
                    <span className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-soft-gold/10 text-soft-gold font-serif text-lg md:text-xl group-hover:bg-soft-gold group-hover:text-obsidian transition-colors">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <h3 className="font-serif text-xl md:text-2xl text-heading mb-2">{benefit.title}</h3>
                      <p className="text-body leading-relaxed">{benefit.description}</p>
                    </div>
                  </Card>
                </SpotlightCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Archive */}
      <section id="archive" className="page-section">
        <div className="container-site">
          <ScrollReveal>
            <SectionHeading
              eyebrow="The Archive"
              title="Other Intelligence Publications"
              description="Each volume is a research-driven document that reveals patterns usually invisible."
            />
          </ScrollReveal>
          {loading ? (
            <p className="text-center text-body mt-14 md:mt-20">Loading publications...</p>
          ) : (
            <div className="relative mt-14 md:mt-20">
              <div className="absolute -right-4 md:-right-12 top-1/2 -translate-y-1/2 pointer-events-none select-none hidden lg:block">
                <span className="font-serif text-[10rem] xl:text-[12rem] leading-none text-soft-gold archive-watermark" style={{ WebkitTextStroke: '1px rgba(201,169,98,0.15)', WebkitTextFillColor: 'transparent' }}>
                  Archive
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
                {otherProducts.map((product, i) => (
                  <ScrollReveal key={product.id} delay={i * 100}>
                    <BookCard product={product} />
                  </ScrollReveal>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Trust */}
      <section className="page-section surface-elevated">
        <div className="container-site">
          <ScrollReveal>
            <SectionHeading eyebrow="Trust" title="A Trusted Archive" reveal />
          </ScrollReveal>
          <div className="mt-14 md:mt-20">
            <TrustIndicators />
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="page-section">
        <div className="container-site">
          <ScrollReveal>
            <SectionHeading eyebrow="Reader Reviews" title="What Archive Readers Say" />
          </ScrollReveal>
          <div className="mt-14 md:mt-20 grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {reviews.slice(0, 6).map((review, i) => (
              <ScrollReveal key={review.id} delay={i * 100}>
                <ReviewCard review={review} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="page-section surface-elevated">
        <div className="container-narrow">
          <ScrollReveal>
            <SectionHeading eyebrow="Questions" title="Frequently Asked" />
          </ScrollReveal>
          <div className="mt-12 md:mt-16">
            <Accordion items={FAQ_ITEMS} />
          </div>
        </div>
      </section>

      {/* Email Capture */}
      <section className="relative page-section overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-light-gray to-cream dark:from-charcoal dark:to-obsidian" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(201,169,98,0.08),transparent_60%)]" />
        <div className="relative z-10 container-narrow text-center">
          <ScrollReveal>
            <SectionHeading
              title="Join the Research Archive"
              description="Get new release alerts and behavioral intelligence updates."
            />
          </ScrollReveal>
          <div className="mt-10 md:mt-12">
            <EmailCapture source="homepage" />
          </div>
        </div>
      </section>
    </>
  );
}
