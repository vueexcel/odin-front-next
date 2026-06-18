import { toNextMetadata } from '@/seo/metadata';
import NewsPage from '@/views/NewsPage.jsx';

export const metadata = toNextMetadata('/news');

export default function Page() {
  return <NewsPage />;
}
