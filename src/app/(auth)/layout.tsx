import Footer from '@/components/common/Footer';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="pc:min-h-[934px] min-h-screen">{children}</div>
      <Footer />
    </>
  );
}
