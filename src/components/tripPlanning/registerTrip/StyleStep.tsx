'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

import { useTripFunnelStore } from '@/store/useTripFunnelStore';
import { BoardRegisterTypes } from '@/types/boardRegister';
import { UseFunnelResults } from '@use-funnel/browser';
import { slideFadeVariants } from '@/utils/motionVariants';
import { useTransitionStore } from '@/store/transitionStore';

const styles = [
  { id: 1, name: '휴식 🧘🍵' },
  { id: 2, name: '체험 🤿' },
  { id: 3, name: '액티비티🏃' },
  { id: 4, name: '쇼핑 🛒🛍' },
  { id: 5, name: '견문 넓히기🏛🖼' },
  { id: 6, name: '식도락 🍕🍖' },
  { id: 7, name: '감성투어 🌆' },
  { id: 8, name: '가성비 💸' },
  { id: 9, name: '플랙스 🤑' },
  { id: 10, name: '꼼꼼한 계획 ✍⏱' },
  { id: 11, name: '즉흥 🤹‍♀️' },
  { id: 12, name: '자연친화🌳' },
  { id: 13, name: '여유 ⏳' },
  { id: 14, name: '인생샷필수 📸' },
  { id: 15, name: '핫플 🎪✨' },
  { id: 16, name: '웨이팅가능 📋' },
  { id: 17, name: '근처 아무식당🍽️' },
];

interface StyleFunnel {
  funnel: UseFunnelResults<BoardRegisterTypes, BoardRegisterTypes['styleStep']>;
}

export default function StyleStep({ funnel }: StyleFunnel) {
  const { stepIndex, context, setContext, setStepIndex } = useTripFunnelStore();
  const { direction } = useTransitionStore();
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);

  useEffect(() => {
    setStepIndex(4);
    if (context.styles?.length > 0) {
      setSelectedStyles(context.styles);
    }
  }, []);

  const toggleStyle = (styleName: string) => {
    setSelectedStyles((prev) =>
      prev.includes(styleName)
        ? prev.filter((s) => s !== styleName)
        : [...prev, styleName],
    );
  };

  const isSelected = selectedStyles.length >= 3;

  const getStyleClass = (isActive: boolean) =>
    isActive
      ? 'outline outline-[0.8px] outline-[var(--PrimaryLight)] bg-[rgba(0,133,255,0.1)]'
      : 'bg-[#F8F8F8]';

  const handleNext = () => {
    const nextContext = { ...context, styles: selectedStyles };
    setContext({ styles: selectedStyles });
    funnel.history.push('expenseStep', nextContext);
  };

  return (
    <motion.div
      key="styleStep"
      custom={direction}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={slideFadeVariants}
      className="flex flex-col items-center pc:w-[1200px] tb:w-[768px] h-[854px] p-[20px_20px_40px_20px] gap-[40px] bg-white font-[Pretendard] tracking-[-0.5px]"
    >
      <div className="flex flex-col items-center self-stretch">
        <div className="flex items-center gap-[3px] text-[var(--PrimaryLight)] text-[10px] font-bold leading-[16px] tracking-[-0.5px] text-center">
          <span>{stepIndex}</span>
          <span className="text-[rgba(0,133,255,0.5)]">/</span>
          <span className="text-[rgba(0,133,255,0.5)]">6</span>
        </div>
        <h1 className="text-[20px] font-bold text-[var(--Gray900)] text-center leading-[30px]">
          여행 스타일이 궁금해요
        </h1>
        <span className="text-[14px] text-[var(--Gray600)] text-center leading-[20px]">
          평소 여행 스타일을 3개 이상 선택해주세요
        </span>
      </div>

      <div className="flex items-start content-start gap-[16px] self-stretch flex-[1_0_0] flex-wrap">
        {styles.map((style) => {
          const isActive = selectedStyles.includes(style.name);
          return (
            <div
              key={style.id}
              onClick={() => toggleStyle(style.name)}
              className={`flex px-[20px] py-[10px] justify-center items-center rounded-[100px] ${getStyleClass(
                isActive,
              )}`}
            >
              <label className="text-[12px] font-bold leading-[18px] cursor-pointer text-center">
                {style.name}
              </label>
              <input type="checkbox" hidden value={style.name} />
            </div>
          );
        })}
      </div>

      <button
        disabled={!isSelected}
        className={`flex h-[54px] px-[0px] py-[16px] justify-center items-center shrink-0 text-center w-full text-[16px] font-bold leading-[22px] ${
          isSelected ? 'text-[var(--white)]' : 'text-[var(--Gray400)]'
        } ${
          isSelected ? 'bg-[#5938DB]' : 'bg-[#F1F1F2]'
        } disabled:cursor-not-allowed disabled:opacity-50`}
        onClick={handleNext}
      >
        다음
      </button>
    </motion.div>
  );
}
