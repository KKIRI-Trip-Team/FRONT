import { useTripFunnelStore } from '@/store/useTripFunnelStore';
import { BoardRegisterTypes } from '@/types/boardRegister';
import { useFunnel, UseFunnelResults } from '@use-funnel/browser';
import { useEffect, useState } from 'react';

const styles = [
  { id: 1, name: '휴식 🧘🍵' },
  { id: 2, name: '체험 🤿' },
  { id: 3, name: '액티비티🏃' },
  { id: 4, name: '쇼핑 🛒🛍' },
  { id: 5, name: '견문 넓히기🏛🖼 ' },
  { id: 6, name: '식도락 🍕🍖' },
  { id: 7, name: '감성투어 🌆' },
  { id: 8, name: '가성비 ️💸' },
  { id: 9, name: '플랙스 🤑' },
  { id: 10, name: '꼼꼼한 계획 ✍⏱' },
  { id: 11, name: '즉흥 🤹‍♀️' },
  { id: 12, name: '자연친화🌳' },
  { id: 13, name: '여유 ⏳' },
  { id: 14, name: '인생샷필수 📸' },
  { id: 15, name: '핫플 🎪✨' },
  { id: 16, name: '웨이팅가능 📋' },
  { id: 17, name: '근처 아무식당🍽️' },
];

interface StyleFunnel {
  funnel: UseFunnelResults<BoardRegisterTypes, BoardRegisterTypes['styleStep']>;
}

export default function StyleStep({ funnel }: StyleFunnel) {
  const { context, setContext } = useTripFunnelStore();

  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);

  useEffect(() => {
    if (context.styles && context.styles.length > 0) {
      setSelectedStyles(context.styles);
    }
  }, []);

  const handleStylesToggle = (styles: string) => {
    if (selectedStyles.includes(styles)) {
      setSelectedStyles(selectedStyles.filter((style) => style !== styles));
    } else {
      setSelectedStyles([...selectedStyles, styles]);
    }
  };

  const isSelected = selectedStyles.length > 2;

  return (
    <div className="flex flex-col items-center w-[1200px] h-[854px] pb-[40px] pl-[20px] pr-[20px] pt-[20px] gap-[40px] bg-white  shrink-0 font-[Pretendard] not-italic tracking-[-0.5px]">
      <div className="flex flex-col items-center self-stretch">
        <span>4 / 6</span>
        <h1 className="text-[var(--Gray900)] text-[20px] font-bold text-center leading-[30px]">
          여행 스타일이 궁금해요
        </h1>
        <span className="text-[var(--Gray600)] text-[14px] text-center font-normal leading-[20px]">
          평소 여행스타일을 3개 이상 택해주세요
        </span>
      </div>

      <div className="flex items-start content-start gap-[16px] flex-[1_0_0] self-stretch flex-wrap">
        {styles.map((style) => (
          <div
            key={style.id}
            onClick={() => handleStylesToggle(style.name)}
            className={`flex content-center items-center px-[20px] py-[10px] ${
              selectedStyles.includes(style.name)
                ? 'border-[0.8px] border-[#0085FF] bg-[rgba(0,133,255,0.1)]'
                : 'bg-[#F8F8F8]'
            } rounded-[100px]`}
          >
            <label className="text-center text-[12px] font-bold leading-[18px] cursor-pointer">
              {style.name}
            </label>
            <input type="checkbox" hidden value={style.name} />
          </div>
        ))}
      </div>

      <div
        className={`flex w-full h-[54px] px-[0px] py-[16px] justify-center items-center shrink-0 self-stretch  ${isSelected ? 'bg-[#5938DB] cursor-pointer' : 'bg-[#F1F1F2]'}`}
      >
        <button
          // disabled={!isSelected}
          className="text-[16px] w-full text-center font-bold leading-[22px] text-[var(--Gray400)]"
          onClick={() => {
            setContext({ styles: selectedStyles });
            funnel.history.push('expenseStep', {
              ...context,
              styles: selectedStyles,
            });
          }}
        >
          다음
        </button>
      </div>
    </div>
  );
}
