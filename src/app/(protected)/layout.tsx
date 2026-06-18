import ProtectedLayout from '@/components/ProtectedLayout.jsx';

export default function ProtectedRootLayout({ children }: { children: React.ReactNode }) {
  return <ProtectedLayout>{children}</ProtectedLayout>;
}
