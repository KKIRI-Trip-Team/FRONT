import FindIcon from '@/public/icons/find-place-icon.svg';
export default function HTripDetailMakeButton() {
  return (
    <button className="flex flex-col h-[122px] px-[20px] py-[10px] justify-center items-center gap-[10px] rounded-[8px] bg-[var(--white)] shadow-[0px_0px_10px_0px_rgba(0,0,0,0.10)]">
      <FindIcon />
      <span>장소등록</span>
    </button>
  );
}
