import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Check, Download, Mail, ArrowRight } from 'lucide-react';
import SEO from '../components/SEO';
import Button from '../components/ui/Button';
import { api } from '../lib/api';
import type { Product } from '../types';

export default function ThankYou() {
  const [searchParams] = useSearchParams();
  const checkoutId = searchParams.get('checkout_id');
  const [product, setProduct] = useState<Product | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function verify() {
      if (!checkoutId) {
        setLoading(false);
        return;
      }
      try {
        const data = await api.checkout.verifyCheckout(checkoutId);
        setProduct(data.product);
        setToken(data.downloadToken);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Verification failed');
      } finally {
        setLoading(false);
      }
    }
    verify();
  }, [checkoutId]);

  return (
    <>
      <SEO title="Thank You | Quiet Psychology" description="Your purchase is complete." />
      <section className="page-section">
        <div className="mx-auto max-w-2xl text-center px-4 sm:px-6">
          {loading ? (
            <p className="text-body">Confirming your purchase...</p>
          ) : error ? (
            <>
              <h1 className="font-serif text-3xl text-heading mb-4">Unable to Confirm</h1>
              <p className="text-body mb-8">{error}</p>
              <Link to="/contact">
                <Button>Contact Support</Button>
              </Link>
            </>
          ) : (
            <>
              <div className="w-16 h-16 mx-auto mb-8 rounded-full bg-soft-gold/10 flex items-center justify-center">
                <Check size={32} className="text-soft-gold" />
              </div>
              <p className="text-xs tracking-[0.2em] uppercase text-soft-gold mb-4 font-medium">Purchase Complete</p>
              <h1 className="font-serif text-4xl md:text-5xl text-heading mb-6">
                Welcome to the Archive
              </h1>
              <p className="text-body text-lg mb-8">
                Your order has been confirmed. You now have access to your premium publication.
              </p>

              {product && (
                <div className="surface-card p-6 md:p-8 mb-8 text-left">
                  <h2 className="font-serif text-2xl text-heading mb-2">{product.title}</h2>
                  <p className="text-body mb-6">{product.subtitle}</p>
                  <Link to={token ? `/download?token=${token}` : '#'}>
                    <Button className="w-full">
                      <Download size={18} className="mr-2" /> Download Now
                    </Button>
                  </Link>
                </div>
              )}

              <div className="flex flex-col items-center gap-3 text-sm text-body">
                <p className="flex items-center gap-2">
                  <Mail size={16} /> A confirmation email has been sent.
                </p>
                <Link to="/" className="text-soft-gold hover:text-soft-gold-light inline-flex items-center gap-2 mt-4">
                  Return to Archive <ArrowRight size={16} />
                </Link>
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}
