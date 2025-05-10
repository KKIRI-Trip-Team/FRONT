import VTripDetailDaysList from './vTripDetailNavVar/VTripDetailDaysList';
import VTripDetailScheduleList from './vTripDetailNavVar/VTripDetailScheduleList';
import VTripDetailText from './vTripDetailNavVar/VTripDetailText';

export default function VTripNavVar() {
  return (
    <div className="flex flex-col gap-[12px] w-[310px] h-[814px] px-[0px] py-[20px] items-center shrink-0 rounded-[20px] bg-[var(--white)] shadow-[0px_0px_10px_0px_rgba(0,0,0,0.10)] font-[Pretendard]">
      <VTripDetailDaysList />

      {/* <VTripDetailText /> */}

      <VTripDetailScheduleList />
    </div>
  );
}
