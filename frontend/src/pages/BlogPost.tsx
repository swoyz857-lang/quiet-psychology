import { useEffect, useMemo } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import SEO from '../components/SEO';
import ScrollReveal from '../components/ScrollReveal';
import Button from '../components/ui/Button';
import Breadcrumb from '../components/Breadcrumb';
import JsonLd from '../components/JsonLd';
import { trackPageView } from '../hooks/useAnalytics';
import { getBlogPost } from '../lib/blog';
import { formatDate } from '../lib/utils';

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = useMemo(() => getBlogPost(slug || ''), [slug]);

  useEffect(() => {
    if (post) {
      trackPageView(`/blog/${post.slug}`);
    }
  }, [post]);

  if (!post) {
    return <Navigate to="/blog" />;
  }

  const siteUrl = import.meta.env.VITE_SITE_URL || 'https://quietpsychology.com';
  const articleUrl = `${siteUrl}/blog/${post.slug}`;

  return (
    <>
      <SEO
        title={post.metaTitle}
        description={post.metaDescription}
        pathname={`/blog/${post.slug}`}
        image={post.coverImage}
        keywords={post.keywords}
        type="article"
      />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: post.title,
          description: post.metaDescription,
          image: `${siteUrl}${post.coverImage}`,
          url: articleUrl,
          datePublished: post.date,
          author: {
            '@type': 'Organization',
            name: 'Quiet Psychology',
            url: siteUrl,
          },
          publisher: {
            '@type': 'Organization',
            name: 'Quiet Psychology',
            logo: {
              '@type': 'ImageObject',
              url: `${siteUrl}/logo.png`,
            },
          },
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': articleUrl,
          },
        }}
      />

      <article className="page-section overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(201,169,98,0.08),transparent_50%)]" />
        <div className="relative z-10 container-narrow">
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'Blog', href: '/blog' },
              { label: post.title },
            ]}
          />

          <ScrollReveal>
            <header className="mt-8 mb-10 md:mb-14">
              <div className="flex items-center gap-3 text-xs text-body mb-4">
                <span>{formatDate(post.date)}</span>
                <span className="text-body/40">·</span>
                <span>{post.readTime}</span>
              </div>
              <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl text-heading leading-tight mb-6">
                {post.title}
              </h1>
              <p className="text-body text-lg md:text-xl leading-relaxed">{post.excerpt}</p>
            </header>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <div className="aspect-[16/9] overflow-hidden rounded-sm mb-10 md:mb-14">
              <img
                src={post.coverImage}
                alt={post.title}
                className="w-full h-full object-cover"
                loading="eager"
              />
            </div>
          </ScrollReveal>

          <ScrollReveal delay={150}>
            <div className="surface-card p-6 md:p-10 lg:p-12 space-y-6">
              {post.content.map((paragraph, index) => (
                <p key={index} className="text-body leading-relaxed text-lg">
                  {paragraph}
                </p>
              ))}
            </div>
          </ScrollReveal>

          {post.productSlug && (
            <ScrollReveal delay={200}>
              <div className="mt-10 md:mt-14 surface-elevated p-6 md:p-8 text-center">
                <p className="text-xs tracking-widest uppercase text-soft-gold mb-3">Related Publication</p>
                <h2 className="font-serif text-2xl text-heading mb-4">
                  Want the full framework?
                </h2>
                <p className="text-body mb-6 max-w-xl mx-auto">
                  This article is a starting point. The complete research-driven publication goes deeper into the psychology, timelines, and behavioral signals.
                </p>
                <Link to={`/books/${post.productSlug}`}>
                  <Button>View Publication</Button>
                </Link>
              </div>
            </ScrollReveal>
          )}
        </div>
      </article>
    </>
  );
}
