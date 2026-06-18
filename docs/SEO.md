# Odin500 frontend SEO

## Stack

- **Next.js 15 App Router** with server `metadata` / `generateMetadata` per route
- **Server-side data prefetch** via `src/ssr/fetchPageData.ts` wired in each analytics `page.tsx`
- **Crawler-only body HTML** via `src/seo/SeoServerContent.tsx` (inside `<noscript>` — not shown when JS runs)
- **JSON-LD** via `src/seo/JsonLd.tsx` (Organization, WebSite, WebPage, BreadcrumbList)
- **Canonical origin:** `https://www.odin500.com` (`src/seo/siteConfig.js`)
- **Sitemap / robots:** `src/app/sitemap.ts`, `src/app/robots.ts` (do not add static `public/sitemap.xml`)

## Regenerate route shells

After adding routes, run:

```bash
npm run gen:routes
```

This regenerates `page.tsx` files with SSR prefetch + `PageServerShell`.

## Build

```bash
npm run build
```

Pages use `export const revalidate = 300` (5-minute ISR). `<head>` metadata and JSON-LD are in every response; summary tables are in `<noscript>` only.

## Sitemap tickers

**You do not need to list every symbol manually** unless you want a custom subset.

| Variable | What it does |
|----------|----------------|
| *(none)* | Fetches **all tickers** from `GET /api/tickers/groups` + `/api/tickers/group/:code` using `API_ORIGIN` |
| `SITEMAP_USE_API=false` | Skip API; use `SITEMAP_FALLBACK_TICKERS` (~30 symbols) only |
| `SITEMAP_TICKERS=AAPL,MSFT,...` | **Override** — only these symbols (comma-separated, no spaces required) |

Required for full sitemap in production:

```env
API_ORIGIN=https://your-backend.up.railway.app
```

The backend must allow unauthenticated ticker list reads (your project uses `AUTH_DISABLED=true` for this in dev). If API fetch fails, the sitemap falls back to `SITEMAP_FALLBACK_TICKERS`.

Each ticker adds **9 URLs**: `/ticker`, `/historical-data`, `/ticker-report`, `/relative-performance/ticker`, and 5 `/statistic/ticker-*` pages. With thousands of symbols, `sitemap.xml` can be large (Google allows up to 50,000 URLs per file).

## Auth and indexing

- `/login`, `/signup`, `/accounts`, `/paper-trading` → `noindex` + robots disallow
- Market/ticker routes are public in middleware (crawlers do not need cookies)
- For local crawler testing, `AUTH_DISABLED=true` avoids login redirects

## SSR vs interactive charts

- **Tables and return summaries** are server-rendered in HTML for crawlers
- **Canvas charts** (Lightweight Charts, Chart.js) still hydrate client-side; underlying OHLC/returns data is duplicated in server HTML tables where available
