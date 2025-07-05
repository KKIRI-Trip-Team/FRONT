'use client';

import Link from 'next/link';

import { useApi } from '@/hooks/useApi';
import { ScheduleItem } from '@/types/board';
import { useEffect, useState } from 'react';

export default function ScheduleInfoItem({
  placeId,
  order,
}: {
  placeId: string;
  order: number;
}) {
  const { get } = useApi<ScheduleItem>();
  const [place, setPlace] = useState<ScheduleItem | null>(null);

  useEffect(() => {
    const fetchPlace = async () => {
      const res = await get(`places/${placeId}`);
      setPlace(res.data);
    };
    fetchPlace();
  }, [placeId]);

  if (!place) {
    return (
      <div className="font-[Pretendard] flex h-[86px] p-[20px] items-start gap-[10px] self-stretch rounded-[12px] bg-[var(--white)] shadow-[0px_0px_10px_0px_rgba(0,0,0,0.10)]">
        <div className="flex w-[24px] h-[24px] flex-col justify-center items-center gap-[10px] aspect-1/1 rounded-[100px] bg-[var(--PrimaryLight)]">
          <h1 className="text-center text-[16px] font-bold leading-[22px] tracking-[-0.5px] text-[var(--white)]">
            {order}
          </h1>
        </div>
        <div className="flex flex-col items-start flex-[1_0_0] tracking-[-0.5px]">
          <h1 className="text-center text-[18px] font-bold leading-[26px] ">
            불러오는 중...
          </h1>
        </div>
      </div>
    );
  }

  return (
    <Link href={place.place_url} className="w-full" target="_blank">
      <div className="font-[Pretendard] flex h-[86px] p-[20px] items-start gap-[10px] self-stretch rounded-[12px] bg-[var(--white)] shadow-[0px_0px_10px_0px_rgba(0,0,0,0.10)]">
        <div
          className={`flex w-[24px] h-[24px] flex-col justify-center items-center gap-[10px] aspect-1/1 rounded-[100px] ${
            (order - 1) % 3 === 0
              ? 'bg-[var(--PrimaryLight)]'
              : (order - 1) % 3 === 1
                ? 'bg-[var(--Secondary)]'
                : 'bg-[var(--Tertiary)]'
          }`}
        >
          <h1 className="text-center text-[16px] font-bold leading-[22px] tracking-[-0.5px] text-[var(--white)]">
            {order}
          </h1>
        </div>
        <div className="flex flex-col items-start flex-[1_0_0] tracking-[-0.5px]">
          <h1 className="text-center text-[18px] font-bold leading-[26px] ">
            {place.place_name} ( {place.category_name} )
          </h1>
          <h2 className="text-[16px] font-normal leading-[22px] self-stretch text-[var(--Gray600)]">
            {place.address_name || '등록된 주소가 없습니다.'} |
            {` 전화번호 : ${place.phone || '등록된 전화번호가 없습니다'}`}
          </h2>
        </div>
      </div>
    </Link>
  );
}
