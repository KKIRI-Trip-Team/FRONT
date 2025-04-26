import DefaultProfilePcIcon from '@/public/icons/default-profile-icon-pc.svg';
import DefaultProfileMobileIcon from '@/public/icons/default-profile-icon-mobile.svg';
import RightArrowIcon from '@/public/icons/right-arrow-icon.svg';
import Link from 'next/link';

const Menu = () => {
  return (
    <div
      className="fixed inset-0 z-20 mt-[60px] pb-[env(safe-area-inset-bottom)] mx-auto
      w-[375px] tb:w-[768px] pc:w-[1200px] pc:mt-[80px] pc:mb-[60px]"
    >
      <div className="max-w-[1200px] mx-auto pc:h-full flex flex-col">
        {/* 시작 메뉴 */}
        <div className="flex flex-col items-start gap-[20px] p-5 bg-white">
          <button>
            <span className="hidden pc:block">
              <DefaultProfilePcIcon />
            </span>
            <span className="block pc:hidden">
              <DefaultProfileMobileIcon />
            </span>
          </button>
          <button className="flex items-center">
            <span className="text-[var(--Gray900,#222)] text-subtitle1">
              트레버디를 시작하세요
            </span>
            <RightArrowIcon />
          </button>
        </div>

        {/* 메인 메뉴 - 높이 100% 적용 */}
        <nav className="p-5 min-h-[234px] pc:min-h-[528px] pc:max-h-[566px] flex-grow">
          <ul className="flex flex-col gap-[30px]">
            <li>
              <Link href="/">
                <span className="text-[var(--Gray900,#222)] text-subtitle2">
                  탐색
                </span>
              </Link>
            </li>
            <li>
              <Link href="/plan">
                <span className="text-[var(--Gray900,#222)] text-body1">
                  만들기
                </span>
              </Link>
            </li>
            <li>
              <Link href="/mypage">
                <span className="text-[var(--Gray900,#222)] text-body1">
                  마이페이지
                </span>
              </Link>
            </li>
          </ul>
        </nav>

        {/* 보조 메뉴 */}
        <div className="flex bg-white  pt-5  pr-5  pb-0  pl-5  justify-center items-center content-center gap-[14px_15px] flex-wrap">
          <button className="flex items-center justify-between w-40 p-3 rounded border border-[var(--Gray300,#E0E0E0)]">
            <p className="text-[var(--Gray900,#222)] text-body2 tracking-[-0.5px]">
              서비스 이용약관
            </p>
            <RightArrowIcon />
          </button>
          <button className="flex items-center justify-between w-40 p-3 rounded border border-[var(--Gray300,#E0E0E0)]">
            <p className="text-[var(--Gray900,#222)] text-body2 tracking-[-0.5px]">
              게시물 게재 규칙
            </p>
            <RightArrowIcon />
          </button>
          <button className="flex items-center justify-between w-40 p-3 rounded border border-[var(--Gray300,#E0E0E0)]">
            <p className="text-[var(--Gray900,#222)] text-body2 tracking-[-0.5px]">
              개인정보 처리방침
            </p>
            <RightArrowIcon />
          </button>
          <button className="flex items-center justify-between w-40 p-3 rounded border border-[var(--Gray300,#E0E0E0)]">
            <p className="text-[var(--Gray900,#222)] text-body2 tracking-[-0.5px]">
              공지사항
            </p>
            <RightArrowIcon />
          </button>
        </div>

        {/* 저작권 표시 */}
        <div className="bg-white flex py-[30px]  px-0  justify-center items-center gap-[0.63rem]">
          <p className="text-[var(--Gray600,#999)] text-center text-caption2">
            © Trebuddy. All Rights Reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Menu;
