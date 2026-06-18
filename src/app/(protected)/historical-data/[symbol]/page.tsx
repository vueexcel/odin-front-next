import HistoricalDataPage from '@/views/HistoricalDataPage.jsx';
import { fetchHistoricalDataPreview } from '@/ssr/fetchHistoricalDataPreview.js';
import { toNextMetadata, enrichHistoricalDataMetadata } from '@/seo/metadata';
import { PageServerShell } from '@/seo/PageServerShell';

export const revalidate = 300;

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
    initialPreview = await fetchHistoricalDataPreview(symbol.toUpperCase());
  } catch {
    /* ignore */
  }
  const pathname = `/historical-data/${symbol}`;
  return (
    <PageServerShell pathname={pathname} seoData={initialPreview}>
      <HistoricalDataPage initialPreview={initialPreview} />
    </PageServerShell>
  );
}
