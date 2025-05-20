'use client';

import NoScheduleItemText from '../text/NoScheduleItemText';
import MakeScheduleItemButton from '../button/MakeScheduleItemButton';

import { useTripFunnelStore } from '@/store/useTripFunnelStore';
import ScheduleCard from '../scheduleCard/ScheduleCard';

export default function PcScheduleList() {
  const daysPlan = useTripFunnelStore((s) => s.daysPlan);
  const currentDay = useTripFunnelStore((s) => s.currentDay);
  const schedule = daysPlan.find((d) => d.day === currentDay)?.places || [];

  return (
    <>
      {schedule.length === 0 ? (
        <NoScheduleItemText />
      ) : (
        <div className="w-full flex flex-col  gap-[12px] px-[20px] py-[0px] items-center overflow-y-scroll ">
          <ScheduleCard />
        </div>
      )}

      <MakeScheduleItemButton />
    </>
  );
}
