import type { MetadataRoute } from 'next';
import { buildDynamicSitemapPaths } from '@/seo/sitemapRoutes.js';
import { SITE_ORIGIN } from '@/seo/siteConfig.js';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const paths = buildDynamicSitemapPaths([]);
  const lastModified = new Date();
  return paths.map((path) => ({
    url: `${SITE_ORIGIN}${path === '/' ? '' : path}`,
    lastModified
  }));
}
