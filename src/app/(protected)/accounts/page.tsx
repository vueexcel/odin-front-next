import { toNextMetadata } from '@/seo/metadata';

export const metadata = toNextMetadata('/accounts');
import AccountsPage from '@/views/AccountsPage.jsx';

export default function Page() {
  return <AccountsPage />;
}
