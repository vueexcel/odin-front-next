import { toNextMetadata } from '@/seo/metadata';
import IndexPage from '@/views/IndexPage.jsx';

export async function generateMetadata({ params }: { params: Promise<{ indexSlug: string }> }) {
  const p = await params;
  return toNextMetadata('/indices/' + p.indexSlug);
}

export default function Page() {
  return <IndexPage />;
}
