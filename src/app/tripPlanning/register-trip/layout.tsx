'use client';

import { usePathname } from 'next/navigation';
import PcSidebar from '@/components/tripPlanning/sidebar/PcSidebar';
import TabelSidebar from '@/components/tripPlanning/sidebar/TabletSidebar';

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="pc:relative">
      {children}

      <div className="hidden pc:block pc:absolute pc:top-5 pc:left-5 pc:z-10">
        <PcSidebar />
      </div>
      <div className="block pc:hidden">
        <TabelSidebar />
      </div>
    </div>
  );
}
