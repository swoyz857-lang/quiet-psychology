import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  pathname?: string;
  image?: string;
  type?: string;
  keywords?: string;
  noindex?: boolean;
}

export default function SEO({
  title = 'Quiet Psychology | Premium Behavioral Intelligence Publishing',
  description = 'A private archive of psychological frameworks. Premium digital publications on breakups, attachment, texting, and attraction.',
  pathname = '',
  image = '/logo.png',
  type = 'website',
  keywords = 'behavioral intelligence, psychology ebooks, relationship psychology, attachment theory, no contact rule, texting psychology, attraction psychology',
  noindex = false,
}: SEOProps) {
  const siteUrl = import.meta.env.VITE_SITE_URL || 'https://quietpsychology.com';
  const url = `${siteUrl}${pathname}`;
  const ogImage = image.startsWith('http') ? image : `${siteUrl}${image}`;

  return (
    <Helmet>
      <html lang="en" />
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="robots" content={noindex ? 'noindex, nofollow' : 'index, follow'} />
      <link rel="canonical" href={url} />
      <link rel="alternate" hrefLang="x-default" href={url} />
      <link rel="alternate" hrefLang="en" href={url} />

      <meta property="og:locale" content="en_US" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:alt" content={title} />
      <meta property="og:site_name" content="Quiet Psychology" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:image:alt" content={title} />
    </Helmet>
  );
}
