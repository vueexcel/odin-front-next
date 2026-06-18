import { toNextMetadata } from '@/seo/metadata';

export const metadata = toNextMetadata('/signup/enter-code');
import SignupEnterCodePage from '@/views/SignupEnterCodePage.jsx';

export default function Page() {
  return <SignupEnterCodePage />;
}
