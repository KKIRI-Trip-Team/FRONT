import ArrowIcon from '@/public/icons/right-arrow-icon.svg';
import FindPlaceIcon from '@/public/icons/find-place-icon.svg';
import TrashIcon from '@/public/icons/trash-icon.svg';

export default function VTripDetailScheduleList() {
  return (
    <>
      {/* 일정 컴포넌트화 예정 */}
      <section className="flex w-[270px] h-[122px] flex-col justify-center items-center shrink-0 rounded-[16px] bg-[var(--white) shadow-[0px_0px_10px_0px_rgba(0,0,0,0.10)]">
        <div className="flex px-[12px] py-[20px] items-center self-stretch justify-between">
          <div className="flex w-[169px] h-[42px] items-start gap-[10px]">
            <div className="flex w-[24px] h-[24px] flex-col justify-center items-center gap-[10px] shrink-0 aspect-1/1 rounded-[100px] bg-[var(--PrimaryLight)]">
              <span className="text-[14px] font-bold leading-[20px] tracking-[-0.5px] text-[var(--white)] text-center">
                1
              </span>
            </div>

            <div className="flex flex-col items-start gap-[4px] flex-[1_0_0]">
              <span className="line-clamp-1 overflow-hidden text-ellipsis text-center text-[14px] font-bold leading-[20px] tracking-[-0.5px] text-[var(--Gray900)] font-[Pretendard]">
                랜드마크
              </span>

              <span className="line-clamp-1 self-stretch text-ellipsis text-[12px] font-normal leading-[18px] text-[var(--Gray600)]">
                주소
              </span>
            </div>
          </div>
          <div className="flex w-[30px] h-[30px] px-[0px] py-[4px] flex-col justify-center items-center gap-[10px] rounded-[100px] bg-[var(--white] shadow-[0px_0px_4px_0px_rgba(0,0,0,0.15)] cursor-pointer">
            <TrashIcon />
          </div>
        </div>
        <div className="flex h-[40px] items-center shrink-0 self-stretch">
          <div className="flex flex-col justify-center items-center gap-[10px] flex-[1_0_0] self-stretch border-t border-r border-t-[var(--Gray100)] border-r-[var(--Gray100)] ">
            <button className="w-[24px] h-[24px] aspect-1/1 rotate-[-180deg]">
              <ArrowIcon />
            </button>
          </div>

          <div className="flex flex-col justify-center items-center gap-[10px] flex-[1_0_0] self-stretch border-t border-t-[var(--Gray100)] ">
            <button className="w-[24px] h-[24px] aspect-1/1">
              <ArrowIcon />
            </button>
          </div>
        </div>
      </section>

      <section className="flex w-[270px] h-[122px] flex-col justify-center items-center shrink-0 rounded-[16px] bg-[var(--white) shadow-[0px_0px_10px_0px_rgba(0,0,0,0.10)]">
        <div className="flex px-[12px] py-[20px] items-center self-stretch justify-between">
          <div className="flex w-[169px] h-[42px] items-start gap-[10px]">
            <div className="flex w-[24px] h-[24px] flex-col justify-center items-center gap-[10px] shrink-0 aspect-1/1 rounded-[100px] bg-[var(--Secondary)]">
              <span className="text-[14px] font-bold leading-[20px] tracking-[-0.5px] text-[var(--white)] text-center">
                2
              </span>
            </div>

            <div className="flex flex-col items-start gap-[4px] flex-[1_0_0]">
              <span className="line-clamp-1 overflow-hidden text-ellipsis text-center text-[14px] font-bold leading-[20px] tracking-[-0.5px] text-[var(--Gray900)] font-[Pretendard]">
                랜드마크
              </span>

              <span className="line-clamp-1 self-stretch text-ellipsis text-[12px] font-normal leading-[18px] text-[var(--Gray600)]">
                주소
              </span>
            </div>
          </div>
          <div className="flex w-[30px] h-[30px] px-[0px] py-[4px] flex-col justify-center items-center gap-[10px] rounded-[100px] bg-[var(--white] shadow-[0px_0px_4px_0px_rgba(0,0,0,0.15)] cursor-pointer">
            <TrashIcon />
          </div>
        </div>
        <div className="flex h-[40px] items-center shrink-0 self-stretch">
          <div className="flex flex-col justify-center items-center gap-[10px] flex-[1_0_0] self-stretch border-t border-r border-t-[var(--Gray100)] border-r-[var(--Gray100)] ">
            <button className="w-[24px] h-[24px] aspect-1/1 rotate-[-90deg]">
              <ArrowIcon />
            </button>
          </div>

          <div className="flex flex-col justify-center items-center gap-[10px] flex-[1_0_0] self-stretch border-t border-t-[var(--Gray100)] ">
            <button className="w-[24px] h-[24px] aspect-1/1 rotate-[90deg]">
              <ArrowIcon />
            </button>
          </div>
        </div>
      </section>

      <section className="flex w-[270px] h-[122px] flex-col justify-center items-center shrink-0 rounded-[16px] bg-[var(--white) shadow-[0px_0px_10px_0px_rgba(0,0,0,0.10)]">
        <div className="flex px-[12px] py-[20px] items-center self-stretch justify-between">
          <div className="flex w-[169px] h-[42px] items-start gap-[10px]">
            <div className="flex w-[24px] h-[24px] flex-col justify-center items-center gap-[10px] shrink-0 aspect-1/1 rounded-[100px] bg-[var(--Tertiary)]">
              <span className="text-[14px] font-bold leading-[20px] tracking-[-0.5px] text-[var(--white)] text-center">
                3
              </span>
            </div>

            <div className="flex flex-col items-start gap-[4px] flex-[1_0_0]">
              <span className="line-clamp-1 overflow-hidden text-ellipsis text-center text-[14px] font-bold leading-[20px] tracking-[-0.5px] text-[var(--Gray900)] font-[Pretendard]">
                랜드마크
              </span>

              <span className="line-clamp-1 self-stretch text-ellipsis text-[12px] font-normal leading-[18px] text-[var(--Gray600)]">
                주소
              </span>
            </div>
          </div>
          <div className="flex w-[30px] h-[30px] px-[0px] py-[4px] flex-col justify-center items-center gap-[10px] rounded-[100px] bg-[var(--white] shadow-[0px_0px_4px_0px_rgba(0,0,0,0.15)] cursor-pointer">
            <TrashIcon />
          </div>
        </div>

        <div className="flex h-[40px] items-center shrink-0 self-stretch">
          <div className="flex flex-col justify-center items-center gap-[10px] flex-[1_0_0] self-stretch border-t border-r border-t-[var(--Gray100)] border-r-[var(--Gray100)] ">
            <button className="w-[24px] h-[24px] aspect-1/1 rotate-[-90deg]">
              <ArrowIcon />
            </button>
          </div>

          <div className="flex flex-col justify-center items-center gap-[10px] flex-[1_0_0] self-stretch border-t border-t-[var(--Gray100)] ">
            <button className="w-[24px] h-[24px] aspect-1/1 rotate-[90deg]">
              <ArrowIcon />
            </button>
          </div>
        </div>
      </section>

      <section className="flex w-[270px] px-[20px] py-[10px] justify-center items-center gap-[10px] rounded-[8px] bg-[var(--white)] shadow-[0px_0px_10px_0px_rgba(0,0,0,0.10)]">
        <div className="w-[15px] h-[20px] shrink-0 aspect-3/4 ">
          <FindPlaceIcon />
        </div>
        <div className="text-[14px] font-bold leading-[20px] tracking-[-0.5px] text-[var(--Gray900)]">
          장소등록
        </div>
      </section>
    </>
  );
}
