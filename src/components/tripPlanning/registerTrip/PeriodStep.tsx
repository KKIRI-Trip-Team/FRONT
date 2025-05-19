'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

import { useTripFunnelStore } from '@/store/useTripFunnelStore';
import { BoardRegisterTypes } from '@/types/boardRegister';
import { UseFunnelResults } from '@use-funnel/browser';
import { slideFadeVariants } from '@/utils/motionVariants';
import { useTransitionStore } from '@/store/transitionStore';

const periods = [
  { id: 1, name: '아무때나' },
  { id: 2, name: '당일치기' },
  { id: 3, name: '1박 2일' },
  { id: 4, name: '2박 3일' },
  { id: 5, name: '3박 4일' },
  { id: 6, name: '4박 5일' },
  { id: 7, name: '5박 6일' },
  { id: 8, name: '7일 이상' },
];

interface PeriodFunnel {
  funnel: UseFunnelResults<
    BoardRegisterTypes,
    BoardRegisterTypes['periodStep']
  >;
}

export default function PeriodStep({ funnel }: PeriodFunnel) {
  const { stepIndex, context, setContext, setStepIndex } = useTripFunnelStore();
  const { direction } = useTransitionStore();
  const [selectedPeriod, setSelectedPeriod] = useState('');
  const [periodId, setPeriodId] = useState<number | null>(null);

  useEffect(() => {
    setStepIndex(2);
    if (context.period) {
      setSelectedPeriod(context.period);
    }
  }, [context.period]);

  const handlePeriodToggle = (period: string, id: number) => {
    if (selectedPeriod === period) {
      setSelectedPeriod('');
      setPeriodId(null);
    } else {
      setSelectedPeriod(period);
      setPeriodId(id);
    }
  };

  const isSelected = selectedPeriod !== '';

  const getButtonStyle = (isActive: boolean) =>
    isActive
      ? 'border-[0.8px] border-[#0085FF] bg-[rgba(0,133,255,0.1)]'
      : 'bg-[#F8F8F8]';

  const handleNext = () => {
    const nextContext = { ...context, period: selectedPeriod };
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
        {periods.map((period) => (
          <button
            key={period.id}
            onClick={() => handlePeriodToggle(period.name, period.id)}
            className={`w-[80px] h-[60px] rounded-[10px] flex flex-col items-center justify-center transition text-center text-[14px] font-bold leading-[20px] ${getButtonStyle(selectedPeriod === period.name)}`}
          >
            {period.name}
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
