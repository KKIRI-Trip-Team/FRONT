'use client';

import NoScheduleItemText from '../text/NoScheduleItemText';
import MakeScheduleItemButton from '../button/MakeScheduleItemButton';

import ScheduleCard from '../scheduleCard/ScheduleCard';
import { useTripFunnelStore } from '@/store/tripFunnelStore';

export default function TabletScheduleList() {
  const daysPlan = useTripFunnelStore((s) => s.daysPlan);
  const currentDay = useTripFunnelStore((s) => s.currentDay);
  const schedule = daysPlan.find((d) => d.day === currentDay)?.places || [];

  return (
    <>
      {schedule.length === 0 ? (
        <NoScheduleItemText />
      ) : (
        <div className="w-full flex overflow-x-scroll gap-[12px]">
          <ScheduleCard />
        </div>
      )}

      <MakeScheduleItemButton />
    </>
  );
}
