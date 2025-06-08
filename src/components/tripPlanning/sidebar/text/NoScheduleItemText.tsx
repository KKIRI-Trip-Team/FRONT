export default function NoScheduleItemText() {
  return (
    <>
      {/* pc화면 */}
      <div className="tb:hidden pc:flex flex-col text-[var(--Gray600)] text-center font-[Pretendard] text-[14px] font-normal leading-[20px] tracking-[-0.5px]">
        <span>일정을 등록하고</span>
        <span>여행을 생성해보세요!</span>
      </div>

      {/* tablet화면 */}
      <div className="pc:hidden flex flex-col text-[var(--Gray600)] text-center font-[Pretendard] text-[14px] font-normal leading-[20px] tracking-[-0.5px] flex-[1_0_0]">
        <span>일정을 등록하고</span>
        <span>여행을 생성해보세요!</span>
      </div>
    </>
  );
}
