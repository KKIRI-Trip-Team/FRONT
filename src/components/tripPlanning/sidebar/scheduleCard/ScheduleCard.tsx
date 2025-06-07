'use client';

import RightArrowIcon from '@/public/icons/right-arrow-icon-lightV.svg';
import LeftArrowIcon from '@/public/icons/left-arrow-icon-lightV.svg';
import UpArrowIcon from '@/public/icons/up-arrow-icon.svg';
import DownArrowIcon from '@/public/icons/down-arrow-icon.svg';
import TrashIcon from '@/public/icons/trash-icon.svg';
import { useTripFunnelStore } from '@/store/tripFunnelStore';
import { useMapStore } from '@/store/mapStore';

export default function ScheduleCard() {
  const daysPlan = useTripFunnelStore((s) => s.daysPlan);
  const currentDay = useTripFunnelStore((s) => s.currentDay);
  const schedule = daysPlan.find((d) => d.day === currentDay)?.places || [];

  const setSelectedPlace = useMapStore((s) => s.setSelectedPlace);
  const removePlace = useTripFunnelStore((s) => s.removePlaceFromDay);
  const moveUp = useTripFunnelStore((s) => s.movePlaceUp);
  const moveDown = useTripFunnelStore((s) => s.movePlaceDown);

  return (
    <>
      {schedule.map((place, idx) => (
        <section
          key={place.id}
          className="flex w-[270px] h-[122px] flex-col justify-center items-center shrink-0 rounded-[16px] bg-[var(--white)] shadow-[0px_0px_10px_0px_rgba(0,0,0,0.10)]"
        >
          <div className="flex px-[12px] py-[20px] items-center self-stretch justify-between">
            <div
              onClick={() => {
                const placeResultItem: kakao.maps.services.PlacesSearchResultItem =
                  {
                    id: place.id,
                    place_name: place.place_name,
                    address_name: place.address_name,
                    road_address_name: place.road_address_name as string,
                    category_name: place.category_name,
                    category_group_name: place.category_group_name,
                    phone: place.phone,
                    x: place.x,
                    y: place.y,
                    place_url: place.place_url as string,
                    distance: place.distance,
                  };
                setSelectedPlace(placeResultItem);
              }}
              className="flex w-[169px] h-[42px] items-start gap-[10px]"
            >
              <div
                className={`flex w-[24px] h-[24px] justify-center items-center rounded-full text-white font-bold text-[14px] leading-[20px] tracking-[-0.5px] ${
                  idx % 3 === 0
                    ? 'bg-[var(--PrimaryLight)]'
                    : idx % 3 === 1
                      ? 'bg-[var(--Secondary)]'
                      : 'bg-[var(--Tertiary)]'
                }`}
              >
                {idx + 1}
              </div>
              <div className="flex flex-col items-start gap-[4px] flex-1 cursor-pointer">
                <span className="line-clamp-1 text-[14px] font-bold text-[var(--Gray900)] font-[Pretendard]">
                  {place.place_name} ({place.category_name})
                </span>
                <span className="line-clamp-1 text-[12px] text-[var(--Gray600)]">
                  {place.address_name}
                </span>
                <span className="line-clamp-1 text-[12px] text-[var(--Gray600)]">
                  {place.phone ? place.phone : '등록된 전화번호가 없습니다'}
                </span>
              </div>
            </div>

            <button
              onClick={() => removePlace(currentDay, place.id)}
              className="flex w-[30px] h-[30px] justify-center items-center rounded-full bg-[var(--white)] shadow-[0px_0px_4px_0px_rgba(0,0,0,0.15)]"
            >
              <TrashIcon />
            </button>
          </div>

          <div className="flex h-[40px] items-center self-stretch border-t border-[var(--Gray100)]">
            <div className="flex flex-1 justify-center items-center border-r border-[var(--Gray100)]">
              <button
                onClick={() => moveUp(currentDay, idx)}
                className="w-[24px] h-[24px]"
              >
                {/* PC에서는 UpArrow, 태블릿 이하에서는 LeftArrow */}
                <span className="hidden pc:inline">
                  <UpArrowIcon />
                </span>
                <span className="inline pc:hidden">
                  <LeftArrowIcon />
                </span>
              </button>
            </div>
            <div className="flex flex-1 justify-center items-center">
              <button
                onClick={() => moveDown(currentDay, idx)}
                className="w-[24px] h-[24px]"
              >
                {/* PC에서는 DownArrow, 태블릿 이하에서는 RightArrow */}
                <span className="hidden pc:inline">
                  <DownArrowIcon />
                </span>
                <span className="inline pc:hidden">
                  <RightArrowIcon />
                </span>
              </button>
            </div>
          </div>
        </section>
      ))}
    </>
  );
}
