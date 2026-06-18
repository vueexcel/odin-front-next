import fs from 'node:fs';
import path from 'node:path';

const staticMeta = {
  'src/app/(auth)/login/page.tsx': '/login',
  'src/app/(auth)/signup/page.tsx': '/signup',
  'src/app/(protected)/market/page.tsx': '/market',
  'src/app/(protected)/heatmap/page.tsx': '/heatmap',
  'src/app/(protected)/market-movers/page.tsx': '/market-movers',
  'src/app/(protected)/stock-splits/page.tsx': '/stock-splits',
  'src/app/(protected)/news/page.tsx': '/news',
  'src/app/(protected)/odin-signals/page.tsx': '/odin-signals',
  'src/app/(protected)/statistic-data/page.tsx': '/statistic-data',
  'src/app/(protected)/return-table/page.tsx': '/return-table',
  'src/app/(protected)/accounts/page.tsx': '/accounts',
  'src/app/(protected)/paper-trading/page.tsx': '/paper-trading',
  'src/app/(protected)/premium/page.tsx': '/premium',
  'src/app/(protected)/about/page.tsx': '/about'
};

const dynamicMeta = {
  'src/app/(protected)/ticker/[symbol]/page.tsx': { param: 'symbol', prefix: '/ticker/' },
  'src/app/(protected)/indices/[indexSlug]/page.tsx': { param: 'indexSlug', prefix: '/indices/' },
  'src/app/(protected)/sector-data/[sectorKey]/page.tsx': { param: 'sectorKey', prefix: '/sector-data/' },
  'src/app/(protected)/statistic/ticker-annual/[symbol]/page.tsx': {
    param: 'symbol',
    prefix: '/statistic/ticker-annual/'
  },
  'src/app/(protected)/statistic/ticker-quarterly/[symbol]/page.tsx': {
    param: 'symbol',
    prefix: '/statistic/ticker-quarterly/'
  },
  'src/app/(protected)/statistic/ticker-monthly/[symbol]/page.tsx': {
    param: 'symbol',
    prefix: '/statistic/ticker-monthly/'
  },
  'src/app/(protected)/statistic/ticker-weekly/[symbol]/page.tsx': {
    param: 'symbol',
    prefix: '/statistic/ticker-weekly/'
  },
  'src/app/(protected)/statistic/ticker-daily/[symbol]/page.tsx': {
    param: 'symbol',
    prefix: '/statistic/ticker-daily/'
  },
  'src/app/(protected)/relative-performance/ticker/[symbol]/page.tsx': {
    param: 'symbol',
    prefix: '/relative-performance/ticker/'
  },
  'src/app/(protected)/ticker-report/[symbol]/page.tsx': { param: 'symbol', prefix: '/ticker-report/' }
};

