// login.main
'use client';

import LogoIconLoginIcon from '@/public/icons/logo-icon-login.svg';
import LogoTitleIcon from '@/public/icons/logo-title-icon.svg';
import KakaoIcon from '@/public/icons/kakao-icon.svg';
import EmailIcon from '@/public/icons/email-icon.svg';
import Link from 'next/link';

const page = () => {
  return (
    <div className="flex flex-col items-center justify-end w-full h-full pc:h-[934px] tb:min-h-screen mb:min-h-screen gap-5 py-10 bg-white shrink-0">
      {/* 로고 */}
      <div className="flex flex-col items-center justify-center gap-[10px] flex-[1,0,0] grow shrink-0 basis-0 self-stretch">
        <LogoIconLoginIcon />
        <LogoTitleIcon />
        <p className="text-subtitle3">너랑 나랑, 여행 버디!</p>
      </div>

      {/* 로그인버튼 */}
      <div className="flex flex-col items-center self-stretch justify-end gap-3 px-5">
        <button className="flex py-4  px-0  justify-center items-center gap-[0.63rem] self-stretch rounded-full bg-[#fee500]">
          <KakaoIcon />
          <span>카카오로 간편하게 시작하기</span>
        </button>

        <Link
          href={'/login/form'}
          className="flex py-4  px-0  justify-center items-center gap-[0.63rem] self-stretch rounded-full bg-[#ffffff] border border-gary-900 hover:border-black"
        >
          <EmailIcon />
          <span>이메일로 로그인하기</span>
        </Link>
      </div>

      {/* 로그인기능 */}
      <div className="flex items-start gap-5">
        <button className="text-center text-gray-600 text-caption1">
          이메일로 회원가입
        </button>
        <button className="text-center text-gray-600 text-caption1">
          아이디 찾기
        </button>
      </div>
    </div>
  );
};

export default page;
