import { toNextMetadata } from '@/seo/metadata';
import TickerDailyPage from '@/views/TickerDailyPage.jsx';

export async function generateMetadata({ params }: { params: Promise<{ symbol: string }> }) {
  const p = await params;
  return toNextMetadata('/statistic/ticker-daily/' + p.symbol);
}

export default function Page() {
  return <TickerDailyPage />;
}
