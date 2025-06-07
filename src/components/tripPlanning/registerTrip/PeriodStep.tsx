'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

import { UseFunnelResults } from '@use-funnel/browser';
import { slideFadeVariants } from '@/utils/motionVariants';
import { useTransitionStore } from '@/store/transitionStore';
import { BoardRegisterSteps } from '@/types/boardFunnel';
import { periodMap } from '@/types/board';
import { useTripFunnelStore } from '@/store/tripFunnelStore';

interface PeriodFunnel {
  funnel: UseFunnelResults<
    BoardRegisterSteps,
    BoardRegisterSteps['periodStep']
  >;
}

export default function PeriodStep({ funnel }: PeriodFunnel) {
  const { stepIndex, trip, setContext, setStepIndex } = useTripFunnelStore();
  const { direction } = useTransitionStore();
  const [selectedPeriod, setSelectedPeriod] = useState('');

  useEffect(() => {
    setStepIndex(2);
    if (trip.period) {
      setSelectedPeriod(trip.period);
    }
  }, [trip.period]);

  const handlePeriodToggle = (value: string) => {
    if (selectedPeriod === value) {
      setSelectedPeriod('');
    } else {
      setSelectedPeriod(value);
    }
  };

  const isSelected = selectedPeriod !== '';

  const getButtonStyle = (isActive: boolean) =>
    isActive
      ? 'border-[0.8px] border-[#0085FF] bg-[rgba(0,133,255,0.1)]'
      : 'bg-[#F8F8F8]';

  const handleNext = () => {
    const nextContext = { ...trip, period: selectedPeriod };
    setContext({ period: selectedPeriod });
    funnel.history.push('mateStep', nextContext);
  };

  return (
    <motion.div
      key="periodStep"
      custom={direction}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={slideFadeVariants}
      className="flex flex-col items-center pc:w-[1200px] tb:w-[768px] h-[854px] pb-[40px] pl-[20px] pr-[20px] pt-[20px] gap-[40px] bg-[var(--white)] shrink-0 font-[Pretendard] not-italic tracking-[-0.5px]"
    >
      <div className="flex flex-col items-center self-stretch">
        <div className="flex items-center gap-[3px] text-[var(--PrimaryLight)] text-[10px] font-bold leading-[16px] tracking-[-0.5px] text-center">
          <span>{stepIndex}</span>
          <span className="text-[rgba(0,133,255,0.5)]">/</span>
          <span className="text-[rgba(0,133,255,0.5)]">6</span>
        </div>
        <h1 className="text-[var(--Gray900)] text-[20px] font-bold text-center leading-[30px]">
          얼마나 떠나시나요?
        </h1>
        <span className="text-[var(--Gray600)] text-[14px] text-center font-normal leading-[20px]">
          여행 기간을 선택해주세요
        </span>
      </div>

      <div className="flex justify-center items-start content-start flex-wrap gap-x-[18px] gap-y-[16px] flex-[1_0_0] self-stretch">
        {Object.entries(periodMap).map(([value, { name }]) => (
          <button
            key={`${value}-${name}`}
            onClick={() => handlePeriodToggle(value)}
            className={`w-[80px] h-[60px] rounded-[10px] flex flex-col items-center justify-center transition text-center text-[14px] font-bold leading-[20px] ${getButtonStyle(selectedPeriod === value)}`}
          >
            {name}
          </button>
        ))}
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
