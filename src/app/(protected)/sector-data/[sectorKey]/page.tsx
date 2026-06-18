import { toNextMetadata } from '@/seo/metadata';
import IndexPage from '@/views/IndexPage.jsx';

export async function generateMetadata({ params }: { params: Promise<{ sectorKey: string }> }) {
  const p = await params;
  return toNextMetadata('/sector-data/' + p.sectorKey);
}

export default function Page() {
  return <IndexPage />;
}
