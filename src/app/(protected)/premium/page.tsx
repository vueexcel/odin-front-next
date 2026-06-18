import { toNextMetadata } from '@/seo/metadata';

export const metadata = toNextMetadata('/premium');

import Pricing from '@/views/Pricing.jsx';

export default function Page() {
  return <Pricing />;
}
