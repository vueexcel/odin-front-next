import { toNextMetadata } from '@/seo/metadata';

export async function generateMetadata({ params }: { params: Promise<{ indexSlug: string }> }) {
  const p = await params;
  return toNextMetadata('/indices/' + p.indexSlug);
}
export const revalidate = 300;

import { PageServerShell } from '@/seo/PageServerShell';
import { fetchIndexPageData } from '@/ssr/fetchPageData';
import IndexPage from '@/views/IndexPage.jsx';

export default async function Page({ params }: { params: Promise<{ indexSlug: string }> }) {
  const { indexSlug } = await params;
  let seoData: unknown = null;
  try {
    seoData = await fetchIndexPageData(indexSlug, false);
  } catch {
    /* SSR prefetch is best-effort */
  }

  const pathname = (`/indices/${indexSlug}`);
  return (
    <PageServerShell pathname={pathname} seoData={seoData}>
      <IndexPage initialData={seoData as never} />
    </PageServerShell>
  );
}
