import LogoTitleNoneColorIcon from '@/public/icons/logo-titile-nonecolor-icon.svg';

export default function Footer() {
  return (
    <div
      data-property-1="Default"
      className=" fixed bottom-0 left-1/2 transform -translate-x-1/2 hidden pc:inline-flex w-[1200px] h-[60px] max-w-[1200px] px-20 py-5 bg-stone-50 justify-between items-center z-10"
    >
      {/* 로고 */}
      <div className="flex items-center gap-2">
        <p className="text-[#B0B0B0] text-caption1">너랑 나랑, 여행 버디!</p>
        <LogoTitleNoneColorIcon />
      </div>

      {/* Nav */}
      <div className="flex items-center self-stretch gap-6">
        <button className="text-[#616161] text-body2 pr-6 relative">
          자주하는 질문
          <span className="absolute right-0 top-1/2 -translate-y-1/2 w-[1px] h-[12px] bg-gray-300"></span>
        </button>

        <button className="text-[#616161] text-body2 pr-6 relative">
          서비스 이용약관
          <span className="absolute right-0 top-1/2 -translate-y-1/2 w-[1px] h-[12px] bg-gray-300"></span>
        </button>

        <button className="text-[#616161] text-body2 pr-6 relative">
          개인정보 처리방침
          <span className="absolute right-0 top-1/2 -translate-y-1/2 w-[1px] h-[12px] bg-gray-300"></span>
        </button>

        <button className="text-[#616161] text-body2 relative">
          서비스 개선 참여
        </button>
      </div>
    </div>
  );
}
