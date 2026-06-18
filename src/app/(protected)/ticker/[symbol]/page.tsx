import { toNextMetadata } from '@/seo/metadata';

export async function generateMetadata({ params }: { params: Promise<{ symbol: string }> }) {
  const p = await params;
  return toNextMetadata('/ticker/' + p.symbol);
}
export const revalidate = 300;

import { PageServerShell } from '@/seo/PageServerShell';
import { fetchTickerPageData } from '@/ssr/fetchPageData';
import TickerPage from '@/views/TickerPage.jsx';

export default async function Page({ params }: { params: Promise<{ symbol: string }> }) {
  const { symbol } = await params;
  let seoData: unknown = null;
  try {
    seoData = await fetchTickerPageData(symbol);
  } catch {
    /* SSR prefetch is best-effort */
  }

  const pathname = (`/ticker/${symbol}`);
  return (
    <PageServerShell pathname={pathname} seoData={seoData}>
      <TickerPage initialData={seoData as never} />
    </PageServerShell>
  );
}
