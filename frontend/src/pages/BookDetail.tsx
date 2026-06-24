import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Check, ArrowRight, Download, Eye, BookOpen, FileText, Shield, ChevronRight } from 'lucide-react';
import { useProduct } from '../hooks/useProducts';
import { useParallax } from '../hooks/useParallax';
import { trackProductView } from '../hooks/useAnalytics';
import SEO from '../components/SEO';
import JsonLd from '../components/JsonLd';
import Breadcrumb from '../components/Breadcrumb';
import SectionHeading from '../components/SectionHeading';
import ScrollReveal from '../components/ScrollReveal';
import MagneticButton from '../components/MagneticButton';
import PricingDisplay from '../components/PricingDisplay';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Accordion from '../components/ui/Accordion';
import ReviewCard from '../components/ReviewCard';
import BookCard from '../components/BookCard';
import { api } from '../lib/api';
import type { Product, Review } from '../types';
import { FAQ_ITEMS } from '../lib/constants';
import { formatPrice } from '../lib/utils';

const LEARNING_OUTCOMES: Record<string, string[]> = {
  'the-no-contact-blueprint': [
    'Understand the psychology of silence after a breakup',
    'Build emotional withdrawal and detachment strategy',
    'Rebuild perceived value from a position of strength',
    'Recognize and break emotional dependency loops',
  ],
  'texting-psychology': [
    'Decode response latency and investment signals',
    'Avoid common texting mistakes that reduce attraction',
    'Understand emotional triggers in written communication',
    'Use communication to shape perception',
  ],
  'the-attachment-archive': [
    'Identify your attachment style and behavioral signature',
    'Understand avoidance, anxiety, and bonding cycles',
    'Recognize hidden relationship patterns',
    'Navigate emotional dependency with clarity',
  ],
  'the-attraction-code': [
    'Understand desire and perceived value dynamics',
    'Recognize behavioral signals of attraction',
    'Apply mating psychology frameworks',
    'Shift how you are perceived in romantic contexts',
  ],
};

const TABLE_OF_CONTENTS: Record<string, string[]> = {
  'the-no-contact-blueprint': [
    '01 — The Psychology of Silence',
    '02 — Why No-Contact Resets Perception',
    '03 — Dependency Loops and How to Break Them',
    '04 — Strategic Withdrawal Framework',
    '05 — Rebuilding Perceived Value',
    '06 — Long-Term Emotional Discipline',
  ],
  'texting-psychology': [
    '01 — The Signal-to-Noise Ratio',
    '02 — Response Latency and Investment',
    '03 — Emotional Triggers in Text',
    '04 — Perception Management',
    '05 — Common Mistakes and Corrections',
    '06 — Advanced Texting Frameworks',
  ],
  'the-attachment-archive': [
    '01 — Attachment Styles Mapped',
    '02 — The Anxious-Avoidant Cycle',
    '03 — Bonding Patterns and Emotional Dependency',
    '04 — Recognizing Behavioral Signatures',
    '05 — Navigating Withdrawal and Pursuit',
    '06 — Restoring Relational Balance',
  ],
  'the-attraction-code': [
    '01 — Desire as a Behavioral Equation',
    '02 — Perceived Value and Mate Selection',
    '03 — Status, Competence, and Mystery',
    '04 — The Signals That Create Attraction',
    '05 — Common Attraction Killers',
    '06 — Building a Sustainable Edge',
  ],
};

const WHO_NOT_FOR = [
  'People seeking motivational content',
  'People looking for therapy or clinical treatment',
  'People wanting generic dating advice',
  'People unwilling to examine their own behavior',
];

const INCLUDED_ITEMS = [
  { icon: FileText, title: 'Premium PDF', description: 'Print-ready, formatted for all devices' },
  { icon: BookOpen, title: 'EPUB Edition', description: 'Optimized for e-readers and tablets' },
  { icon: Download, title: 'Instant Delivery', description: 'Download links sent immediately' },
  { icon: Eye, title: 'Lifetime Access', description: 'Own it forever, no subscriptions' },
];

