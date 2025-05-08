import NoSearchDataIcon from '@/public/icons/no-search-data-icon.svg';
import BoardCard from '../board/boardCard/BoardCard';

import { mockData } from '@/mock/mockData';

export default function SearchResultList({ q }: { q?: string }) {
  const filteredData = mockData.filter((item) =>
    item.destination.includes(q || ''),
  );

  return (
    <>
      <section className="flex p-[20px] items-center gap-[10px] flex-[1_0_0]">
        <span className="text-[var(--Gray600)] text-center font-[Pretendard] text-[14px] font-bold leading-[20px] tracking-[-0.5px]">{`${q} (${filteredData.length})`}</span>
      </section>

      {filteredData.length > 0 ? (
        <section className="flex px-[20px] h-[768px] items-start content-start gap-[20px] flex-[1_0_0] flex-wrap">
          {filteredData.map((item) => (
            <BoardCard key={item.id} {...item} />
          ))}
        </section>
      ) : (
        <section className="flex py-[100px] h-[768px] flex-col items-center gap-[10px] shrink-0 self-stretch bg-[var(--white)] font-[Pretendard]">
          <NoSearchDataIcon />
          <span className="text-[var(--Gray600)] text-center text-[14px] font-normal leading-[20px] tracking-[-0.5px]">
            검색 결과가 없습니다.
          </span>
        </section>
      )}
    </>
  );
}
