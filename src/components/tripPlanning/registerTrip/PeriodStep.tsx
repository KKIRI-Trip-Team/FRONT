import { useTripFunnelStore } from '@/store/useTripFunnelStore';
import { BoardRegisterTypes } from '@/types/boardRegister';

import { useFunnel, UseFunnelResults } from '@use-funnel/browser';
import { useEffect, useState } from 'react';

const periods = [
  { id: 1, name: '아무때나' },
  { id: 2, name: '당일치기' },
  { id: 3, name: '1박 2일' },
  { id: 4, name: '2박 3일' },
  { id: 5, name: '3박 4일' },
  { id: 6, name: '4발 5일' },
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
  const { context, setContext } = useTripFunnelStore();
  const [selectedPeriod, setSelectedPeriod] = useState('');

  useEffect(() => {
    if (context.period) {
      setSelectedPeriod(context.period);
      setContext({ period: context.period });
    }
  }, [context.period]);

  const handlePeriodToggle = (period: string) => {
    if (period === selectedPeriod) {
      setSelectedPeriod('');
    } else {
      setSelectedPeriod(period);
    }
  };

  const isSelected = selectedPeriod !== '';

  return (
    <div className="flex flex-col items-center w-[1200px] h-[854px] pb-[40px] pl-[20px] pr-[20px] pt-[20px]  gap-[40px] bg-[var(--white)]  shrink-0 font-[Pretendard] not-italic tracking-[-0.5px]">
      <div className="flex flex-col items-center self-stretch">
        <span>2 / 6</span>
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
            onClick={() => handlePeriodToggle(period.name)}
            className={`w-[80px] h-[60px] rounded-[10px] flex flex-col items-center justify-center transition text-center text-[14px] font-bold leading-[20px]
         ${
           selectedPeriod === period.name
             ? 'border-[0.8px] border-[#0085FF] bg-[rgba(0,133,255,0.1)]'
             : 'bg-[#F8F8F8]'
         }`}
          >
            {period.name}
          </button>
        ))}
      </div>
      <div
        className={`flex h-[54px] w-full items-center justify-center bg-[#5938DB] ${isSelected ? 'bg-[#5938DB] cursor-pointer' : 'bg-[#F1F1F2]'}`}
      >
        <button
          // disabled={!isSelected}
          className={`text-center w-full text-[16px] font-bold leading-[22px] ${isSelected ? 'text-[var(--white)]' : 'text-[var(--Gray400)]'}`}
          onClick={() => {
            setContext({ period: selectedPeriod });
            funnel.history.push('mateStep', {
              ...context,
              period: selectedPeriod,
            });
          }}
        >
          다음
        </button>
      </div>
    </div>
  );
}
