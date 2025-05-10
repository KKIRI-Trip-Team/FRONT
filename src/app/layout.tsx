import type { Metadata } from 'next';
import '@/styles/globals.css';
import RootLayoutClient from '@/app/RootLayoutClient';

export const metadata: Metadata = {
  title: 'TreBuddy - 여행 매칭 플랫폼',
  description:
    'TreBuddy - Find your perfect travel companion. Connect with like-minded travelers, plan your journey together, and create unforgettable memories. Join our community to discover new friends and explore the world side by side.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="kr">
      <body className={'bg-[#f8f8f8] min-w-[375px] min-h-screen'}>
        <RootLayoutClient>{children}</RootLayoutClient>
      </body>
    </html>
  );
}
