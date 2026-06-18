import { toNextMetadata } from '@/seo/metadata';
import TickerAnnualPage from '@/views/TickerAnnualPage.jsx';

export async function generateMetadata({ params }: { params: Promise<{ symbol: string }> }) {
  const p = await params;
  return toNextMetadata('/statistic/ticker-annual/' + p.symbol);
}

export default function Page() {
  return <TickerAnnualPage />;
}
