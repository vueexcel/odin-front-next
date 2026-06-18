import { toNextMetadata } from '@/seo/metadata';

export const metadata = toNextMetadata('/login');
import LoginPage from '@/views/LoginPage.jsx';

export default function Page() {
  return <LoginPage />;
}
