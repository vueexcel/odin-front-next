import { toNextMetadata } from '@/seo/metadata';
import StatisticDataPage from '@/views/StatisticDataPage.jsx';

export const metadata = toNextMetadata('/statistic-data');

export default function Page() {
  return <StatisticDataPage />;
}
