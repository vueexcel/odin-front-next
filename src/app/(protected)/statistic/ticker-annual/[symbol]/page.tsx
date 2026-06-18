import { toNextMetadata } from '@/seo/metadata';

export async function generateMetadata({ params }: { params: Promise<{ symbol: string }> }) {
  const p = await params;
  return toNextMetadata('/statistic/ticker-annual/' + p.symbol);
}
export const revalidate = 300;

import { PageServerShell } from '@/seo/PageServerShell';
import { fetchStatisticAnnualPageData } from '@/ssr/fetchPageData';
import TickerAnnualPage from '@/views/TickerAnnualPage.jsx';

export default async function Page({ params }: { params: Promise<{ symbol: string }> }) {
  const { symbol } = await params;
  let seoData: unknown = null;
  try {
    seoData = await fetchStatisticAnnualPageData(symbol);
  } catch {
    /* SSR prefetch is best-effort */
  }

  const pathname = (`/statistic/ticker-annual/${symbol}`);
  return (
    <PageServerShell pathname={pathname} seoData={seoData}>
      <TickerAnnualPage initialData={seoData as never} />
    </PageServerShell>
  );
}
