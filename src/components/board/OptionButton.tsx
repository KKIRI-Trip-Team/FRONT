export default function OptionButton() {
  return (
    <div className="flex w-[120px] px-[10px] py-[8px] flex-col items-center bg-[var(--white)] rounded-[8px] shadow-[0px_0px_10px_0px_rgba(0,0,0,0.10)]">
      <button className="w-full text-[var(--Light-gray600)] flex h-[40px] px-[10px] py-[8px] justify-center items-center gap-[4px] rounded-[8px] hover:bg-[rgba(232,235,237,0.70)] ">
        수정하기
      </button>
      <button className="w-full text-[var(--Light-gray600)] flex h-[40px] px-[10px] py-[8px] justify-center items-center gap-[4px] rounded-[8px] hover:bg-[rgba(232,235,237,0.70)] ">
        삭제하기
      </button>
    </div>
  );
}
