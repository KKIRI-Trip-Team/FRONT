'use client';

import { useTripFunnelStore } from '@/store/tripFunnelStore';
import { periodMap } from '@/types/board';

export default function DayListButton() {
  const { trip } = useTripFunnelStore();

  const periodInfo = trip.period;
  const daysName = periodMap[periodInfo]?.name;
  const daysMatch = daysName?.match(/^\d+/);
  const days = daysMatch ? parseInt(daysMatch[0], 10) : 1;

  const currentDay = useTripFunnelStore((s) => s.currentDay);
  const setCurrentDay = useTripFunnelStore((s) => s.setCurrentDay);

  return (
    <div className="flex gap-[12px]">
      {Array.from({ length: days }).map((_, idx) => (
        <div
          key={idx}
          onClick={() => setCurrentDay(idx + 1)}
          className={`flex w-[60px] h-[40px] justify-center items-center ${currentDay === idx + 1 ? 'bg-[var(--PrimaryLight)] text-white' : 'bg-[var(--white)]'} rounded-[10px] shadow-[0px_0px_10px_0px_rgba(0,0,0,0.10)] cursor-pointer`}
        >
          <span className="text-[12px] font-bold leading-[18px] tracking-[-0.5px]">
            DAY{idx + 1}
          </span>
        </div>
      ))}
    </div>
  );
}
