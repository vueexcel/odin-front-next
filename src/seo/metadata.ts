import type { Metadata } from 'next';
import {
  DEFAULT_SITE_DESCRIPTION,
  DEFAULT_SITE_TITLE,
  SITE_ORIGIN
} from '@/seo/siteConfig.js';
import { absoluteSiteUrl } from '@/seo/sitemapRoutes.js';

export const ROUTE_METADATA: Record<
  string,
  { title: string; description: string; canonical?: string; noindex?: boolean }
> = {
  '/': {
    title: DEFAULT_SITE_TITLE,
    description: DEFAULT_SITE_DESCRIPTION,
    canonical: `${SITE_ORIGIN}/`
  },
  '/market': {
    title: 'Odin500 - Stock Market Dashboard, Heatmap & Trading Signals ',
    description:
      'Live U.S. stock market dashboard with sector heatmap, index snapshots, OHLC analytics, and trading signals for active traders.',
    canonical: `${SITE_ORIGIN}/market`
  },
  '/odin-signals': {
    title: 'Odin500 | Stock Signal Screener Treemap | Trading Signals ',
    description:
      'Explore stock trading signals with an interactive treemap and filters to find bullish and bearish setups across U.S. equities.',
    canonical: `${SITE_ORIGIN}/odin-signals`
  },
  '/news': {
    title: 'Odin500 | Stock Market News by Ticker  ',
    description:
      'Read market news and ticker-specific headlines for U.S. stocks and ETFs with quick symbol-level context for traders.',
    canonical: `${SITE_ORIGIN}/news`
  },
  '/heatmap': {
    title: 'Odin500 | Stock Heatmap | Sector & Industry Performance ',
    description:
      'Interactive stock heatmap of U.S. equities by sector and industry with price change, market cap weighting, and drill-down ticker lists.',
    canonical: `${SITE_ORIGIN}/heatmap`
  },
  '/market-movers': {
    title: 'Odin500 | Top Gainers and Losers Today | Market Movers ',
    description:
      'Track top gaining and losing stocks today with sortable market-movers tables and performance charts for U.S. equities.',
    canonical: `${SITE_ORIGIN}/market-movers`
  },
  '/statistic-data': {
    title: 'Odin500 | Stock Statistics Tables | Returns & OHLC Analytics ',
    description:
      'Download stock statistics and returns across daily, weekly, monthly, quarterly, and annual horizons with OHLC-based analytics.',
    canonical: `${SITE_ORIGIN}/statistic-data`
  },
  '/return-table': {
    title: 'Odin500 | Market Returns Table | Index & Sector Performance ',
    description:
      'Compare index and sector returns across multiple time horizons with sortable performance tables for U.S. equities.',
    canonical: `${SITE_ORIGIN}/return-table`
  },
  '/stock-splits': {
    title: 'Odin500 | Stock Split Calendar & History ',
    description:
      'Browse upcoming and historical stock splits for U.S. equities with split ratios, dates, and ticker context.',
    canonical: `${SITE_ORIGIN}/stock-splits`
  },
  '/about': {
    title: 'Your Odin500 Profile & Account Settings',
    description:
      'Manage your Odin500 account profile, subscription plan, email preferences, and security settings from your personal dashboard.',
    canonical: `${SITE_ORIGIN}/about`
  },
  '/premium': {
    title: 'Odin500 Premium Plans | Odin500',
    description:
      'Compare Odin500 Basic, Premium, and Pro plans for index signals, ETF coverage, and full Odin trading-signal access across the platform.',
    canonical: `${SITE_ORIGIN}/premium`
  },
  '/accounts': {
    title: 'Account Management | Odin500',
    description:
      'View and manage your Odin500 account details, billing preferences, and linked authentication settings in one secure place.',
    canonical: `${SITE_ORIGIN}/accounts`
  },
  '/paper-trading': {
    title: 'Odin500 Paper Trading | Simulated Portfolio ',
    description:
      'Practice trading with paper portfolios, automated strategies, and performance analytics without risking real capital.',
    canonical: `${SITE_ORIGIN}/paper-trading`
  },
  '/login': {
    title: 'Sign In | Odin500',
    description: 'Sign in to your Odin500 account to access market signals, charts, watchlists, and quant analytics.',
    canonical: `${SITE_ORIGIN}/login`,
    noindex: true
  },
  '/signup': {
    title: 'Create Account | Odin500',
    description: 'Create a free Odin500 account to explore U.S. equity signals, market heatmaps, and ticker analytics.',
    canonical: `${SITE_ORIGIN}/signup`,
    noindex: true
  }
};

