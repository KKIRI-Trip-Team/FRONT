import DayListButton from '../button/DayListButton';

export default function MobileDayList() {
  return (
    <section className="flex w-[375px] overflow-x-scroll px-[20px] py-[16px] items-center gap-[10px]">
      <DayListButton />
    </section>
  );
}
