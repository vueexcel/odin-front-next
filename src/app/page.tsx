import { redirect } from 'next/navigation';
import { toNextMetadata } from '@/seo/metadata';

export const metadata = toNextMetadata('/');

export default function HomePage() {
  redirect('/market');
}
