import { toNextMetadata } from '@/seo/metadata';
import TickerPage from '@/views/TickerPage.jsx';

export async function generateMetadata({ params }: { params: Promise<{ symbol: string }> }) {
  const p = await params;
  return toNextMetadata('/ticker/' + p.symbol);
}

export default function Page() {
  return <TickerPage />;
}
