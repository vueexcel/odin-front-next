import type { Metadata } from 'next';
import { Suspense } from 'react';
import { Providers } from './providers';
import './globals.css';
import { DEFAULT_SITE_DESCRIPTION, DEFAULT_SITE_TITLE } from '@/seo/siteConfig.js';
import { JsonLdSitewide } from '@/seo/JsonLd';

export const revalidate = 300;

export const metadata: Metadata = {
  title: DEFAULT_SITE_TITLE,
  description: DEFAULT_SITE_DESCRIPTION,
  metadataBase: new URL('https://www.odin500.com')
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.png" />
      </head>
      <body suppressHydrationWarning>
        <JsonLdSitewide />
        <Suspense fallback={null}>
          <Providers>{children}</Providers>
        </Suspense>
      </body>
    </html>
  );
}
