import { toNextMetadata } from '@/seo/metadata';
import { redirectIfAuthenticated } from '@/lib/authGuestRedirect';
import LoginPage from '@/views/LoginPage.jsx';

export const metadata = toNextMetadata('/login');

export default async function Page({
  searchParams
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const sp = await searchParams;
  await redirectIfAuthenticated(sp.next);
  return <LoginPage />;
}
