import { toNextMetadata } from '@/seo/metadata';
import MarketHeatmapPage from '@/views/MarketHeatmapPage.jsx';

export const metadata = toNextMetadata('/heatmap');

export default function Page() {
  return <MarketHeatmapPage />;
}
