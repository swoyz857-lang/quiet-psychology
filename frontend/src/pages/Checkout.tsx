import { useEffect, useState } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { Loader2, Shield, Check, Lock, Download, Eye, Zap, ArrowRight, Flame, CreditCard, User, Mail } from 'lucide-react';
import { useProduct } from '../hooks/useProducts';
import { useParallax } from '../hooks/useParallax';
import SEO from '../components/SEO';
import ScrollReveal from '../components/ScrollReveal';
import MagneticButton from '../components/MagneticButton';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import StarRating from '../components/ui/StarRating';
import { api } from '../lib/api';
import { formatPrice } from '../lib/utils';
import { TRUST_METRICS } from '../lib/constants';

const TRUST_BADGES = [
  { icon: Lock, text: 'SSL Secure' },
  { icon: Shield, text: 'All Sales Final' },
  { icon: Download, text: 'Instant Delivery' },
  { icon: Eye, text: 'Lifetime Access' },
];

export default function Checkout() {
  const { slug } = useParams<{ slug: string }>();
  const { product, loading } = useProduct(slug || '');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const parallaxY = useParallax(0.15);

  useEffect(() => {
    if (product) {
      document.title = `Checkout · ${product.title}`;
    }
  }, [product]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!product) return;
    setSubmitting(true);
    setError(null);
    try {
      const { url } = await api.checkout.createSession(product.slug, email, name);
      window.location.href = url;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Checkout failed. Please try again.');
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-32 pb-20 px-6 text-center bg-cream dark:bg-obsidian">
        <div className="inline-flex items-center gap-2 text-body">
          <Loader2 size={18} className="animate-spin" /> Loading checkout...
        </div>
      </div>
    );
  }

  if (!product) return <Navigate to="/" />;

  const savings = product.comparePrice - product.price;
  const discount = product.comparePrice > 0 ? Math.round((savings / product.comparePrice) * 100) : 0;

  return (
    <>
      <SEO title={`Checkout · ${product.title}`} description={`Complete your purchase of ${product.title}.`} />
      <section className="relative min-h-screen pt-24 md:pt-32 pb-12 md:pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-cream dark:bg-obsidian">
        <div
          className="absolute inset-0 transition-transform duration-100 ease-out"
          style={{ transform: `translateY(${parallaxY}px)` }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(201,169,98,0.1),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(201,169,98,0.06),transparent_50%)]" />
        </div>

        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="text-center mb-8 md:mb-12">
            <ScrollReveal>
              <Link to={`/books/${product.slug}`} className="text-xs text-body hover:text-soft-gold transition-colors mb-3 inline-block">
                ← Back to publication
              </Link>
              <p className="text-xs tracking-[0.2em] uppercase text-soft-gold mb-3 font-medium">Secure Checkout</p>
              <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl text-heading mb-4">
                Complete Your Purchase
              </h1>
              <div className="flex items-center justify-center gap-3 md:gap-4 text-sm text-body">
                <span className="flex items-center gap-1">
                  <StarRating rating={TRUST_METRICS.rating} size={14} /> {TRUST_METRICS.rating.toFixed(1)}
                </span>
                <span className="text-body/40">|</span>
                <span>{TRUST_METRICS.reviews} verified reviews</span>
                <span className="hidden sm:inline text-body/40">|</span>
                <span className="hidden sm:inline">{TRUST_METRICS.purchases.toLocaleString('en-US')} purchases</span>
              </div>
            </ScrollReveal>
          </div>

          {/* Steps */}
          <div className="max-w-2xl mx-auto mb-8 md:mb-12">
            <div className="flex items-center justify-center gap-2 text-xs md:text-sm">
              <div className="flex items-center gap-2 text-soft-gold">
                <span className="w-7 h-7 rounded-full bg-soft-gold text-obsidian flex items-center justify-center font-medium">1</span>
                <span className="font-medium">Your Details</span>
              </div>
              <span className="w-8 md:w-12 h-px bg-soft-gold/30" />
              <div className="flex items-center gap-2 text-body/60">
                <span className="w-7 h-7 rounded-full border border-white/10 flex items-center justify-center">2</span>
                <span>Payment</span>
              </div>
              <span className="w-8 md:w-12 h-px bg-white/10" />
              <div className="flex items-center gap-2 text-body/60">
                <span className="w-7 h-7 rounded-full border border-white/10 flex items-center justify-center">3</span>
                <span>Access</span>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-12 gap-6 lg:gap-10">
            {/* Order Summary */}
            <div className="lg:col-span-5 order-1 lg:order-2">
              <ScrollReveal animation="scale">
                <div className="lg:sticky lg:top-28 bg-charcoal/60 backdrop-blur-sm border border-white/10 p-6 md:p-8 shadow-2xl">
                  <p className="text-xs tracking-[0.2em] uppercase text-muted-gray mb-4">Order Summary</p>

                  <div className="flex gap-5 mb-6">
                    <div className="relative w-24 sm:w-28 shrink-0">
                      <img
                        src={product.coverImage}
                        alt={product.title}
                        className="w-full rounded-sm shadow-book"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h2 className="font-serif text-xl md:text-2xl text-muted-white leading-tight mb-1">{product.title}</h2>
                      <p className="text-muted-gray text-sm mb-3">{product.subtitle}</p>
                      <div className="flex flex-wrap items-center gap-2 text-xs text-muted-gray">
                        <span className="flex items-center gap-1"><Check size={12} className="text-soft-gold" /> PDF</span>
                        <span className="flex items-center gap-1"><Check size={12} className="text-soft-gold" /> EPUB</span>
                      </div>
                    </div>
                  </div>

                  {discount > 0 && (
                    <div className="mb-6 px-3 py-2.5 bg-soft-gold/10 border border-soft-gold/20 text-soft-gold text-sm text-center">
                      You save {formatPrice(savings)} ({discount}% off) — limited pricing
                    </div>
                  )}

                  {product.stock > 0 && (
                    <div className="mb-6 flex items-center justify-center gap-2 text-sm text-soft-gold/90">
                      <Flame size={14} className="text-soft-gold" />
                      Only {product.stock.toLocaleString('en-US')} copies remaining
                    </div>
                  )}

                  <div className="space-y-3 text-sm text-muted-gray border-t border-white/10 pt-5 mb-6">
                    <div className="flex justify-between">
                      <span>Original price</span>
                      <span className="line-through">{formatPrice(product.comparePrice)}</span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between">
                        <span>Discount</span>
                        <span className="text-soft-gold">-{formatPrice(savings)}</span>
                      </div>
                    )}
                    <div className="flex justify-between items-end pt-3 border-t border-white/10">
                      <span className="text-muted-white font-medium">Total</span>
                      <span className="font-serif text-3xl md:text-4xl text-soft-gold">{formatPrice(product.price)}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs text-muted-gray">
                    {TRUST_BADGES.map(({ icon: Icon, text }) => (
                      <div key={text} className="flex items-center gap-2 bg-white/5 p-3">
                        <Icon size={14} className="text-soft-gold" /> {text}
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* Form */}
            <div className="lg:col-span-7 order-2 lg:order-1">
              <ScrollReveal delay={100}>
                <div className="bg-charcoal/60 backdrop-blur-sm border border-white/10 p-6 md:p-8 lg:p-10 shadow-2xl">
                  <h2 className="font-serif text-xl md:text-2xl text-muted-white mb-2">Your Details</h2>
                  <p className="text-muted-gray text-sm mb-6 md:mb-8">Enter your details to receive instant access after purchase.</p>

                  <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6">
                    <div className="grid sm:grid-cols-2 gap-5 md:gap-6">
                      <div className="relative">
                        <User size={16} className="absolute left-4 top-[42px] text-muted-gray pointer-events-none" />
                        <Input
                          label="Full Name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                          placeholder="Your name"
                          className="pl-11"
                        />
                      </div>
                      <div className="relative">
                        <Mail size={16} className="absolute left-4 top-[42px] text-muted-gray pointer-events-none" />
                        <Input
                          label="Email Address"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          placeholder="you@example.com"
                          className="pl-11"
                        />
                      </div>
                    </div>

                    {error && (
                      <div className="bg-red-500/10 border border-red-500/20 p-3">
                        <p className="text-sm text-red-400">{error}</p>
                      </div>
                    )}

                    <div className="bg-white/5 border border-white/10 p-4">
                      <div className="flex items-center gap-3 mb-2">
                        <CreditCard size={18} className="text-soft-gold" />
                        <p className="text-sm text-muted-white font-medium">Secure payment via LemonSqueezy</p>
                      </div>
                      <p className="text-xs text-muted-gray pl-8">
                        You will be redirected to our secure payment provider to complete the purchase.
                      </p>
                    </div>

                    <MagneticButton strength={0.15} className="w-full">
                      <Button type="submit" size="lg" className="w-full h-14 text-lg pulse-gold shimmer-border group">
                        {submitting ? (
                          <>
                            <Loader2 size={20} className="mr-2 animate-spin" /> Processing...
                          </>
                        ) : (
                          <>
                            Pay {formatPrice(product.price)} <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                          </>
                        )}
                      </Button>
                    </MagneticButton>
                  </form>

                  <div className="mt-5 flex items-center justify-center gap-2 text-xs text-muted-gray">
                    <Lock size={14} /> Your information is encrypted and never shared.
                  </div>

                  <div className="mt-8 pt-6 border-t border-white/10">
                    <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 text-xs text-muted-gray">
                      <span className="flex items-center gap-1.5"><Zap size={14} className="text-soft-gold" /> Instant download</span>
                      <span className="flex items-center gap-1.5"><Shield size={14} className="text-soft-gold" /> All sales final</span>
                      <span className="flex items-center gap-1.5"><Lock size={14} className="text-soft-gold" /> SSL secure</span>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
