import MobileDayList from './MobileSidebar/MobileDayList';
import MobileScheduleList from './MobileSidebar/MobileScheduleList';

export default function MobileSidebar() {
  return (
    <div className="relative flex w-[375px] p-[20px] justify-center items-center gap-[12px] bg-[var(--Gray100)]">
      {/* Days 리스트: 상단에 위치 */}
      <div className="absolute left-1/2 -translate-x-1/2 -translate-y-12 top-[-30px] z-10">
        <MobileDayList />
      </div>

      <MobileScheduleList />
    </div>
  );
}
