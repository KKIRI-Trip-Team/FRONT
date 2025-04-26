// components/common/Header.tsx
import Link from 'next/link';
import LogoIcon from '@/public/icons/logo-icon.svg';
import LogoTitleIcon from '@/public/icons/logo-title-icon.svg';
import MenuIcon from '@/public/icons/menu-icon.svg';
import SearchIcon from '@/public/icons/search-icon.svg';
import DefaultProfilePcIcon from '@/public/icons/default-profile-icon-pc.svg';
import DefaultProfileMobileIcon from '@/public/icons/default-profile-icon-mobile.svg';

export default function Header() {
  return (
    <div
      className="flex justify-center bg-white
      pc:w-[1200px] pc:h-20
    "
    >
      <header
        className="flex justify-between items-center px-5 bg-white
        w-[375px] h-[60px] flex-shrink-0 border-b border-[#F1F1F2]
        tb:w-[768px] 
        pc:w-[1200px] pc:h-[80px] pc:border-b-0"
      >
        {/* 로고 */}
        <Link href="/" className="flex items-center">
          <LogoIcon />
          <LogoTitleIcon />
        </Link>

        {/* 버튼 */}
        <div className="flex gap-5">
          <button>
            <MenuIcon />
          </button>
          <button>
            <SearchIcon />
          </button>
          <button>
            <span className="hidden pc:block">
              <DefaultProfilePcIcon />
            </span>
            <span className="block pc:hidden">
              <DefaultProfileMobileIcon />
            </span>
          </button>
        </div>
      </header>
    </div>
  );
}
