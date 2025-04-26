import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import '@/styles/globals.css';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#f8f8f8] min-w-[375px] min-h-screen`}
      >
        <div
          className="mx-auto w-full max-w-[1920px] flex flex-col items-center
          pc:max-w-[1200px]
          tb:max-w-[768px] 
          mb:max-w-[375px]"
        >
          <Header />
          <main className="w-full">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