export default function BookDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { product, loading, error } = useProduct(slug || '');
  const [reviews, setReviews] = useState<Review[]>([]);
  const [stats, setStats] = useState({ count: 0, average: 0 });
  const [related, setRelated] = useState<Product[]>([]);
  const [showStickyCta, setShowStickyCta] = useState(false);
  const parallaxY = useParallax(0.2);

  useEffect(() => {
    if (product) {
      trackProductView(product.slug, product.id);
      api.reviews.list(product.id).then(setReviews).catch(() => {});
      api.reviews
        .stats(product.id)
        .then((s) => setStats(s.count > 0 ? s : { count: 0, average: 0 }))
        .catch(() => {});
      api.products.list().then((all) => setRelated(all.filter((p) => p.id !== product.id))).catch(() => {});
    }
  }, [product]);

  useEffect(() => {
    const handleScroll = () => {
      setShowStickyCta(window.scrollY > 600);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isNoContact = product?.slug === 'the-no-contact-blueprint';

  if (loading) {
    return (
      <div className="pt-32 pb-20 px-6 text-center">
        <p className="text-body">Loading publication...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="pt-32 pb-20 px-6 text-center">
        <h1 className="font-serif text-3xl text-heading mb-4">Publication Not Found</h1>
        <Link to="/">
          <Button>Return to Archive</Button>
        </Link>
      </div>
    );
  }

  const outcomes = LEARNING_OUTCOMES[product.slug] || [];
  const toc = TABLE_OF_CONTENTS[product.slug] || [];
  const savings = product.comparePrice - product.price;
  const discount = product.comparePrice > 0 ? Math.round((savings / product.comparePrice) * 100) : 0;

  return (
    <>
      <SEO
        title={product.metaTitle}
        description={product.metaDescription}
        pathname={`/books/${product.slug}`}
        image={product.coverImage}
        type="product"
      />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Product',
          name: product.title,
          image: `${import.meta.env.VITE_SITE_URL || 'https://quietpsychology.com'}${product.coverImage}`,
          description: product.shortDescription,
          brand: {
            '@type': 'Brand',
            name: 'Quiet Psychology',
          },
          offers: {
            '@type': 'Offer',
            url: `${import.meta.env.VITE_SITE_URL || 'https://quietpsychology.com'}/books/${product.slug}`,
            priceCurrency: 'USD',
            price: (product.price / 100).toFixed(2),
            availability: 'https://schema.org/InStock',
            itemOffered: {
              '@type': 'DigitalDocument',
              name: product.title,
            },
          },
          aggregateRating:
            stats.count > 0
              ? {
                  '@type': 'AggregateRating',
                  ratingValue: stats.average.toFixed(1),
                  reviewCount: stats.count,
                }
              : undefined,
        }}
      />
      <div className="container-site pt-24">
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Archive', href: '/archive' },
            { label: product.title },
          ]}
        />
      </div>

      <section className="relative min-h-screen pt-28 md:pt-32 pb-16 md:pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div
          className="absolute inset-0 bg-cream dark:bg-obsidian transition-colors duration-500"
          style={{ transform: `translateY(${parallaxY}px)` }}
        >
          <div className="absolute inset-0 opacity-40">
            <div className="stars" />
          </div>
        </div>

        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            <ScrollReveal className="lg:col-span-5 relative group mx-auto max-w-[320px] sm:max-w-sm lg:max-w-none" animation="scale">
              <div className="absolute -inset-4 sm:-inset-8 bg-gradient-to-tr from-soft-gold/25 via-transparent to-soft-gold/10 rounded-lg blur-3xl opacity-60 group-hover:opacity-90 transition-opacity duration-700" />
              <div className="absolute inset-x-4 -bottom-6 h-12 bg-soft-gold/40 blur-2xl rounded-full opacity-60 group-hover:opacity-90 transition-opacity" />
              <img
                src={product.coverImage}
                alt={product.title}
                className="relative w-full book-glow transform transition-all duration-700 ease-out group-hover:scale-[1.06] group-hover:-translate-y-3"
              />
              {isNoContact && (
                <div className="absolute -top-3 -right-3 bg-soft-gold text-obsidian px-3 py-1.5 text-xs font-bold tracking-wider shadow-lg">
                  #1 BESTSELLER
                </div>
              )}
            </ScrollReveal>

            <div className="lg:col-span-7 pt-2">
              <ScrollReveal>
                <div className="flex flex-wrap items-center gap-3 mb-5">
                  {product.featured === 1 && <Badge variant="gold">Bestseller</Badge>}
                  <Badge variant="outline">Premium Publication</Badge>
                </div>

                <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-heading mb-3 leading-tight">
                  {product.title}
                </h1>
                <p className="text-xl md:text-2xl text-body mb-5">{product.subtitle}</p>

              </ScrollReveal>

              <ScrollReveal delay={100}>
                <p className="text-body text-lg leading-relaxed mb-6 md:mb-8 max-w-2xl">{product.description}</p>
              </ScrollReveal>

              <ScrollReveal delay={200}>
                <div className="mb-6 md:mb-8 p-5 md:p-6 surface-card inline-block">
                  <PricingDisplay price={product.price} comparePrice={product.comparePrice} size="lg" showDiscount />
                  {discount > 0 && (
                    <p className="text-sm text-soft-gold mt-3">
                      You save {formatPrice(savings)} ({discount}% off) — limited pricing
                    </p>
                  )}

                </div>
              </ScrollReveal>

              <ScrollReveal delay={300}>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8 md:mb-10">
                  <MagneticButton strength={0.2}>
                    <Link to={`/checkout/${product.slug}`}>
                      <Button size="lg" className="w-full sm:w-auto pulse-gold shimmer-border group">
                        <span className="flex items-center">
                          Get Instant Access <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                        </span>
                      </Button>
                    </Link>
                  </MagneticButton>
                  <p className="text-sm text-body">
                    Instant download · Lifetime access · All sales final
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={400}>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4">
                  {INCLUDED_ITEMS.map(({ icon: Icon, title, description }) => (
                    <div key={title} className="surface-glass p-4 text-center">
                      <Icon size={18} className="mx-auto mb-2 text-soft-gold" />
                      <p className="text-xs font-medium text-heading mb-0.5">{title}</p>
                      <p className="text-[10px] text-body leading-tight">{description}</p>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="page-section surface-elevated">
        <div className="container-site">
          <ScrollReveal>
            <SectionHeading eyebrow="What You Get" title="Everything Included" />
          </ScrollReveal>
          <div className="mt-14 md:mt-20 grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {INCLUDED_ITEMS.map(({ icon: Icon, title, description }, i) => (
              <ScrollReveal key={title} delay={i * 100}>
                <div className="bg-charcoal/30 dark:bg-white/[0.03] border border-black/5 dark:border-white/5 p-6 text-center h-full hover:border-soft-gold/20 transition-colors">
                  <div className="w-12 h-12 mx-auto mb-4 bg-soft-gold/10 rounded-full flex items-center justify-center">
                    <Icon size={22} className="text-soft-gold" />
                  </div>
                  <h3 className="font-serif text-lg text-heading mb-2">{title}</h3>
                  <p className="text-body text-sm leading-relaxed">{description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Table of Contents */}
      <section className="page-section">
        <div className="container-narrow">
          <ScrollReveal>
            <SectionHeading eyebrow="Inside the Publication" title="Table of Contents" />
          </ScrollReveal>
          <div className="mt-10 md:mt-14 max-w-2xl mx-auto">
            {toc.map((chapter, i) => (
              <ScrollReveal key={chapter} delay={i * 75}>
                <div className="flex items-center gap-4 py-4 border-b border-black/5 dark:border-white/5 group hover:pl-2 transition-all">
                  <ChevronRight size={16} className="text-soft-gold opacity-0 group-hover:opacity-100 transition-opacity" />
                  <p className="text-heading font-medium">{chapter}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Learning + Who Is It For */}
      <section className="page-section surface-elevated">
        <div className="container-site">
          <div className="grid md:grid-cols-2 gap-10 lg:gap-20">
            <ScrollReveal>
              <div>
                <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl text-heading mb-5 md:mb-6">What You Will Learn</h2>
                <ul className="space-y-4 md:space-y-5">
                  {outcomes.map((outcome) => (
                    <li key={outcome} className="flex items-start gap-4 text-body">
                      <Check size={20} className="text-soft-gold shrink-0 mt-0.5" />
                      {outcome}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={150}>
              <div>
                <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl text-heading mb-5 md:mb-6">Who This Is For</h2>
                <p className="text-body leading-relaxed mb-5 md:mb-6">
                  This publication is for individuals seeking a structured, research-oriented understanding of
                  {product.slug === 'the-no-contact-blueprint' && ' breakups, silence, and emotional recovery.'}
                  {product.slug === 'texting-psychology' && ' communication psychology and attraction signals.'}
                  {product.slug === 'the-attachment-archive' && ' attachment styles and relationship patterns.'}
                  {product.slug === 'the-attraction-code' && ' desire, attraction, and perceived value.'}
                </p>
                <h3 className="font-serif text-xl md:text-2xl text-heading mb-3">Who This Is Not For</h3>
                <ul className="space-y-3">
                  {WHO_NOT_FOR.map((item) => (
                    <li key={item} className="flex items-center gap-3 text-body">
                      <span className="w-1.5 h-1.5 bg-black/30 dark:bg-white/20 rounded-full" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Archive Note */}
      <section className="page-section">
        <div className="container-narrow">
          <ScrollReveal>
            <div className="surface-card p-8 md:p-12 text-center">
              <div className="w-14 h-14 mx-auto mb-5 bg-soft-gold/10 rounded-full flex items-center justify-center">
                <Shield size={26} className="text-soft-gold" />
              </div>
              <h2 className="font-serif text-2xl md:text-3xl text-heading mb-3">A Premium Archive Standard</h2>
              <p className="text-body leading-relaxed max-w-2xl mx-auto mb-6">
                Every publication in the Quiet Psychology archive is built on behavioral science, not opinion.
                No motivational filler. No guru branding. Only clean, research-driven frameworks you can apply immediately.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-body">
                <span className="flex items-center gap-1.5">
                  <BookOpen size={14} className="text-soft-gold" /> 4 publications
                </span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="page-section surface-elevated">
        <div className="container-narrow">
          <ScrollReveal>
            <SectionHeading eyebrow="Questions" title="Frequently Asked" />
          </ScrollReveal>
          <div className="mt-10 md:mt-14">
            <Accordion items={FAQ_ITEMS} />
          </div>
        </div>
      </section>

      {/* Reviews */}
      {reviews.length > 0 && (
        <section className="page-section">
          <div className="container-site">
            <ScrollReveal>
              <SectionHeading eyebrow="Reviews" title="Reader Feedback" />
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
      )}

      {/* Related */}
      {related.length > 0 && (
        <section className="page-section surface-elevated">
          <div className="container-site">
            <ScrollReveal>
              <SectionHeading eyebrow="Related" title="Other Publications" />
            </ScrollReveal>
            <div className="mt-14 md:mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {related.map((p, i) => (
                <ScrollReveal key={p.id} delay={i * 100}>
                  <BookCard product={p} />
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Sticky mobile CTA */}
      <div
        className={`
          fixed bottom-0 left-0 right-0 z-40 p-4 bg-charcoal/95 backdrop-blur-md border-t border-white/10
          transform transition-transform duration-300 md:hidden
          ${showStickyCta ? 'translate-y-0' : 'translate-y-full'}
        `}
      >
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="font-serif text-lg text-muted-white">{formatPrice(product.price)}</p>
            {discount > 0 && (
              <p className="text-xs text-muted-gray line-through">{formatPrice(product.comparePrice)}</p>
            )}
          </div>
          <Link to={`/checkout/${product.slug}`} className="flex-1 max-w-xs">
            <Button size="lg" className="w-full pulse-gold">
              Get Instant Access
            </Button>
          </Link>
        </div>
      </div>

      <style>{`
        @keyframes bubbleMove {
          0% { transform: translateX(110vw); opacity: 0; }
          5% { opacity: 0.5; }
          95% { opacity: 0.5; }
          100% { transform: translateX(-40vw); opacity: 0; }
        }
        .animate-bubble {
          animation-name: bubbleMove;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
      `}</style>
    </>
  );
}
