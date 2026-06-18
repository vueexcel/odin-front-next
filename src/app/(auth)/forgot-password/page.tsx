import { toNextMetadata } from '@/seo/metadata';

export const metadata = toNextMetadata('/forgot-password');
import ForgotPasswordPage from '@/views/ForgotPasswordPage.jsx';

export default function Page() {
  return <ForgotPasswordPage />;
}
