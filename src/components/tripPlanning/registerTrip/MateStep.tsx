'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

import { useTripFunnelStore } from '@/store/useTripFunnelStore';
import { BoardRegisterTypes } from '@/types/boardRegister';
import { UseFunnelResults } from '@use-funnel/browser';
import { slideFadeVariants } from '@/utils/motionVariants';
import { useTransitionStore } from '@/store/transitionStore';

const genders = [
  { id: 1, name: '👩 여성' },
  { id: 2, name: '👱‍♂️ 남성' },
  { id: 3, name: '상관없음' },
];

const ages = [
  { id: 1, name: '20대' },
  { id: 2, name: '30대' },
  { id: 3, name: '40대' },
  { id: 4, name: '50대' },
  { id: 5, name: '상관없음' },
];

interface MateFunnel {
  funnel: UseFunnelResults<BoardRegisterTypes, BoardRegisterTypes['mateStep']>;
}

export default function MateStep({ funnel }: MateFunnel) {
  const { stepIndex, trip, setContext, setStepIndex } = useTripFunnelStore();
  const { direction } = useTransitionStore();
  const [selectedGender, setSelectedGender] = useState('');
  const [selectedAges, setSelectedAges] = useState<string[]>([]);

  useEffect(() => {
    setStepIndex(3);
    if (trip.gender) setSelectedGender(trip.gender);
    if (trip.ageRange?.length > 0) setSelectedAges(trip.ageRange);
  }, [trip.gender, trip.ageRange]);

  const toggleGender = (gender: string) => {
    setSelectedGender((prev) => (prev === gender ? '' : gender));
  };

  const toggleAge = (age: string) => {
    setSelectedAges((prev) =>
      prev.includes(age) ? prev.filter((a) => a !== age) : [...prev, age],
    );
  };

  const isSelected = selectedGender !== '' && selectedAges.length > 0;

  const getSelectedStyle = (active: boolean) =>
    active
      ? 'outline outline-[0.8px] outline-[var(--PrimaryLight)] bg-[rgba(0,133,255,0.1)]'
      : 'bg-[#F8F8F8]';

  const handleNext = () => {
    const nextContext = {
      ...trip,
      gender: selectedGender,
      ageRange: selectedAges,
    };
    setContext({ gender: selectedGender, ageRange: selectedAges });
    funnel.history.push('styleStep', nextContext);
  };

  return (
    <motion.div
      key="mateStep"
      custom={direction}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={slideFadeVariants}
      className="flex flex-col items-center pc:w-[1200px] tb:w-[768px] h-[854px] p-[20px] gap-[40px] bg-white shrink-0 font-[Pretendard] tracking-[-0.5px]"
    >
      <div className="flex flex-col items-center self-stretch">
        <div className="flex items-center gap-[3px] text-[var(--PrimaryLight)] text-[10px] font-bold leading-[16px] tracking-[-0.5px] text-center">
          <span>{stepIndex}</span>
          <span className="text-[rgba(0,133,255,0.5)]">/</span>
          <span className="text-[rgba(0,133,255,0.5)]">6</span>
        </div>
        <h1 className="text-[var(--Gray900)] text-[20px] font-bold text-center leading-[30px]">
          누구랑 떠나시겠어요?
        </h1>
        <span className="text-[var(--Gray600)] text-[14px] text-center leading-[20px]">
          함께 여행을 즐길 메이트를 설정해주세요
        </span>
      </div>

      <div className="flex flex-col items-start gap-[60px] flex-[1_0_0] self-stretch">
        {/* 성별 선택 */}
        <section className="flex flex-col gap-[20px]">
          <h1 className="text-[20px] font-bold">성별</h1>
          <div className="flex gap-[16px] flex-wrap">
            {genders.map((gender) => (
              <button
                key={gender.id}
                onClick={() => toggleGender(gender.name)}
                className={`px-[16px] py-[8px] rounded-[100px] ${getSelectedStyle(
                  selectedGender === gender.name,
                )}`}
              >
                <span className="text-[14px] font-bold text-[var(--Gray900)]">
                  {gender.name}
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* 연령대 선택 */}
        <section className="flex flex-col gap-[20px] self-stretch">
          <div className="flex items-center gap-[10px]">
            <h1 className="text-[16px] font-bold text-[var(--Gray900)]">
              연령대
            </h1>
            <h3 className="text-[12px] text-[var(--Gray600)] font-bold">
              중복 선택 가능
            </h3>
          </div>

          <div className="flex flex-wrap gap-[16px]">
            {ages.map((age) => (
              <div
                key={age.id}
                onClick={() => toggleAge(age.name)}
                className={`px-[16px] py-[8px] rounded-[100px] cursor-pointer ${getSelectedStyle(
                  selectedAges.includes(age.name),
                )}`}
              >
                <label className="text-[14px] font-bold text-[var(--Gray900)]">
                  {age.name}
                </label>
              </div>
            ))}
          </div>
        </section>
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
