import { useFunnel } from '@use-funnel/browser';

export default function ExpenseStep({
  funnel,
}: {
  funnel: ReturnType<typeof useFunnel>;
}) {
  return (
    <div className="flex flex-col items-center w-[1200px] h-[854px] pb-[40px] pl-[20px] pr-[20px] pt-[20px] gap-[40px] bg-white  shrink-0 font-[Pretendard] not-italic tracking-[-0.5px]">
      <div className="flex flex-col items-center self-stretch">
        <span>5 / 6</span>
        <h1 className="text-[var(--Gray900)] text-[20px] font-bold text-center leading-[30px]">
          비용은 얼마인가요?
        </h1>
        <span className="text-[var(--Gray600)] text-[14px] text-center font-normal leading-[20px]">
          여행 예상 비용을 입력해주세요
        </span>
      </div>

      <div className="flex flex-col items-start gap-[4px] flex-[1_0_0] w-full">
        <div className="flex justify-between items-center w-full border-b-[0.6px] border-b-[var(--Gray400)] focus-within:border-b-black">
          <input
            type="number"
            placeholder="예상 비용"
            className="flex-1 h-[48px] outline-none text-black placeholder:text-[24px] font-normal leading-[34px] tracking-[-0.5px] text-[var(--Gray400)]"
          />
          <span className="text-[24px] font-normal leading-[34px] tracking-[-0.5px] text-[var(--Gray900)]">
            원
          </span>
        </div>

        <p className="text-[12px] font-normal leading-[18px] text-[var(--Gray500)]">
          최소 5,000원 ~ 최대 5,000,000원까지 입력이 가능합니다
        </p>
      </div>

      <div className="flex h-[54px] px-[0px] py-[16px] justify-center items-center shrink-0 bg-[var(--Gray200)] self-stretch">
        <button
          className="text-[16px] w-full text-center font-bold leading-[22px] text-[var(--Gray400)]"
          onClick={() => funnel.history.push('explainStep', {})}
        >
          다음
        </button>
      </div>
    </div>
  );
}
