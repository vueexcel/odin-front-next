import { toNextMetadata } from '@/seo/metadata';
import { redirectIfAuthenticated } from '@/lib/authGuestRedirect';
import SignupPage from '@/views/SignupPage.jsx';

export const metadata = toNextMetadata('/signup');

export default async function Page() {
  await redirectIfAuthenticated();
  return <SignupPage />;
}