const INDEX_SLUG_LABELS: Record<string, string> = {
  sp500: 'S&P 500',
  'dow-jones': 'Dow Jones',
  'nasdaq-100': 'Nasdaq 100'
};

const SECTOR_SLUG_LABELS: Record<string, string> = {
  xlb: 'Materials',
  xlk: 'Technology',
  xlf: 'Financials',
  xlv: 'Healthcare',
  xli: 'Industrials',
  xle: 'Energy',
  xly: 'Consumer Discretionary',
  xlp: 'Consumer Staples',
  xlu: 'Utilities',
  xlre: 'Real Estate',
  xlc: 'Communication Services'
};

const STAT_KIND_LABELS: Record<string, string> = {
  'ticker-annual': 'Annual',
  'ticker-quarterly': 'Quarterly',
  'ticker-monthly': 'Monthly',
  'ticker-weekly': 'Weekly',
  'ticker-daily': 'Daily'
};

export function normalizePathname(pathname: string) {
  let path = String(pathname || '/').split('?')[0].split('#')[0] || '/';
  if (path.length > 1 && path.endsWith('/')) path = path.slice(0, -1);
  return path || '/';
}

export function resolveDynamicRouteMetadata(pathname: string) {
  const path = normalizePathname(pathname);

  const historicalDataMatch = path.match(/^\/historical-data\/([A-Za-z0-9.]+)$/i);
  if (historicalDataMatch) {
    const symbol = decodeURIComponent(historicalDataMatch[1]).toUpperCase();
    return {
      title: `${symbol} Historical OHLC Data & CSV Export | Odin500`,
      description: `Query and export historical OHLC data for ${symbol}: daily, weekly, monthly, quarterly, and annual price history with open, high, low, and close.`,
      canonical: `${SITE_ORIGIN}/historical-data/${encodeURIComponent(symbol.toLowerCase())}`
    };
  }

  const tickerReportMatch = path.match(/^\/ticker-report\/([A-Za-z0-9.]+)$/i);
  if (tickerReportMatch) {
    const symbol = decodeURIComponent(tickerReportMatch[1]).toUpperCase();
    return {
      title: `${symbol} Monthly Stock Report | Odin500`,
      description: `${symbol} monthly performance report with trailing returns, drawdown, relative strength, seasonality heatmap, and investor FAQs.`,
      canonical: `${SITE_ORIGIN}/ticker-report/${encodeURIComponent(symbol.toLowerCase())}`
    };
  }

  const tickerMatch = path.match(/^\/ticker\/([A-Za-z0-9.]+)$/i);
  if (tickerMatch) {
    const symbol = decodeURIComponent(tickerMatch[1]).toUpperCase();
    return {
      title: `${symbol} Historical Data, OHLC Chart & Trading Signals | Odin500`,
      description: `${symbol} ticker historical data, OHLC price chart trends, returns, and trading signals for stock market research.`,
      canonical: `${SITE_ORIGIN}/ticker/${encodeURIComponent(symbol)}`
    };
  }

  const indexMatch = path.match(/^\/indices\/([a-z0-9-]+)$/i);
  if (indexMatch) {
    const slug = decodeURIComponent(indexMatch[1]).toLowerCase();
    const label = INDEX_SLUG_LABELS[slug] || slug.replace(/-/g, ' ');
    return {
      title: `${label} Index Data, Returns & OHLC Signals | Odin500`,
      description: `${label} index historical data, OHLC chart trends, returns, and signal analytics for traders and investors.`,
      canonical: `${SITE_ORIGIN}/indices/${encodeURIComponent(slug)}`
    };
  }

  const sectorMatch = path.match(/^\/sector-data\/([a-z0-9]+)$/i);
  if (sectorMatch) {
    const slug = decodeURIComponent(sectorMatch[1]).toLowerCase();
    const label = SECTOR_SLUG_LABELS[slug] || slug.toUpperCase();
    return {
      title: `${label} Sector ETF Data, Returns & Signals | Odin500`,
      description: `${label} sector ETF historical data, returns, heatmap context, and signal analytics for sector rotation research.`,
      canonical: `${SITE_ORIGIN}/sector-data/${encodeURIComponent(slug)}`
    };
  }

  const statMatch = path.match(/^\/statistic\/(ticker-(?:annual|quarterly|monthly|weekly|daily))\/([A-Za-z0-9.]+)$/i);
  if (statMatch) {
    const kind = statMatch[1].toLowerCase();
    const symbol = decodeURIComponent(statMatch[2]).toUpperCase();
    const horizon = STAT_KIND_LABELS[kind] || 'Periodic';
    return {
      title: `${symbol} ${horizon} Return Statistics & Historical Data | Odin500`,
      description: `${symbol} ${horizon.toLowerCase()} return statistics, historical performance tables, and OHLC-based analytics for U.S. equity research.`,
      canonical: `${SITE_ORIGIN}/statistic/${kind}/${encodeURIComponent(symbol)}`
    };
  }

  return null;
}

