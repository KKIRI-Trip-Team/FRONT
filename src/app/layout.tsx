import '@/styles/globals.css';

import type { Metadata } from 'next';

import RootLayoutClient from '@/app/RootLayoutClient';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'TreBuddy - 여행 매칭 플랫폼',
  description:
    'TreBuddy - Find your perfect travel companion. Connect with like-minded travelers, plan your journey together, and create unforgettable memories. Join our community to discover new friends and explore the world side by side.',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return (
    <html lang="kr">
      <body className={'bg-[#f8f8f8] min-w-[375px] min-h-screen'}>
        <Suspense fallback={<p>로딩중입니다123</p>}>
          <RootLayoutClient>{children}</RootLayoutClient>
        </Suspense>
      </body>
    </html>
  );
}
