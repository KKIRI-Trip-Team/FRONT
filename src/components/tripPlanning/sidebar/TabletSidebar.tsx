import TabletDayList from './TabletSidebar/TabletDayList';
import TabletScheduleList from './TabletSidebar/TabletScheduleList';

// Tablet 버젼 사이드바
export default function TabelSidebar() {
  return (
    <div className="relative flex w-[768px] p-[20px] justify-center items-center gap-[12px] bg-[var(--Gray100)]">
      {/* Days 리스트: 상단에 위치 */}
      <div className="absolute left-1/2 -translate-x-1/2 -translate-y-12 top-[-30px] z-10">
        <TabletDayList />
      </div>

      <TabletScheduleList />
    </div>
  );
}
