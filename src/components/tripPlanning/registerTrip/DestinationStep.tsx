'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

import { UseFunnelResults } from '@use-funnel/browser';

import { slideFadeVariants } from '@/utils/motionVariants';
import { useTransitionStore } from '@/store/transitionStore';
import { BoardRegisterSteps } from '@/types/boardFunnel';
import { cityMap } from '@/types/board';
import { useTripFunnelStore } from '@/store/tripFunnelStore';

interface DestinationFunnel {
  funnel: UseFunnelResults<
    BoardRegisterSteps,
    BoardRegisterSteps['destinationStep']
  >;
}

export default function DestinationStep({ funnel }: DestinationFunnel) {
  const { stepIndex, trip, setContext, setStepIndex } = useTripFunnelStore();
  const { direction } = useTransitionStore();
  const [selectedCity, setSelectedCity] = useState('');

  useEffect(() => {
    setStepIndex(1);
    if (trip.region) {
      setSelectedCity(trip.region);
    }
  }, [trip.region]);

  const handleCityToggle = (value: string) => {
    setSelectedCity((prev) => (prev === value ? '' : value));
  };

  const isSelected = selectedCity !== '';

  const getCityButtonStyle = (isActive: boolean) =>
    isActive
      ? 'border-[0.8px] border-[#0085FF] bg-[rgba(0,133,255,0.1)]'
      : 'bg-[#F8F8F8]';

  const handleNext = () => {
    const nextContext = { ...trip, region: selectedCity };
    setContext({ region: selectedCity });
    funnel.history.push('periodStep', nextContext);
  };

  return (
    <motion.div
      key="destinationStep"
      custom={direction}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={slideFadeVariants}
      className="flex flex-col items-center pc:w-[1200px] tb:w-[768px] h-[854px] pb-[40px] pl-[20px] pr-[20px] pt-[20px] gap-[40px] bg-white shrink-0 font-[Pretendard] not-italic tracking-[-0.5px]"
    >
      <div className="flex flex-col items-center self-stretch">
        <div className="flex items-center gap-[3px] text-[var(--PrimaryLight)] text-[10px] font-bold leading-[16px] tracking-[-0.5px] text-center">
          <span>{stepIndex}</span>
          <span className="text-[rgba(0,133,255,0.5)]">/</span>
          <span className="text-[rgba(0,133,255,0.5)]">6</span>
        </div>
        <h1 className="text-[var(--Gray900)] text-[20px] font-bold text-center leading-[30px]">
          어디로 떠나시나요?
        </h1>
        <span className="text-[var(--Gray600)] text-[14px] text-center font-normal leading-[20px]">
          떠나고 싶은 도시를 선택해주세요
        </span>
      </div>

      <div className="flex items-start content-start flex-wrap gap-x-[18px] gap-y-[16px] flex-[1_0_0] self-stretch">
        {Object.entries(cityMap).map(([value, { name, emoji }]) => (
          <button
            key={`${value}-${name}`}
            onClick={() => handleCityToggle(value)}
            className={`w-[80px] h-[80px] rounded-[10px] flex flex-col items-center justify-center ${getCityButtonStyle(
              selectedCity === value,
            )}`}
          >
            <span className="text-[16px] font-bold leading-[22px]">
              {emoji}
            </span>
            <div className="text-[14px] font-bold leading-[20px]">{name}</div>
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
