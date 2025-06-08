// components/Header.tsx
'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import LogoIcon from '@/public/icons/logo-icon.svg';
import LogoTitleIcon from '@/public/icons/logo-title-icon.svg';
import MenuIcon from '@/public/icons/menu-icon.svg';
import SearchIcon from '@/public/icons/search-icon.svg';
import XIcon from '@/public/icons/x-icon.svg';
import Menu from './Menu';
import ProfileIcon from '@/components/common/ProfileIcon';
import { useTripFunnelStore } from '@/store/tripFunnelStore';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { resetAll } = useTripFunnelStore();

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
          {/* 로고 */}
          <Link href="/" className="flex items-center" onClick={resetAll}>
            <LogoIcon />
            <LogoTitleIcon />
          </Link>

          {/* 버튼 */}
          <div className="flex gap-5">
            {menuOpen ? (
              <button onClick={handleMenuOpen}>
                <XIcon />
              </button>
            ) : (
              <>
                <button onClick={handleMenuOpen}>
                  <MenuIcon />
                </button>
                <button onClick={() => router.push('/search')}>
                  <SearchIcon />
                </button>
                <ProfileIcon />
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
