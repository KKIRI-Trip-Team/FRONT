// app/RootLayoutClient.tsx
'use client';

import { usePathname } from 'next/navigation';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import { AuthProvider } from '@/providers/AuthProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});
import DetailTripHeader from '@/components/tripPlanning/TripDetailHeader';

export default function RootLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAuthRoute =
    pathname?.startsWith('/login') || pathname?.startsWith('/register');

  const isTripDetailPage = pathname.startsWith('/tripPlanning/register-trip');
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
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
      </AuthProvider>
    </QueryClientProvider>
  );
}
