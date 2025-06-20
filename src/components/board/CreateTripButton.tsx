'use client';

import { useRouter } from 'next/navigation';

import { useAuthStore } from '@/store/authStore';

export default function CreateTripButton() {
  const { user } = useAuthStore();
  const router = useRouter();

  const handleMakeTrip = () => {
    if (!user) {
      alert('로그인이 필요한 서비스입니다.');
      return;
    } else {
      router.push('/tripPlanning');
    }
  };

  return (
    <section className="flex px-[20px] py-[40px] flex-col justify-center items-center gap-[10px] flex-[1_0_0] font-[Pretendard]">
      <button
        onClick={handleMakeTrip}
        className="flex px-[20px] py-[10px] justify-center items-center gap-[10px] rounded-[100px] bg-[var(--PrimaryLight)] "
      >
        <span className="text-[14px] font-bold leading-[20px] tracking-[-0.5px] text-[var(--white)]">
          여행 만들기
        </span>
      </button>
      <div className="leading-[18px] tracking-[-0.5px] self-stretch text-center text-[var(--Gray900)] text-[12px] font-bold">
        <h1>마음에 드는 여행 일정이 없으신가요?</h1>
        <h1>직접 여행일정을 만들어보세요!</h1>
      </div>
    </section>
  );
}
