'use client';

import SAVEICON from '@/public/icons/save-icon.svg';
import LEFTARROWICON from '@/public/icons/left-arrow-icon.svg';

import { useRouter } from 'next/navigation';
import { useTripFunnelStore } from '@/store/tripFunnelStore';

export default function DetailTripHeader() {
  const { mode, daysPlan } = useTripFunnelStore();
  const router = useRouter();

  const handleDaysPlan = () => {
    // 각 일자별 여행 계획을 최소 1개이상 선택해야지 작성완료가 가능.
    const isValid = daysPlan.every((day) => day.places.length > 0);
    if (!isValid) {
      alert('각 일자별 여행 계획을 최소 1개 이상 선택해야 합니다.');
      return;
    }

    router.back();
  };

  return (
    <div className="flex justify-center bg-white z-10 relative pc:w-[1200px] pc:h-20">
      <header className="flex justify-between items-center px-5 bg-white w-[375px] h-[60px] flex-shrink-0 border-b border-[#F1F1F2] tb:w-[768px] pc:w-[1200px] pc:h-[80px] pc:border-b-0">
        <div className="flex items-center gap-[16px]">
          <button onClick={() => router.back()}>
            <LEFTARROWICON />
          </button>
          <button onClick={() => alert('작성 중인 데이터는 자동 저장됩니다.')}>
            <SAVEICON />
          </button>
        </div>
        <div className="flex gap-5">
          <button
            className="font-[Pretendard] text-[14px] font-bold leading-[20px] tracking-[-0.5px] text-[var(--Primary)]"
            onClick={handleDaysPlan}
          >
            {mode === 'edit' ? '수정완료' : '작성완료'}
          </button>
        </div>
      </header>
    </div>
  );
}
