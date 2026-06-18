import { toNextMetadata } from '@/seo/metadata';

export const metadata = toNextMetadata('/paper-trading');

import PaperTradingPage from '@/views/PaperTrading/PaperTradingPage.jsx';

export default function Page() {
  return <PaperTradingPage />;
}
