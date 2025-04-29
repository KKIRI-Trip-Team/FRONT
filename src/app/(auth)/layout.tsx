import Footer from '@/components/common/Footer';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <main className="h-full">{children}</main>
      <Footer />
    </div>
  );
}
