import { toNextMetadata } from '@/seo/metadata';
import StockSplitsPage from '@/views/StockSplitsPage.jsx';

export const metadata = toNextMetadata('/stock-splits');

export default function Page() {
  return <StockSplitsPage />;
}
