import { toNextMetadata } from '@/seo/metadata';
import TickerMonthlyPage from '@/views/TickerMonthlyPage.jsx';

export async function generateMetadata({ params }: { params: Promise<{ symbol: string }> }) {
  const p = await params;
  return toNextMetadata('/statistic/ticker-monthly/' + p.symbol);
}

export default function Page() {
  return <TickerMonthlyPage periodMode="monthly" />;
}
