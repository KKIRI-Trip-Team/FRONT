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

      {/* input 공통 컴포넌트 사용할 예정 */}

      <div className="flex h-[54px] px-[0px] py-[16px] justify-center items-center shrink-0 bg-[var(--Gray200)] self-stretch">
        <button
          className="text-[16px] w-full text-center font-bold leading-[22px] text-[var(--Gray400)]"
          onClick={() => funnel.history.push('explain', {})}
        >
          다음
        </button>
      </div>
    </div>
  );
}
