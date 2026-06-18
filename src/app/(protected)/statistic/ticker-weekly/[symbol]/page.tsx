import { toNextMetadata } from '@/seo/metadata';
import TickerWeeklyPage from '@/views/TickerWeeklyPage.jsx';

export async function generateMetadata({ params }: { params: Promise<{ symbol: string }> }) {
  const p = await params;
  return toNextMetadata('/statistic/ticker-weekly/' + p.symbol);
}

export default function Page() {
  return <TickerWeeklyPage />;
}
