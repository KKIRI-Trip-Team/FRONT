'use client';

import { useFunnel } from '@use-funnel/browser';
import { useState } from 'react';

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

  return (
    <div className="flex flex-col items-center w-[1200px] h-[854px] p-[20px] pb-[20px]  gap-[40px] shrink-0">
      <div className="flex flex-col items-center self-stretch">
        <span>1 / 6</span>
        <h1 className="text-gray-900 text-center text-xl font-normal leading-[30px] tracking-[-0.5px]">
          어디로 떠나시나요?
        </h1>
        <span className="text-gray-600 text-center text-sm font-normal leading-[20px] tracking-[-0.5px]">
          떠나고 싶은 도시를 선택해주세요
        </span>
      </div>
      <div className="flex items-start content-start flex-wrap gap-x-[18px] gap-y-[16px] flex-[1_0_0] self-stretch">
        {cities.map((city) => (
          <button
            key={city.id}
            onClick={() => handleCityName(city.name)}
            className={`w-20 h-20 rounded-[10px] flex flex-col items-center justify-center transition
            ${
              selectedCity === city.name
                ? 'border-[0.8px] border-[#0085FF] bg-[rgba(0,133,255,0.1)]'
                : 'bg-[#F8F8F8]'
            }`}
          >
            <span className="text-xl">{city.emoji}</span>
            <div className="mt-1 text-sm">{city.name}</div>
          </button>
        ))}
      </div>
      <div className="flex h-[54px] w-full items-center justify-center bg-[#5938DB]">
        <button
          className="text-white text-center text-base font-bold leading-[22px] tracking-[-0.5px]"
          onClick={() => funnel.history.push('period', {})}
        >
          다음
        </button>
      </div>
    </div>
  );
}
