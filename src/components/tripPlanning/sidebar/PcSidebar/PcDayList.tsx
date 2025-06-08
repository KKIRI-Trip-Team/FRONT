'use client';

import DayListButton from '../button/DayListButton';

export default function PcDayList() {
  return (
    <section className="flex px-[20px] py-[16px] items-center gap-[10px] self-stretch overflow-x-scroll">
      <DayListButton />
    </section>
  );
}
