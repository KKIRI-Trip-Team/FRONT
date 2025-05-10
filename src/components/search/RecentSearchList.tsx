'use client';

import SearchIcon from '@/public/icons/search-icon.svg';
import DeleteIcon from '@/public/icons/search-delete-icon.svg';

export default function RecentSearchList() {
  return (
    <>
      <section className="flex pc:w-[1200px] tb:w-[768px] p-[20px] items-center gap-[10px] border-b-[1px] border-b-[var(--Gray200)] self-stretch">
        <span className="text-center text-[var(--Gray600)] text-[14px] font-bold leading-[20px] tracking-[-0.5px]">
          최근 검색
        </span>
      </section>

      <section className="flex flex-col items-start">
        <div className="flex px-[20px] py-[10px] justify-between items-center self-stretch">
          <div className="flex items-center gap-[2px] text-[var(--Gray900)]">
            <div className="w-[24px] h-[24px]">
              <SearchIcon />
            </div>

            <span className="text-[14px] font-normal leading-[20px] tracking-[-0.5px]">
              제주도
            </span>
          </div>

          <button>
            <DeleteIcon />
          </button>
        </div>

        <div className="flex px-[20px] py-[10px] justify-between items-center self-stretch">
          <div className="flex items-center gap-[2px] text-[var(--Gray900)]">
            <div className="w-[24px] h-[24px]">
              <SearchIcon />
            </div>

            <span className="text-[14px] font-normal leading-[20px] tracking-[-0.5px]">
              부산
            </span>
          </div>

          <button>
            <DeleteIcon />
          </button>
        </div>

        <div className="flex px-[20px] py-[10px] justify-between items-center self-stretch">
          <div className="flex items-center gap-[2px] text-[var(--Gray900)]">
            <div className="w-[24px] h-[24px]">
              <SearchIcon />
            </div>

            <span className="text-[14px] font-normal leading-[20px] tracking-[-0.5px]">
              혼자 여행
            </span>
          </div>

          <button>
            <DeleteIcon />
          </button>
        </div>
      </section>
    </>
  );
}
