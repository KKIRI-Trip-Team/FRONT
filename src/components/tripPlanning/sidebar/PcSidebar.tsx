import PcDayList from './PcSidebar/PcDayList';
import PcScheduleList from './PcSidebar/PcScheduleList';

// PC버전 사이드바
export default function PcSidebar() {
  return (
    <div className="flex flex-col gap-[12px] w-[310px] h-[814px] px-[0px] py-[20px] items-center shrink-0 rounded-[20px] bg-[var(--white)] shadow-[0px_0px_10px_0px_rgba(0,0,0,0.10)] font-[Pretendard]">
      <PcDayList />

      <PcScheduleList />
    </div>
  );
}
