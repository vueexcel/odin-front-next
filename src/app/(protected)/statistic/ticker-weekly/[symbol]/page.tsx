import { toNextMetadata } from '@/seo/metadata';

export async function generateMetadata({ params }: { params: Promise<{ symbol: string }> }) {
  const p = await params;
  return toNextMetadata('/statistic/ticker-weekly/' + p.symbol);
}
export const revalidate = 300;

import { PageServerShell } from '@/seo/PageServerShell';
import { fetchStatisticPeriodicPageData } from '@/ssr/fetchPageData';
import TickerWeeklyPage from '@/views/TickerWeeklyPage.jsx';

export default async function Page({ params }: { params: Promise<{ symbol: string }> }) {
  const { symbol } = await params;
  let seoData: unknown = null;
  try {
    seoData = await fetchStatisticPeriodicPageData(symbol, 'weekly');
  } catch {
    /* SSR prefetch is best-effort */
  }

  const pathname = (`/statistic/ticker-weekly/${symbol}`);
  return (
    <PageServerShell pathname={pathname} seoData={seoData}>
      <TickerWeeklyPage initialData={seoData as never} />
    </PageServerShell>
  );
}
