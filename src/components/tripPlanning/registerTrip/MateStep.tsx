import { useTripFunnelStore } from '@/store/useTripFunnelStore';
import { BoardRegisterTypes } from '@/types/boardRegister';
import { useFunnel, UseFunnelResults } from '@use-funnel/browser';
import { useEffect, useState } from 'react';

const genders = [
  { id: 1, name: '👩 여성' },
  { id: 2, name: '👱‍♂️ 남성' },
  { id: 3, name: '상관없음' },
];

const ages = [
  { id: 1, name: '20대' },
  { id: 2, name: '30대' },
  { id: 3, name: '40대' },
  { id: 4, name: '50대' },
  { id: 5, name: '상관없음' },
];

interface MateFunnel {
  funnel: UseFunnelResults<BoardRegisterTypes, BoardRegisterTypes['mateStep']>;
}

export default function MateStep({ funnel }: MateFunnel) {
  const { context, setContext } = useTripFunnelStore();

  const [selectedGender, setSelectedGender] = useState('');
  const [selectedAges, setSelectedAges] = useState<string[]>([]);

  const ToggleGender = (gender: string) => {
    if (selectedGender === gender) {
      setSelectedGender('');
    } else {
      setSelectedGender(gender);
    }
  };
  useEffect(() => {
    if (selectedGender === '' && context.gender) {
      setSelectedGender(context.gender);
    }
    if (selectedAges.length === 0 && context.ageRange.length > 0) {
      setSelectedAges(context.ageRange);
    }
  }, []);

  const handleAgesToggle = (ages: string) => {
    if (selectedAges.includes(ages)) {
      setSelectedAges(selectedAges.filter((age) => age !== ages));
    } else {
      setSelectedAges([...selectedAges, ages]);
    }
  };

  const isSelected = selectedGender !== '' && selectedAges.length > 0;

  return (
    <div className="flex flex-col items-center w-[1200px] h-[854px] pb-[40px] pl-[20px] pr-[20px] pt-[20px] gap-[40px] bg-white  shrink-0 font-[Pretendard] not-italic tracking-[-0.5px]">
      <div className="flex flex-col items-center self-stretch">
        <span>2 / 6</span>
        <h1 className="text-[var(--Gray900)] text-[20px] font-bold text-center leading-[30px]">
          누구랑 떠나시겠어요?
        </h1>
        <span className="text-[var(--Gray600)] text-[14px] text-center font-normal leading-[20px]">
          함께 여행을 즐길 메이트를 설정해주세요
        </span>
      </div>
      <div className="flex flex-col items-start gap-[60px] flex-[1_0_0] self-stretch">
        <section className="flex flex-col items-start gap-[20px]">
          <h1 className="text-[20px] font-bold leading-[22px]">성별</h1>
          <div className="flex items-center content-center gap-[16px] flex-wrap">
            {genders.map((gender) => (
              <button
                onClick={() => ToggleGender(gender.name)}
                className={`flex flex-col content-center items-center px-[16px] py-[8px] rounded-[100px]  ${
                  selectedGender === gender.name
                    ? 'border-[0.8px] border-[#0085FF] bg-[rgba(0,133,255,0.1)]'
                    : 'bg-[#F8F8F8]'
                }`}
                key={gender.id}
              >
                <span className="text-[var(--Gray900)] text-center text-[14px] font-bold leading-[20px]">
                  {gender.name}
                </span>
              </button>
            ))}
          </div>
        </section>

        <section className="flex flex-col items-start gap-[20px] self-stretch">
          <div className="flex items-center gap-[10px]">
            <h1 className="text-[16px] font-bold text-[var(--Gray900)] leading-[22px] ">
              연령대
            </h1>
            <h3 className="text-[12px] text-[var(--Gray600)] font-bold leading-[18px]">
              중복 선택 가능
            </h3>
          </div>

          <div className="flex items-start content-start gap-[16px] flex-wrap self-stretch">
            {ages.map((age) => (
              <div
                key={age.id}
                className={`flex flex-col content-center items-center px-[16px] py-[8px] ${
                  selectedAges.includes(age.name)
                    ? 'border-[0.8px] border-[#0085FF] bg-[rgba(0,133,255,0.1)]'
                    : 'bg-[#F8F8F8]'
                } rounded-[100px]`}
                onClick={() => handleAgesToggle(age.name)}
              >
                <label className="text-[14px] font-bold leading-[20px] cursor-pointer text-[var(--Gray900)] text-center">
                  {age.name}
                </label>
                <input type="checkbox" value={age.name} hidden />
              </div>
            ))}
          </div>
        </section>
      </div>

      <div
        className={`flex w-full h-[54px] px-[0px] py-[16px] justify-center items-center shrink-0 self-stretch  ${isSelected ? 'bg-[#5938DB] cursor-pointer' : 'bg-[#F1F1F2]'}`}
      >
        <button
          // disabled={!isSelected}
          className={`text-center w-full text-[16px] font-bold leading-[22px] ${isSelected ? 'text-[var(--white)]' : 'text-[var(--Gray400)]'}`}
          onClick={() => {
            setContext({ ageRange: selectedAges, gender: selectedGender });
            funnel.history.push('styleStep', {
              ...context,
              gender: selectedGender,
              ageRange: selectedAges,
            });
          }}
        >
          다음
        </button>
      </div>
    </div>
  );
}
