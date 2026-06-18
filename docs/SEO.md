# Odin500 frontend SEO

## Stack

- **Next.js 15 App Router** — server `metadata` / `generateMetadata` per route (single source of truth)
- **Open Graph + Twitter** — default share image on all pages via `src/seo/ogImages.ts`
- **Server-side data prefetch** — `src/ssr/fetchPageData.ts` in analytics `page.tsx`
- **JSON-LD** — `Organization`, `WebSite`, `WebPage`, `BreadcrumbList`, `FinancialProduct` (ticker pages)
- **Crawler text** — `src/seo/SeoCrawlerSummary.tsx` (`sr-only`, invisible to users)
- **Noscript tables** — `src/seo/SeoServerContent.tsx` for no-JS bots
- **Canonical origin:** `https://www.odin500.com`
- **Sitemap / robots:** `src/app/sitemap.ts` (chunked, up to 40k URLs/file), `src/app/robots.ts`

`usePageSeo` is deprecated and a no-op — do not use it for new pages.

## Regenerate route shells

```bash
npm run gen:routes
```

## Build

```bash
npm run build
```

Pages use `export const revalidate = 300` (5-minute ISR).

## Sitemap tickers

Set `API_ORIGIN` in production. Optional: `SITEMAP_TICKERS`, `SITEMAP_USE_API=false`.

Each ticker adds 9 URLs. Large symbol universes are split across multiple sitemap files automatically.

## Auth and indexing

- `/login`, `/signup`, `/accounts`, `/paper-trading`, `/about` → `noindex` + robots disallow
- `/` redirects to `/market` (canonical points to `/market`)
- Market/ticker routes are public in middleware

Default OG image: `/og-default.png` (1200×630, generated from `odin500-logo.svg`). Regenerate:

```bash
npm run gen:og-image
```
