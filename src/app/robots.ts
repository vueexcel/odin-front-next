import type { MetadataRoute } from 'next';
import { SITE_ORIGIN } from '@/seo/siteConfig.js';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/login', '/signup', '/auth/', '/accounts']
    },
    sitemap: `${SITE_ORIGIN}/sitemap.xml`
  };
}
