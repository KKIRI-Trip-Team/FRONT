'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

import { UseFunnelResults } from '@use-funnel/browser';
import { slideFadeVariants } from '@/utils/motionVariants';
import { useTransitionStore } from '@/store/transitionStore';
import { BoardRegisterSteps } from '@/types/boardFunnel';
import { tripStyleMap } from '@/types/board';
import { useTripFunnelStore } from '@/store/tripFunnelStore';

interface StyleFunnel {
  funnel: UseFunnelResults<BoardRegisterSteps, BoardRegisterSteps['styleStep']>;
}

export default function StyleStep({ funnel }: StyleFunnel) {
  const { stepIndex, trip, setContext, setStepIndex } = useTripFunnelStore();
  const { direction } = useTransitionStore();
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]); // name 기준으로 저장

  useEffect(() => {
    setStepIndex(4);
    setSelectedStyles(trip.tripStyles ?? []);
  }, [trip.tripStyles]);

  const toggleStyle = (value: string) => {
    setSelectedStyles((prev) =>
      prev.includes(value)
        ? prev.filter((key) => key !== value)
        : [...prev, value],
    );
  };

  const isSelectedEnough = selectedStyles.length >= 2;

  const getStyleButtonStyle = (isActive: boolean) =>
    isActive
      ? 'outline outline-[0.8px] outline-[#0085FF] bg-[rgba(0,133,255,0.1)]'
      : 'bg-[#F8F8F8]';

  const handleNext = () => {
    setContext({ tripStyles: selectedStyles });
    funnel.history.push('expenseStep', {
      ...trip,
      tripStyles: selectedStyles,
    });
    console.log(`전송된 데이터 ${selectedStyles}`);
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
      {/* Header */}
      <div className="flex flex-col items-center self-stretch">
        <div className="flex items-center gap-[3px] text-[var(--PrimaryLight)] text-[10px] font-bold leading-[16px]">
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

      {/* Style Grid */}
      <div className="flex items-start content-start gap-[16px] self-stretch flex-[1_0_0] flex-wrap">
        {Object.entries(tripStyleMap).map(([value, { name, emoji }]) => {
          return (
            <div
              key={`${value}-${name}`}
              onClick={() => toggleStyle(value)}
              className={`px-[20px] py-[10px] rounded-[100px] flex flex-col items-center justify-center ${getStyleButtonStyle(
                selectedStyles.includes(value),
              )}`}
            >
              <label className="text-[12px] font-bold leading-[18px] text-center">
                {name} {emoji}
              </label>
            </div>
          );
        })}
      </div>

      <button
        disabled={!isSelectedEnough}
        onClick={handleNext}
        className={`flex h-[54px] justify-center items-center w-full text-[16px] font-bold leading-[22px] ${
          isSelectedEnough
            ? 'bg-[#5938DB] text-white'
            : 'bg-[#F1F1F2] text-[var(--Gray400)]'
        } rounded-[10px] disabled:cursor-not-allowed disabled:opacity-50`}
      >
        다음
      </button>
    </motion.div>
  );
}
