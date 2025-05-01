'use client';

import { usePathname } from 'next/navigation';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';

export default function RootLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAuthRoute =
    pathname?.startsWith('/login') || pathname?.startsWith('/register');
  const isDetailTrip = pathname.startsWith('/tripPlanning/tripDetail');

  return (
    <div
      className="mx-auto w-full max-w-[1920px] flex flex-col items-center
      pc:max-w-[1200px]
      tb:max-w-[768px] 
      mb:max-w-[375px]"
    >
      {!isAuthRoute && <Header />}
      <main className="w-full">{children}</main>
      <Footer />
    </div>
  );
}
