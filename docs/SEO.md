# Odin500 frontend SEO

## Stack

- **Next.js 15 App Router** with `generateMetadata` per route
- **Canonical origin:** `https://www.odin500.com` (`src/seo/siteConfig.js`)
- **Metadata helper:** `src/seo/metadata.ts` (consolidates former `routeMetadata.mjs` + `pageSeoCatalog.js`)
- **Sitemap / robots:** `src/app/sitemap.ts`, `src/app/robots.ts`

## Build

```bash
npm run build
```

Metadata is emitted at request time for dynamic routes and baked at build for static metadata exports.

## Auth and indexing

When **`AUTH_DISABLED=true`** and **`NEXT_PUBLIC_AUTH_DISABLED=true`**:

- Middleware does not redirect to `/login`
- `canFetchProtectedApi()` is true without a session

Set both in `.env` for crawler-friendly local builds.

## SSR data prefetch

`/historical-data/[symbol]` prefetches OHLC preview on the server (`src/ssr/fetchHistoricalDataPreview.js`) and passes `initialPreview` to the client view.

## Sitemap tickers

`app/sitemap.ts` uses `buildDynamicSitemapPaths()` from `src/seo/sitemapRoutes.js`. Override tickers at build time with `SITEMAP_TICKERS=AAPL,MSFT,...` if the API is unreachable.