export function resolveRequestMetadata(pathname: string) {
  const path = normalizePathname(pathname);
  return (
    resolveDynamicRouteMetadata(path) ||
    ROUTE_METADATA[path] || {
      title: DEFAULT_SITE_TITLE,
      description: DEFAULT_SITE_DESCRIPTION,
      canonical: absoluteSiteUrl(path)
    }
  );
}

export function toNextMetadata(pathname: string): Metadata {
  const meta = resolveRequestMetadata(pathname);
  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical: meta.canonical },
    robots: 'noindex' in meta && meta.noindex ? { index: false, follow: false } : undefined,
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: meta.canonical,
      type: 'website',
      siteName: 'Odin500'
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.title,
      description: meta.description
    }
  };
}

export function enrichHistoricalDataMetadata(
  meta: { title: string; description: string; canonical: string },
  preview: {
    symbol?: string;
    company_name?: string | null;
    min_date?: string;
    max_date?: string;
    latest_date?: string;
    latest_close?: number | null;
  }
) {
  if (!preview?.symbol) return meta;
  const sym = String(preview.symbol).toUpperCase();
  const name = String(preview.company_name || '').trim();
  const label = name ? `${name} (${sym})` : sym;
  const rangeBit =
    preview.min_date && preview.max_date
      ? ` Daily OHLC from ${preview.min_date} through ${preview.max_date}.`
      : '';
  let closeBit = '';
  if (preview.latest_close != null && preview.latest_date) {
    const close = Number(preview.latest_close);
    const closeStr = Number.isFinite(close) ? close.toFixed(2) : String(preview.latest_close);
    closeBit = ` Latest close $${closeStr} on ${preview.latest_date}.`;
  }
  const titleSuffix = name ? `${name} (${sym})` : sym;
  return {
    ...meta,
    title: `${titleSuffix} Historical OHLC Data & CSV Export | Odin500`,
    description: `${label} historical OHLC preview, date-range tables, and CSV export.${rangeBit}${closeBit} View ${sym} charts and signals on Odin500.`
  };
}
