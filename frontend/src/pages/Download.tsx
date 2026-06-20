import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { FileText, BookOpen, AlertCircle } from 'lucide-react';
import SEO from '../components/SEO';
import Button from '../components/ui/Button';
import { api } from '../lib/api';
import type { Product } from '../types';

export default function Download() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) {
      setLoading(false);
      setError('No download token provided.');
      return;
    }
    api.checkout
      .verify(token)
      .then((data) => setProduct(data.product))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [token]);

  return (
    <>
      <SEO title="Download | Quiet Psychology" description="Access your premium publication." />
      <section className="page-section">
        <div className="mx-auto max-w-2xl px-4 sm:px-6">
          {loading ? (
            <p className="text-center text-body">Verifying access...</p>
          ) : error ? (
            <div className="text-center">
              <AlertCircle size={48} className="mx-auto text-red-500 dark:text-red-400 mb-4" />
              <h1 className="font-serif text-3xl text-heading mb-4">Access Denied</h1>
              <p className="text-body mb-8">{error}</p>
              <Link to="/contact">
                <Button>Contact Support</Button>
              </Link>
            </div>
          ) : product ? (
            <div className="surface-card p-8 md:p-12">
              <p className="text-xs tracking-[0.2em] uppercase text-soft-gold mb-4 text-center font-medium">
                Secure Download
              </p>
              <h1 className="font-serif text-3xl md:text-4xl text-heading mb-2 text-center">
                {product.title}
              </h1>
              <p className="text-body text-center mb-10">Choose your preferred format below.</p>

              <div className="grid sm:grid-cols-2 gap-4">
                <a href={`${product.pdfUrl}?token=${token}`} download>
                  <Button variant="secondary" className="w-full">
                    <FileText size={18} className="mr-2" /> Download PDF
                  </Button>
                </a>
                <a href={`${product.epubUrl}?token=${token}`} download>
                  <Button variant="secondary" className="w-full">
                    <BookOpen size={18} className="mr-2" /> Download EPUB
                  </Button>
                </a>
              </div>

              <p className="mt-8 text-center text-sm text-body">
                Having trouble? Contact{' '}
                <a href="mailto:hello@quietpsychology.com" className="text-soft-gold hover:underline">
                  hello@quietpsychology.com
                </a>
              </p>
            </div>
          ) : null}
        </div>
      </section>
    </>
  );
}
