import { toNextMetadata } from '@/seo/metadata';
import TickerQuarterlyPage from '@/views/TickerQuarterlyPage.jsx';

export async function generateMetadata({ params }: { params: Promise<{ symbol: string }> }) {
  const p = await params;
  return toNextMetadata('/statistic/ticker-quarterly/' + p.symbol);
}

export default function Page() {
  return <TickerQuarterlyPage />;
}
