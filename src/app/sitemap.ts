import type { MetadataRoute } from 'next';
import { buildDynamicSitemapPaths } from '@/seo/sitemapRoutes.js';
import { SITE_ORIGIN } from '@/seo/siteConfig.js';
import { resolveSitemapTickers } from '@/seo/fetchSitemapTickers';

/** Stay under Google's 50,000 URL limit per sitemap file. */
const URLS_PER_SITEMAP = 40_000;

export async function generateSitemaps() {
  const tickers = await resolveSitemapTickers();
  const paths = buildDynamicSitemapPaths(tickers);
  const count = Math.max(1, Math.ceil(paths.length / URLS_PER_SITEMAP));
  return Array.from({ length: count }, (_, id) => ({ id }));
}

function pathToEntry(path: string, lastModified: Date): MetadataRoute.Sitemap[number] {
  return {
    url: `${SITE_ORIGIN}${path === '/' ? '' : path}`,
    lastModified,
    changeFrequency:
      path.includes('/ticker/') || path.includes('/historical-data/') ? 'daily' : 'weekly',
    priority: path === '/market' ? 1 : path.includes('/ticker/') ? 0.8 : 0.6
  };
}

export default async function sitemap({
  id
}: {
  id: number;
}): Promise<MetadataRoute.Sitemap> {
  const tickers = await resolveSitemapTickers();
  const paths = buildDynamicSitemapPaths(tickers);
  const start = id * URLS_PER_SITEMAP;
  const slice = paths.slice(start, start + URLS_PER_SITEMAP);
  const lastModified = new Date();
  return slice.map((path) => pathToEntry(path, lastModified));
}
