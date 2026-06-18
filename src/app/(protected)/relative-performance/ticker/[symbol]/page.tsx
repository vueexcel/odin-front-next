import { toNextMetadata } from '@/seo/metadata';
import RelativeStrengthTickerPage from '@/views/RelativeStrengthTickerPage.jsx';

export async function generateMetadata({ params }: { params: Promise<{ symbol: string }> }) {
  const p = await params;
  return toNextMetadata('/relative-performance/ticker/' + p.symbol);
}

export default function Page() {
  return <RelativeStrengthTickerPage />;
}
