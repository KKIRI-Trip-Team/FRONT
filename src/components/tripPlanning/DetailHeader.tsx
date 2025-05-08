'use client';

import Menu from '../common/Menu';
import XICON from '@/public/icons/x-icon.svg';
import SAVEICON from '@/public/icons/save-icon.svg';
import LEFTARROWICON from '@/public/icons/left-arrow-icon.svg';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

export default function DetailTripHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const handleMenuOpen = () => {
    setMenuOpen((prev) => !prev);
  };

  // 경로가 변경될 때마다 메뉴 닫기
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // 메뉴가 열릴 때 스크롤 방지
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [menuOpen]);

  return (
    <>
      <div
        className="flex justify-center bg-white z-10 relative
        pc:w-[1200px] pc:h-20"
      >
        <header
          className="flex justify-between items-center px-5 bg-white
          w-[375px] h-[60px] flex-shrink-0 border-b border-[#F1F1F2]
          tb:w-[768px] 
          pc:w-[1200px] pc:h-[80px] pc:border-b-0"
        >
          <button
            onClick={() => router.back()}
            className="flex items-center gap-[16px]"
          >
            <LEFTARROWICON />
            <SAVEICON />
          </button>

          {/* 버튼 */}
          <div className="flex gap-5">
            {menuOpen ? (
              <button onClick={handleMenuOpen}>
                <XICON />
              </button>
            ) : (
              <>
                <button
                  onClick={handleMenuOpen}
                  className="font-
                  [Pretendard] text-[14px] font-bold leading-[20px] tracking-[-0.5px] text-[var(--Primary)]"
                >
                  작성완료
                </button>
              </>
            )}
          </div>
        </header>
      </div>

      {/* 메뉴 오버레이 */}
      {menuOpen && <Menu />}
    </>
  );
}
