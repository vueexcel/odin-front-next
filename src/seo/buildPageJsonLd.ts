import { SEO_BRAND_NAME, SITE_ORIGIN } from '@/seo/siteConfig.js';
import { resolveRequestMetadata } from '@/seo/metadata';

export type BreadcrumbItem = { name: string; path: string };

export function buildSitewideJsonLd() {
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: SEO_BRAND_NAME,
      url: SITE_ORIGIN
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: SEO_BRAND_NAME,
      url: SITE_ORIGIN
    }
  ];
}

export function buildPageJsonLd(pathname: string, breadcrumbItems: BreadcrumbItem[] = []) {
  const meta = resolveRequestMetadata(pathname);
  const pageUrl = meta.canonical || `${SITE_ORIGIN}${pathname}`;

  const graph: Record<string, unknown>[] = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: meta.title,
      description: meta.description,
      url: pageUrl,
      isPartOf: { '@type': 'WebSite', name: SEO_BRAND_NAME, url: SITE_ORIGIN }
    }
  ];

  if (breadcrumbItems.length) {
    graph.push({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbItems.map((item, idx) => ({
        '@type': 'ListItem',
        position: idx + 1,
        name: item.name,
        item: `${SITE_ORIGIN}${item.path.startsWith('/') ? item.path : `/${item.path}`}`
      }))
    });
  }

  return graph;
}
