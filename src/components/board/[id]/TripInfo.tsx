import Image from 'next/image';
import ScheduleItem from '../schedule.tsx/ScheduleItem';

export default function TripInfo() {
  return (
    <section className="flex flex-col items-start gap-[20px] pt-[20px] self-stretch font-[Pretendard] bg-[var(--white)]">
      {/* 일정 */}
      <div className="flex px-[20px] py-[0px] items-center">
        <div className="flex w-[62px] h-[40px] ">
          <h1 className="text-[28px] font-bold leading-[40px] tracking-[-0.5px] text-[var(--Gray900)]">
            Day
          </h1>
          <h1 className="text-[28px] font-bold leading-[40px] tracking-[-0.5px] text-[var(--Gray900)]">
            1
          </h1>
        </div>
      </div>

      {/* 지역사진 */}
      <div className="w-[1200px] h-[750px] shrink-0 bg-detail-image"></div>

      {/* 스케쥴 리스트 */}
      <div className="w-full flex px-[20px] py-[0px] flex-col justify-center items-start gap-[30px]">
        <ScheduleItem />
        <ScheduleItem />
        <ScheduleItem />
        <ScheduleItem />
        <ScheduleItem />
      </div>
    </section>
  );
}
