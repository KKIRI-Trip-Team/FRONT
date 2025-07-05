import FilterIcon from '@/public/icons/filter-icons.svg';

export default function FilterHeader() {
  // 이 컴포넌트는 필터 헤더를 렌더링합니다.
  // 현재는 필터 버튼만 포함되어 있으며, 추후 필터 기능을 추가 예정

  const handleFilterClick = () => {
    console.log('필터 버튼 클릭!!');
  };

  return (
    <section className="flex max-w-[1200px] p-[20px] flex-col items-start gap-[10px] font-[Pretendard]">
      <button
        onClick={handleFilterClick}
        className="flex px-[8px] py-[4px] justify-center items-center gap-[4px] rounded-[4px] bg-[var(--Gray100)] cursor-pointer"
      >
        <div className="w-[20px] h-[20px] aspect-1/1">
          <FilterIcon />
        </div>
        <span className="text-[12px] font-bold leading-[18px] tracking-[-0.5px] text-[var(--Gray900)]">
          필터
        </span>
      </button>
    </section>
  );
}
