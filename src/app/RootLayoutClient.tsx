'use client';

import { usePathname } from 'next/navigation';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import DetailTripHeader from '@/components/tripPlanning/TripDetailHeader';

export default function RootLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAuthRoute =
    pathname?.startsWith('/login') || pathname?.startsWith('/register');

  const isTripDetailPage = pathname.startsWith('/tripPlanning/tripDetail');
  return (
    <div
      className="mx-auto w-full max-w-[1920px] flex flex-col items-center
      pc:max-w-[1200px]
      tb:max-w-[768px] 
      mb:max-w-[375px]"
    >
      {isTripDetailPage ? <DetailTripHeader /> : !isAuthRoute && <Header />}
      <main className="w-full">{children}</main>
      <Footer />
    </div>
  );
}
