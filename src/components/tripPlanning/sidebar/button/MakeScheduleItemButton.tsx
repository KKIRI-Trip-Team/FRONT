'use client';

import FindPlaceIcon from '@/public/icons/find-place-icon.svg';
import { useMapStore } from '@/store/mapStore';
import { useTripFunnelStore } from '@/store/tripFunnelStore';

export default function MakeScheduleItemButton() {
  const currentDay = useTripFunnelStore((s) => s.currentDay);
  const selectedPlace = useMapStore((s) => s.selectedPlace);
  const daysPlan = useTripFunnelStore((s) => s.daysPlan);

  const addPlaceToDay = useTripFunnelStore((s) => s.addPlaceToDay);

  const handleRegister = () => {
    if (!selectedPlace) return;

    // 현재 날짜의 장소 개수 확인
    const currentDayPlaces =
      daysPlan.find((day) => day.day === currentDay)?.places || [];
    if (currentDayPlaces.length >= 20) {
      alert('각 날짜에는 최대 20개의 장소만 등록할 수 있습니다.');
      return;
    }

    // 카테고리가 카카오는 음식 > 중식 > 이런식으로 되어있어서 그 카테고리에서 마지막 사용
    const lastCategoryName = selectedPlace.category_name
      .split('>')
      .pop()
      ?.trim();

    // 장소 추가시 포함 될 내용들
    addPlaceToDay(currentDay, {
      id: selectedPlace.id,
      place_name: selectedPlace.place_name,
      road_address_name: selectedPlace.road_address_name,
      address_name: selectedPlace.address_name,
      category_name: lastCategoryName as string,
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
