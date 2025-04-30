'use client';

import { useState } from 'react';
import { useFunnel } from '@use-funnel/browser';

const cities = [
  { id: 1, emoji: '🗼', name: '서울' },
  { id: 2, emoji: '🌊', name: '부산' },
  { id: 3, emoji: '🌞', name: '대구' },
  { id: 4, emoji: '🛫 ', name: '인천' },
  { id: 5, emoji: '💪 ', name: '광주' },
  { id: 6, emoji: '🪷', name: '경주' },
  { id: 7, emoji: '🥯', name: '대전' },
  { id: 8, emoji: '🌅', name: '울산' },
  { id: 9, emoji: '🏛️', name: '세종' },
  { id: 10, emoji: '🏙️', name: '경기' },
  { id: 11, emoji: '🐠', name: '강원' },
  { id: 12, emoji: '🎍', name: '충북' },
  { id: 13, emoji: '🌰', name: '충남' },
  { id: 14, emoji: '🏔️', name: '경북' },
  { id: 15, emoji: '🦆', name: '경남' },
  { id: 16, emoji: '🍱', name: '전북' },
  { id: 17, emoji: '🏯', name: '전주' },
  { id: 18, emoji: '🌾', name: '전남' },
  { id: 19, emoji: '🏝', name: '제주' },
];

export default function DestinationStep({
  funnel,
}: {
  funnel: ReturnType<typeof useFunnel>;
}) {
  const [selectedCity, setSelectedCity] = useState('');

  const handleCityName = (cityName: string) => {
    setSelectedCity(cityName);
    console.log(`도시 이름 : ${cityName}`);
  };

  const isSelected = selectedCity !== '';

  return (
    <div className="flex flex-col items-center w-[1200px] h-[854px] pb-[40px] pl-[20px] pr-[20px] pt-[20px]  gap-[40px] bg-white  shrink-0 font-[Pretendard] not-italic tracking-[-0.5px]">
      <div className="flex flex-col items-center self-stretch">
        <span>1 / 6</span>
        <h1 className="text-[var(--Gray900)] text-[20px] font-bold text-center leading-[30px]">
          어디로 떠나시나요?
        </h1>
        <span className="text-[var(--Gray600)] text-[14px] text-center font-normal leading-[20px]">
          떠나고 싶은 도시를 선택해주세요
        </span>
      </div>
      <div className="flex items-start content-start flex-wrap gap-x-[18px] gap-y-[16px] flex-[1_0_0] self-stretch">
        {cities.map((city) => (
          <button
            key={city.id}
            onClick={() => handleCityName(city.name)}
            className={`w-[80px] h-[80px] rounded-[10px] flex flex-col items-center justify-center transition
            ${
              selectedCity === city.name
                ? 'border-[0.8px] border-[#0085FF] bg-[rgba(0,133,255,0.1)]'
                : 'bg-[#F8F8F8]'
            }`}
          >
            <span className="text-[16px] font-bold leading-[22px]">
              {city.emoji}
            </span>
            <div className="text-[14px] font-bold leading-[20px]">
              {city.name}
            </div>
          </button>
        ))}
      </div>
      <div
        className={`flex h-[54px] w-full px-[0px] py-[16px] justify-center items-center shrink-0 self-stretch  ${isSelected ? 'bg-[#5938DB] cursor-pointer' : 'bg-[#F1F1F2] cursor-not-allowed'}`}
      >
        <button
          disabled={!isSelected}
          className={`text-center w-full text-[16px] font-bold leading-[22px] ${isSelected ? 'text-[var(--white)]' : 'text-[var(--Gray400)]'}`}
          onClick={() => {
            funnel.history.push('period', {});
          }}
        >
          다음
        </button>
      </div>
    </div>
  );
}
