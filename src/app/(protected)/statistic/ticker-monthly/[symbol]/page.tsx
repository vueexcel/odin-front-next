import { toNextMetadata } from '@/seo/metadata';

export async function generateMetadata({ params }: { params: Promise<{ symbol: string }> }) {
  const p = await params;
  return toNextMetadata('/statistic/ticker-monthly/' + p.symbol);
}
export const revalidate = 300;

import { PageServerShell } from '@/seo/PageServerShell';
import { fetchStatisticPeriodicPageData } from '@/ssr/fetchPageData';
import TickerMonthlyPage from '@/views/TickerMonthlyPage.jsx';

export default async function Page({ params }: { params: Promise<{ symbol: string }> }) {
  const { symbol } = await params;
  let seoData: unknown = null;
  try {
    seoData = await fetchStatisticPeriodicPageData(symbol, 'monthly');
  } catch {
    /* SSR prefetch is best-effort */
  }

  const pathname = (`/statistic/ticker-monthly/${symbol}`);
  return (
    <PageServerShell pathname={pathname} seoData={seoData}>
      <TickerMonthlyPage initialData={seoData as never} />
    </PageServerShell>
  );
}
