import { toNextMetadata } from '@/seo/metadata';

export const metadata = toNextMetadata('/signup/username');
import SignupUsernamePage from '@/views/SignupUsernamePage.jsx';

export default function Page() {
  return <SignupUsernamePage />;
}
