import type { ReactNode } from 'react';
import { PageJsonLd } from './JsonLd';
import { SeoServerContent } from './SeoServerContent';
import type { BreadcrumbItem } from './buildPageJsonLd';

type PageServerShellProps = {
  pathname: string;
  seoData?: unknown;
  breadcrumbItems?: BreadcrumbItem[];
  children: ReactNode;
};

/**
 * Server wrapper: JSON-LD + noscript crawler HTML, then the interactive client view.
 * Users only see `children`; metadata is in `<head>` via generateMetadata.
 */
export function PageServerShell({
  pathname,
  seoData = null,
  breadcrumbItems = [],
  children
}: PageServerShellProps) {
  return (
    <>
      <PageJsonLd pathname={pathname} breadcrumbItems={breadcrumbItems} />
      <SeoServerContent pathname={pathname} data={seoData} />
      {children}
    </>
  );
}
