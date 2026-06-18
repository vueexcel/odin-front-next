import { toNextMetadata } from '@/seo/metadata';

export const metadata = toNextMetadata('/signup/verify-email');
import SignupVerifyEmailPage from '@/views/SignupVerifyEmailPage.jsx';

export default function Page() {
  return <SignupVerifyEmailPage />;
}