const routes = [
  ['src/app/(auth)/login/page.tsx', '@/views/LoginPage.jsx', 'LoginPage'],
  ['src/app/(auth)/signup/page.tsx', '@/views/SignupPage.jsx', 'SignupPage'],
  ['src/app/(auth)/signup/verify-email/page.tsx', '@/views/SignupVerifyEmailPage.jsx', 'SignupVerifyEmailPage'],
  ['src/app/(auth)/signup/enter-code/page.tsx', '@/views/SignupEnterCodePage.jsx', 'SignupEnterCodePage'],
  ['src/app/(auth)/signup/username/page.tsx', '@/views/SignupUsernamePage.jsx', 'SignupUsernamePage'],
  ['src/app/(auth)/forgot-password/page.tsx', '@/views/ForgotPasswordPage.jsx', 'ForgotPasswordPage'],
  ['src/app/(auth)/auth/callback/page.tsx', '@/views/AuthCallbackPage.jsx', 'AuthCallbackPage'],
  ['src/app/(protected)/market/page.tsx', '@/App.jsx', 'App'],
  ['src/app/(protected)/heatmap/page.tsx', '@/views/MarketHeatmapPage.jsx', 'MarketHeatmapPage'],
  ['src/app/(protected)/market-movers/page.tsx', '@/views/MarketMoversPage.jsx', 'MarketMoversPage'],
  ['src/app/(protected)/stock-splits/page.tsx', '@/views/StockSplitsPage.jsx', 'StockSplitsPage'],
  ['src/app/(protected)/news/page.tsx', '@/views/NewsPage.jsx', 'NewsPage'],
  ['src/app/(protected)/odin-signals/page.tsx', '@/views/OdinSignalsPage.jsx', 'OdinSignalsPage'],
  ['src/app/(protected)/statistic-data/page.tsx', '@/views/StatisticDataPage.jsx', 'StatisticDataPage'],
  ['src/app/(protected)/return-table/page.tsx', '@/views/ReturnTablePage.jsx', 'ReturnTablePage'],
  ['src/app/(protected)/relative-performance/ticker/page.tsx', '@/views/RelativeStrengthTickerPage.jsx', 'RelativeStrengthTickerPage'],
  ['src/app/(protected)/accounts/page.tsx', '@/views/AccountsPage.jsx', 'AccountsPage'],
  ['src/app/(protected)/paper-trading/page.tsx', '@/views/PaperTrading/PaperTradingPage.jsx', 'PaperTradingPage'],
  ['src/app/(protected)/premium/page.tsx', '@/views/Pricing.jsx', 'Pricing'],
  ['src/app/(protected)/about/page.tsx', '@/views/AboutPage.jsx', 'AboutPage'],
  ['src/app/(protected)/ticker/[symbol]/page.tsx', '@/views/TickerPage.jsx', 'TickerPage'],
  ['src/app/(protected)/indices/[indexSlug]/page.tsx', '@/views/IndexPage.jsx', 'IndexPage'],
  ['src/app/(protected)/sector-data/[sectorKey]/page.tsx', '@/views/IndexPage.jsx', 'IndexPage'],
  ['src/app/(protected)/statistic/ticker-annual/[symbol]/page.tsx', '@/views/TickerAnnualPage.jsx', 'TickerAnnualPage'],
  ['src/app/(protected)/statistic/ticker-quarterly/[symbol]/page.tsx', '@/views/TickerQuarterlyPage.jsx', 'TickerQuarterlyPage'],
  ['src/app/(protected)/statistic/ticker-monthly/[symbol]/page.tsx', '@/views/TickerMonthlyPage.jsx', 'TickerMonthlyPage'],
  ['src/app/(protected)/statistic/ticker-weekly/[symbol]/page.tsx', '@/views/TickerWeeklyPage.jsx', 'TickerWeeklyPage'],
  ['src/app/(protected)/statistic/ticker-daily/[symbol]/page.tsx', '@/views/TickerDailyPage.jsx', 'TickerDailyPage'],
  ['src/app/(protected)/relative-performance/ticker/[symbol]/page.tsx', '@/views/RelativeStrengthTickerPage.jsx', 'RelativeStrengthTickerPage'],
  ['src/app/(protected)/historical-data/[symbol]/page.tsx', '@/views/HistoricalDataPage.jsx', 'HistoricalDataPage'],
  ['src/app/(protected)/ticker-report/[symbol]/page.tsx', '@/views/TickerReportPage.jsx', 'TickerReportPage']
];

function metaBlockFor(file) {
  if (staticMeta[file]) {
    return `import { toNextMetadata } from '@/seo/metadata';\n\nexport const metadata = toNextMetadata('${staticMeta[file]}');\n\n`;
  }
  const dyn = dynamicMeta[file];
  if (dyn) {
    return `import { toNextMetadata } from '@/seo/metadata';\n\nexport async function generateMetadata({ params }: { params: Promise<{ ${dyn.param}: string }> }) {\n  const p = await params;\n  return toNextMetadata('${dyn.prefix}' + p.${dyn.param});\n}\n\n`;
  }
  return '';
}

const historicalPage = `import HistoricalDataPage from '@/views/HistoricalDataPage.jsx';
import { fetchHistoricalDataPreview } from '@/ssr/fetchHistoricalDataPreview.js';
import { toNextMetadata, enrichHistoricalDataMetadata } from '@/seo/metadata';

export async function generateMetadata({ params }: { params: Promise<{ symbol: string }> }) {
  const { symbol } = await params;
  const base = toNextMetadata('/historical-data/' + symbol);
  try {
    const preview = await fetchHistoricalDataPreview(symbol.toUpperCase());
    if (preview) {
      const enriched = enrichHistoricalDataMetadata(
        {
          title: String(base.title || ''),
          description: String(base.description || ''),
          canonical: String(base.alternates?.canonical || '')
        },
        preview
      );
      return { ...base, title: enriched.title, description: enriched.description };
    }
  } catch {
    /* ignore */
  }
  return base;
}

export default async function Page({ params }: { params: Promise<{ symbol: string }> }) {
  const { symbol } = await params;
  let initialPreview = null;
  try {
    initialPreview = await fetchHistoricalDataPreview('/historical-data/' + symbol);
  } catch {
    /* ignore */
  }
  return <HistoricalDataPage initialPreview={initialPreview} />;
}
`;

for (const [file, imp, name] of routes) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  if (file === 'src/app/(protected)/historical-data/[symbol]/page.tsx') {
    fs.writeFileSync(file, historicalPage);
    continue;
  }
  const body = `import ${name} from '${imp}';\n\nexport default function Page() {\n  return <${name} />;\n}\n`;
  fs.writeFileSync(file, metaBlockFor(file) + body);
}

console.log('Regenerated', routes.length, 'route pages');
