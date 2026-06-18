import { redirectIfAuthenticated } from '@/lib/authGuestRedirect';
import ForgotPasswordPage from '@/views/ForgotPasswordPage.jsx';

export default async function Page() {
  await redirectIfAuthenticated();
  return <ForgotPasswordPage />;
}
