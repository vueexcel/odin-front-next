import { toNextMetadata } from '@/seo/metadata';

export const metadata = toNextMetadata('/signup');
import SignupPage from '@/views/SignupPage.jsx';

export default function Page() {
  return <SignupPage />;
}
