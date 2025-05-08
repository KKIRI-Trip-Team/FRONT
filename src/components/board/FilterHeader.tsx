import FilterIcon from '@/public/icons/filter-icons.svg';

export default function FilterHeader() {
  return (
    <section className="flex w-[1200px] max-w-[1200px] p-[20px] flex-col items-start gap-[10px] cursor-pointer font-[Pretendard]">
      <div className="flex px-[8px] py-[4px] justify-center items-center gap-[4px] rounded-[4px] bg-[var(--Gray100)]">
        <div className="w-[20px] h-[20px] aspect-1/1">
          <FilterIcon />
        </div>
        <div className="text-[12px] font-bold leading-[18px] tracking-[-0.5px] text-[var(--Gray900)]">
          필터
        </div>
      </div>
    </section>
  );
}
