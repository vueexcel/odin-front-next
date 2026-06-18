import { toNextMetadata } from '@/seo/metadata';
import TickerReportPage from '@/views/TickerReportPage.jsx';

export async function generateMetadata({ params }: { params: Promise<{ symbol: string }> }) {
  const p = await params;
  return toNextMetadata('/ticker-report/' + p.symbol);
}

export default function Page() {
  return <TickerReportPage />;
}
