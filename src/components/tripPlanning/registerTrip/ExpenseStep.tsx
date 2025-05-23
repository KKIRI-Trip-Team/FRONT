'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

import { useTripFunnelStore } from '@/store/useTripFunnelStore';

import { UseFunnelResults } from '@use-funnel/browser';
import { slideFadeVariants } from '@/utils/motionVariants';
import { useTransitionStore } from '@/store/transitionStore';
import { BoardRegisterSteps } from '@/types/boardRegister';

interface ExpenseFunnel {
  funnel: UseFunnelResults<
    BoardRegisterSteps,
    BoardRegisterSteps['expenseStep']
  >;
}

export default function ExpenseStep({ funnel }: ExpenseFunnel) {
  const { stepIndex, trip, setContext, setStepIndex } = useTripFunnelStore();
  const { direction } = useTransitionStore();

  const [moneyValid, setMoneyValid] = useState('');
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    setStepIndex(5);
    if (trip.expense) {
      setMoneyValid(trip.expense.toLocaleString());
      setIsValid(true);
    }
  }, []);

  const rawInput = moneyValid.replaceAll(',', '');
  const parsedValue = rawInput ? parseInt(rawInput, 10) : 0;

  const isValidMoney =
    !isNaN(parsedValue) && parsedValue >= 5000 && parsedValue <= 100000000;

  const onChangeMoney = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.replace(/[^0-9]/g, '');
    setMoneyValid(Number(input).toLocaleString());
    setIsValid(true);
  };

  const handleNextClick = () => {
    if (!isValidMoney) return;

    const nextContext = { ...trip, expense: parsedValue };
    setContext({ expense: parsedValue });
    funnel.history.push('explainStep', nextContext);
  };

  return (
    <motion.div
      key="expenseStep"
      custom={direction}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={slideFadeVariants}
      className="flex flex-col items-center pc:w-[1200px] tb:w-[768px] h-[854px] p-[20px] gap-[40px] bg-white font-[Pretendard] not-italic tracking-[-0.5px]"
    >
      <div className="flex flex-col items-center self-stretch">
        <div className="flex items-center gap-[3px] text-[var(--PrimaryLight)] text-[10px] font-bold leading-[16px] tracking-[-0.5px] text-center">
          <span>{stepIndex}</span>
          <span className="text-[rgba(0,133,255,0.5)]">/</span>
          <span className="text-[rgba(0,133,255,0.5)]">6</span>
        </div>
        <h1 className="text-[var(--Gray900)] text-[20px] font-bold text-center leading-[30px]">
          비용은 얼마인가요?
        </h1>
        <span className="text-[var(--Gray600)] text-[14px] text-center font-normal leading-[20px]">
          여행 예상 비용을 입력해주세요
        </span>
      </div>

      <div className="flex flex-col items-start gap-[4px] flex-1 w-full">
        <div
          className={`flex justify-between items-center w-full border-b-[0.6px] ${
            !isValid
              ? 'border-b-[var(--Gray400)]'
              : isValidMoney
                ? 'border-b-[var(--green)]'
                : 'border-b-[var(--red)]'
          }`}
        >
          <input
            type="text"
            placeholder="예상 비용"
            value={moneyValid}
            onChange={onChangeMoney}
            maxLength={12}
            className="flex-1 h-[48px] outline-none text-black placeholder:text-[24px] font-normal leading-[34px] tracking-[-0.5px] text-[var(--Gray400)]"
          />
          <span className="ml-2 text-[24px] font-normal leading-[34px] tracking-[-0.5px] text-[var(--Gray900)]">
            원
          </span>
        </div>

        <p
          className={`text-[12px] font-normal leading-[18px] ${
            !isValid
              ? 'text-[var(--Gray500)]'
              : isValidMoney
                ? 'text-[var(--green)]'
                : 'text-[var(--red)]'
          }`}
        >
          {isValidMoney
            ? ''
            : '최소 5,000원 ~ 최대 100,000,000원까지 입력이 가능합니다'}
        </p>
      </div>

      <button
        className={`flex h-[54px] py-[16px] justify-center items-center self-stretch w-full text-[16px] font-bold leading-[22px] text-center ${
          isValidMoney ? 'text-[var(--white)]' : 'text-[var(--Gray400)]'
        } ${isValidMoney ? 'bg-[#5938DB] cursor-pointer' : 'bg-[#F1F1F2]'}`}
        onClick={handleNextClick}
      >
        다음
      </button>
    </motion.div>
  );
}
