import { toNextMetadata } from '@/seo/metadata';
import MarketMoversPage from '@/views/MarketMoversPage.jsx';

export const metadata = toNextMetadata('/market-movers');

export default function Page() {
  return <MarketMoversPage />;
}
