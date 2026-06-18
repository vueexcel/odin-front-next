import { toNextMetadata } from '@/seo/metadata';
import App from '@/App.jsx';

export const metadata = toNextMetadata('/market');

export default function Page() {
  return <App />;
}
