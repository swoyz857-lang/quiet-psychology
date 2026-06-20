import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import SectionHeading from '../components/SectionHeading';
import ScrollReveal from '../components/ScrollReveal';
import { trackPageView } from '../hooks/useAnalytics';
import { BLOG_POSTS } from '../lib/blog';
import { formatDate } from '../lib/utils';

export default function Blog() {
  useEffect(() => {
    trackPageView('/blog');
  }, []);

  return (
    <>
      <SEO
        title="Blog | Quiet Psychology"
        description="Research-driven articles on breakup psychology, texting behavior, attachment theory, and attraction dynamics."
        pathname="/blog"
      />
      <section className="page-section overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(201,169,98,0.08),transparent_60%)]" />
        <div className="relative z-10 container-site">
          <SectionHeading
            eyebrow="Research"
            title="Behavioral Intelligence Archive"
            description="Deep, framework-driven articles on the psychology of breakups, attachment, communication, and attraction."
          />

          <div className="mt-14 md:mt-20 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {BLOG_POSTS.map((post, index) => (
              <ScrollReveal key={post.slug} delay={index * 100}>
                <article className="group surface-elevated overflow-hidden h-full flex flex-col">
                  <div className="aspect-[16/9] overflow-hidden bg-charcoal">
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-6 md:p-8 flex-1 flex flex-col">
                    <div className="flex items-center gap-3 text-xs text-body mb-3">
                      <span>{formatDate(post.date)}</span>
                      <span className="text-body/40">·</span>
                      <span>{post.readTime}</span>
                    </div>
                    <h2 className="font-serif text-xl md:text-2xl text-heading mb-3 group-hover:text-soft-gold transition-colors">
                      <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                    </h2>
                    <p className="text-body text-sm leading-relaxed flex-1">{post.excerpt}</p>
                    <Link
                      to={`/blog/${post.slug}`}
                      className="mt-4 inline-flex items-center text-sm text-soft-gold hover:text-soft-gold-light transition-colors"
                    >
                      Read article
                    </Link>
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
