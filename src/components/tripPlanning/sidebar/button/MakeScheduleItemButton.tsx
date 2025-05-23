'use client';

import FindPlaceIcon from '@/public/icons/find-place-icon.svg';

import { useMapStore } from '@/store/useMapstore';
import { useTripFunnelStore } from '@/store/useTripFunnelStore';

export default function MakeScheduleItemButton() {
  const currentDay = useTripFunnelStore((s) => s.currentDay);
  const selectedPlace = useMapStore((s) => s.selectedPlace);
  const addPlaceToDay = useTripFunnelStore((s) => s.addPlaceToDay);

  const handleRegister = () => {
    if (!selectedPlace) return;

    const lastIdxCategory = selectedPlace.category_name
      .split('>')
      .pop()
      ?.trim();

    addPlaceToDay(currentDay, {
      id: selectedPlace.id,
      place_name: selectedPlace.place_name,
      road_address_name: selectedPlace.road_address_name,
      address_name: selectedPlace.address_name,
      category_name: lastIdxCategory as string,
      category_group_name: selectedPlace.category_group_name,
      phone: selectedPlace.phone,
      x: selectedPlace.x,
      y: selectedPlace.y,
      place_url: selectedPlace.place_url,
      distance: selectedPlace.distance,
    });
  };

  return (
    <section>
      {/* PC용 버튼 */}
      <button
        onClick={handleRegister}
        className="hidden pc:flex w-[270px] px-[20px] py-[10px] justify-center items-center gap-[10px] rounded-[8px] bg-[var(--white)] shadow-[0_0_10px_0_rgba(0,0,0,0.1)] cursor-pointer"
      >
        <div className="w-[15px] h-[20px] shrink-0 aspect-3/4 ">
          <FindPlaceIcon />
        </div>
        <div className="text-[14px] font-bold leading-[20px] tracking-[-0.5px] text-[var(--Gray900)]">
          장소등록
        </div>
      </button>

      {/* 태블릿용 버튼 */}
      <button
        onClick={handleRegister}
        className="pc:hidden flex flex-col w-[87px] h-[122px] justify-center items-center gap-[10px] rounded-[8px] bg-[var(--white)] shadow-[0_0_10px_0_rgba(0,0,0,0.1)] cursor-pointer"
      >
        <div className="w-[15px] h-[20px] shrink-0 aspect-3/4 ">
          <FindPlaceIcon />
        </div>
        <div className="text-[14px] font-bold leading-[20px] tracking-[-0.5px] text-[var(--Gray900)]">
          장소등록
        </div>
      </button>
    </section>
  );
}
