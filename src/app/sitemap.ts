import type { MetadataRoute } from 'next';
import { buildDynamicSitemapPaths } from '@/seo/sitemapRoutes.js';
import { SITE_ORIGIN } from '@/seo/siteConfig.js';
import { resolveSitemapTickers } from '@/seo/fetchSitemapTickers';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const tickers = await resolveSitemapTickers();
  const paths = buildDynamicSitemapPaths(tickers);
  const lastModified = new Date();
  return paths.map((path) => ({
    url: `${SITE_ORIGIN}${path === '/' ? '' : path}`,
    lastModified,
    changeFrequency: path.includes('/ticker/') || path.includes('/historical-data/') ? 'daily' : 'weekly',
    priority: path === '/' || path === '/market' ? 1 : path.includes('/ticker/') ? 0.8 : 0.6
  }));
}
