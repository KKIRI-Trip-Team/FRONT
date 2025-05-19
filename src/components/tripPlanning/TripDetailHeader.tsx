'use client';

import SAVEICON from '@/public/icons/save-icon.svg';
import LEFTARROWICON from '@/public/icons/left-arrow-icon.svg';

import { useRouter } from 'next/navigation';

export default function DetailTripHeader() {
  const router = useRouter();

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
          <div className="flex items-center gap-[16px]">
            <button onClick={() => router.back()}>
              <LEFTARROWICON />
            </button>
            <button onClick={() => window.alert('저장되었습니다')}>
              <SAVEICON />
            </button>
          </div>
          {/* 버튼 */}
          <div className="flex gap-5">
            <button
              className="font-
                  [Pretendard] text-[14px] font-bold leading-[20px] tracking-[-0.5px] text-[var(--Primary)]"
            >
              작성완료
            </button>
          </div>
        </header>
      </div>
    </>
  );
}
