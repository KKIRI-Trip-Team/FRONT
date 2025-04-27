import { useFunnel } from '@use-funnel/browser';
import { useState } from 'react';

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

export default function PeriodStep({
  funnel,
}: {
  funnel: ReturnType<typeof useFunnel>;
}) {
  const [selectedPeriod, setSelectedPeriod] = useState<string | undefined>('');
  const handlePeriod = (period: string) => {
    setSelectedPeriod(period);
    console.log(`${period}`);
  };

  const isSelected = selectedPeriod !== '';

  return (
    <div className="flex flex-col items-center w-[1200px] h-[854px] p-[20px] pb-[20px]  gap-[40px] shrink-0">
      <div className="flex flex-col items-center self-stretch">
        <span>2 / 6</span>
        <h1 className="text-gray-900 text-center text-xl font-normal leading-[30px] tracking-[-0.5px]">
          얼마나 떠나시나요?
        </h1>
        <span className="text-gray-600 text-center text-sm font-normal leading-[20px] tracking-[-0.5px]">
          여행 기간을 선택해주세요
        </span>
      </div>
      <div className="flex justify-center items-start content-start flex-wrap gap-x-[18px] gap-y-[16px] flex-[1_0_0] self-stretch">
        {periods.map((period) => (
          <button
            key={period.id}
            onClick={() => handlePeriod(period.name)}
            className={`w-[80px] h-[60px] rounded-[10px] flex flex-col items-center justify-center transition
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
      <div className="flex h-[54px] w-full items-center justify-center bg-[#5938DB]">
        <button
          disabled={!isSelected}
          className={`text-white text-center text-base font-bold leading-[22px] tracking-[-0.5px] ${isSelected ? 'bg-[#5938DB] cursor-pointer' : 'bg-[#F1F1F2] cursor-not-allowed'}`}
          onClick={() => funnel.history.push('period', {})}
        >
          다음
        </button>
      </div>
    </div>
  );
}
