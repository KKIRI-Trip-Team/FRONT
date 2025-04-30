'use client';

import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import '@/styles/globals.css';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import { usePathname } from 'next/navigation';
import { useFunnel } from '@use-funnel/browser';
import DetailTripHeader from '@/components/tripPlanning/detail-header';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export default function RootLayout({
  children,
  funnel,
}: Readonly<{
  children: React.ReactNode;
  funnel: ReturnType<typeof useFunnel>;
}>) {
  const pathname = usePathname();
  const isTripDetail = pathname.startsWith('/tripPlanning/tripDetail');

  return (
    <html lang="kr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#f8f8f8] min-w-[375px] min-h-screen`}
      >
        <div
          className="mx-auto w-full max-w-[1920px] flex flex-col items-center
          pc:max-w-[1200px]
          tb:max-w-[768px] 
          mb:max-w-[375px]"
        >
          {isTripDetail ? <DetailTripHeader /> : <Header />}

          <main className="w-full">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
