import { toNextMetadata } from '@/seo/metadata';
import OdinSignalsPage from '@/views/OdinSignalsPage.jsx';

export const metadata = toNextMetadata('/odin-signals');

export default function Page() {
  return <OdinSignalsPage />;
}
