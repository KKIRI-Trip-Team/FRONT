'use client';

import MobileSidebar from '../sidebar/MobileSidebar';
import PcSidebar from '../sidebar/PcSidebar';
import TabelSidebar from '../sidebar/TabletSidebar';

export default function DetailStepLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative pc:w-[1200px] pc:h-[854px] tb:w-[768px] tb:h-[706px] mb:w-[375px] mb:h-[418px] shrink-0 bg-white rounded-2xl shadow-xl">
      <main className="w-full h-full">{children}</main>

      {/* pc버젼 */}
      <div className="tb:hidden mb:hidden pc:block pc:absolute pc:top-5 pc:left-5 pc:z-10">
        <PcSidebar />
      </div>

      {/* tablet버젼 */}
      <div className="tb:block pc:hidden mb:hidden">
        <TabelSidebar />
      </div>

      {/* 모바일버젼 */}
      <div className="mb:block pc:hidden tb:hidden">
        <MobileSidebar />
      </div>
    </div>
  );
}
