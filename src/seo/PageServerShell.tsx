import type { ReactNode } from 'react';
import { PageJsonLd } from './JsonLd';
import { SeoCrawlerSummary } from './SeoCrawlerSummary';
import { SeoServerContent } from './SeoServerContent';
import type { BreadcrumbItem } from './buildPageJsonLd';

type PageServerShellProps = {
  pathname: string;
  seoData?: unknown;
  breadcrumbItems?: BreadcrumbItem[];
  children: ReactNode;
};

/**
 * Server wrapper: JSON-LD, sr-only crawler summary, noscript tables, then the client view.
 * All SEO metadata lives in `<head>` via generateMetadata (single source of truth).
 */
export function PageServerShell({
  pathname,
  seoData = null,
  breadcrumbItems = [],
  children
}: PageServerShellProps) {
  return (
    <>
      <PageJsonLd pathname={pathname} breadcrumbItems={breadcrumbItems} seoData={seoData} />
      <SeoCrawlerSummary pathname={pathname} data={seoData} />
      <SeoServerContent pathname={pathname} data={seoData} />
      {children}
    </>
  );
}
