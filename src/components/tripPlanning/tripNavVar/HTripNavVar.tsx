import HTripDetailDaysList from './hTripDetailNavVar/HTripDetailDaysList';
import HTripDetailMakeButton from './hTripDetailNavVar/HTripDetailMakeButton';
import HTripScheduleList from './hTripDetailNavVar/HTripDetailScheduleList';
import HTripDetailText from './hTripDetailNavVar/HTripDetailText';

export default function HTripNavVar() {
  return (
    <div className="relative flex w-[768px] p-[20px] justify-center items-center gap-[12px] bg-[var(--Gray100)]">
      {/* Days 리스트: 상단에 절대 위치 */}
      <div className="absolute left-1/2 -translate-x-1/2 -translate-y-12 top-[-30px] z-10">
        <HTripDetailDaysList />
      </div>

      {/* <HTripDetailText /> */}
      <HTripScheduleList />
      <HTripDetailMakeButton />
    </div>
  );
}
