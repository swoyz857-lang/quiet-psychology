import { useEffect } from 'react';
import SEO from '../components/SEO';
import SectionHeading from '../components/SectionHeading';
import BookCard from '../components/BookCard';
import ScrollReveal from '../components/ScrollReveal';
import { useProducts } from '../hooks/useProducts';
import { trackPageView } from '../hooks/useAnalytics';

export default function Archive() {
  const { products, loading } = useProducts();

  useEffect(() => {
    trackPageView('/archive');
  }, []);

  return (
    <>
      <SEO title="Archive | Quiet Psychology" description="Browse the complete Quiet Psychology archive of behavioral intelligence publications." pathname="/archive" />
      <section className="page-section min-h-screen pt-32">
        <div className="container-site">
          <ScrollReveal>
            <SectionHeading
              eyebrow="The Archive"
              title="Complete Publication Library"
              description="Every volume in the Quiet Psychology collection. Research-driven, premium, and designed to be revisited."
            />
          </ScrollReveal>

          {loading ? (
            <p className="text-center text-body mt-14 md:mt-20">Loading publications...</p>
          ) : (
            <div className="mt-14 md:mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {products.map((product, i) => (
                <ScrollReveal key={product.id} delay={Math.min(i * 100, 700)}>
                  <BookCard product={product} featured={product.featured === 1} />
                </ScrollReveal>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
