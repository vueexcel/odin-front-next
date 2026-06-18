import { toNextMetadata } from '@/seo/metadata';

export const metadata = toNextMetadata('/about');
import AboutPage from '@/views/AboutPage.jsx';

export default function Page() {
  return <AboutPage />;
}
