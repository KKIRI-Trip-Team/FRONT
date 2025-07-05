'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { AuthGuard } from '../auth/AuthGuard';
import { AnimatePresence, motion } from 'motion/react';

// 일반 버튼
function NormalButton() {
  const router = useRouter();

  const handleMakeTrip = () => {
    router.push('/tripPlanning');
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

// 스크롤 할시 렌더링되는 버튼
function FloatingButton() {
  const router = useRouter();
  const handleMakeTrip = () => {
    router.push('/tripPlanning');
  };
  return (
    <motion.button
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={handleMakeTrip}
      className="group fixed z-10 top-8 right-8 w-14 h-14 rounded-full bg-[var(--PrimaryLight)] text-white text-3xl shadow-lg flex justify-center items-center transition-opacity"
    >
      +
      <span
        className="absolute right-16 opacity-0 group-hover:opacity-100 bg-gray-800 text-white text-sm rounded px-3 py-2 ml-2 pointer-events-none whitespace-nowrap transition-opacity duration-150 shadow-lg "
        style={{ top: '50%', transform: 'translateY(-50%)' }}
      >
        게시글 작성하기
      </span>
    </motion.button>
  );
}

export default function CreateTripButton() {
  const [showFloating, setShowFloating] = useState(false);

  // 스크롤 이벤트
  useEffect(() => {
    const onScroll = () => {
      setShowFloating(window.scrollY > 300);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AuthGuard>
      <AnimatePresence mode="wait" initial={false}>
        {!showFloating ? (
          <NormalButton />
        ) : (
          <FloatingButton key="floating-btn" />
        )}
      </AnimatePresence>
    </AuthGuard>
  );
}
