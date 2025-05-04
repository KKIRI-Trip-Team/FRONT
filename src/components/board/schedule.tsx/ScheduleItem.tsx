export default function ScheduleItem() {
  return (
    <div className="font-[Pretendard] flex h-[86px] p-[20px] items-start gap-[10px] self-stretch rounded-[12px] bg-[var(--white)] shadow-[0px_0px_10px_0px_rgba(0,0,0,0.10)]">
      <div className="flex w-[24px] h-[24px] flex-col justify-center items-center gap-[10px] aspect-1/1 rounded-[100px] bg-[var(--PrimaryLight)]">
        <h1 className="text-center text-[16px] font-bold leading-[22px] tracking-[-0.5px] text-[var(--white)]">
          1
        </h1>
      </div>

      <div className="flex flex-col items-start flex-[1_0_0] tracking-[-0.5px]">
        <h1 className="text-center text-[18px] font-bold leading-[26px] ">
          랜드마크
        </h1>
        <h2 className="text-[16px] font-normal leading-[22px] self-stretch text-[var(--Gray600)]">
          주소
        </h2>
      </div>
    </div>
  );
}
