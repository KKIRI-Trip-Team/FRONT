export default function HTripDetailDaysList() {
  return (
    <section className="flex w-[768px] px-[20px] py-[16px] items-center gap-[10px]">
      {/* 버튼 컴포넌트 화 예정 */}
      <div className="flex w-[60px] h-[40px] flex-col justify-center items-center gap-[6px] rounded-[10px] bg-[var(--white)] shadow-[0px_0px_10px_0px_rgba(0,0,0,0.10)] cursor-pointer">
        <span className="text-[12px] font-bold leading-[18px] tracking-[-0.5px] text-[var(--Gray900)]">
          DAY1
        </span>
      </div>

      <div className="flex w-[60px] h-[40px] flex-col justify-center items-center gap-[6px] rounded-[10px] bg-[var(--white)] shadow-[0px_0px_10px_0px_rgba(0,0,0,0.10)] cursor-pointer">
        <span className="text-[12px] font-bold leading-[18px] tracking-[-0.5px] text-[var(--Gray900)]">
          DAY2
        </span>
      </div>

      <div className="flex w-[60px] h-[40px] flex-col justify-center items-center gap-[6px] rounded-[10px] bg-[var(--white)] shadow-[0px_0px_10px_0px_rgba(0,0,0,0.10)] cursor-pointer">
        <span className="text-[12px] font-bold leading-[18px] tracking-[-0.5px] text-[var(--Gray900)]">
          DAY3
        </span>
      </div>

      <div className="flex w-[60px] h-[40px] flex-col justify-center items-center gap-[6px] rounded-[10px] bg-[var(--white)] shadow-[0px_0px_10px_0px_rgba(0,0,0,0.10)] cursor-pointer">
        <span className="text-[12px] font-bold leading-[18px] tracking-[-0.5px] text-[var(--Gray900)]">
          DAY4
        </span>
      </div>
    </section>
  );
}
