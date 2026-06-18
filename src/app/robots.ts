import type { MetadataRoute } from 'next';
import { SITE_ORIGIN } from '@/seo/siteConfig.js';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/login', '/signup', '/forgot-password', '/auth/', '/accounts', '/paper-trading']
    },
    sitemap: `${SITE_ORIGIN}/sitemap.xml`
  };
}
