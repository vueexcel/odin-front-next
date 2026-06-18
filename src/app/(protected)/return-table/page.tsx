import { toNextMetadata } from '@/seo/metadata';
import ReturnTablePage from '@/views/ReturnTablePage.jsx';

export const metadata = toNextMetadata('/return-table');

export default function Page() {
  return <ReturnTablePage />;
}
