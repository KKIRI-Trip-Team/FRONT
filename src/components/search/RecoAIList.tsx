import AiIcon from '@/public/icons/ai-icon.svg';

export default function RecoAIList() {
  return (
    <section className="flex pc:w-[1200px] tb:w-[768px]  h-[602px] py-[40px] flex-col items-start shrink-0 bg-[var(--white)]">
      <div className="flex px-[20px] items-center gap-[10px] self-stretch">
        <div className="flex w-[24px] h-[20px] p-[5px] flex-col justify-center items-center gap-[10px] aspect-6/5 bg-[var(--Secondary)] rounded-[100px]">
          <AiIcon />
        </div>
        <span>인기 여행지</span>
      </div>

      <div className="flex p-[20px] items-cetner content-center gap-[8px_10px] self-stretch flex-wrap">
        <div className="flex px-[12px] py-[6px] items-center gap-[10px] rounded-[100px] bg-[#F0EDFC]">
          <span className="text-[var(--Primary)] text-[14px] font-bold leading-[20px] tracking-[-0.5px]">
            강원
          </span>
        </div>

        <div className="flex px-[12px] py-[6px] items-center gap-[10px] rounded-[100px] bg-[#F0EDFC]">
          <span className="text-[var(--Primary)] text-[14px] font-bold leading-[20px] tracking-[-0.5px]">
            부산
          </span>
        </div>

        <div className="flex px-[12px] py-[6px] items-center gap-[10px] rounded-[100px] bg-[#F0EDFC]">
          <span className="text-[var(--Primary)] text-[14px] font-bold leading-[20px] tracking-[-0.5px]">
            경주
          </span>
        </div>

        <div className="flex px-[12px] py-[6px] items-center gap-[10px] rounded-[100px] bg-[#F0EDFC]">
          <span className="text-[var(--Primary)] text-[14px] font-bold leading-[20px] tracking-[-0.5px]">
            대구
          </span>
        </div>

        <div className="flex px-[12px] py-[6px] items-center gap-[10px] rounded-[100px] bg-[#F0EDFC]">
          <span className="text-[var(--Primary)] text-[14px] font-bold leading-[20px] tracking-[-0.5px]">
            제주
          </span>
        </div>

        <div className="flex px-[12px] py-[6px] items-center gap-[10px] rounded-[100px] bg-[#F0EDFC]">
          <span className="text-[var(--Primary)] text-[14px] font-bold leading-[20px] tracking-[-0.5px]">
            전북
          </span>
        </div>
      </div>
    </section>
  );
}
