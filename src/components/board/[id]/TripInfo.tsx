'use client';

import { useApi } from '@/hooks/useApi';

import { useEffect, useState } from 'react';
import { KakaoMapProvider } from '@/providers/KakaoMapProvider';
import KakaoStaticMapView from '@/components/kakaoMap/KakaoStaticMap';
import ScheduleInfoItem from '../schedule.tsx/ScheduleInfoItem';

export interface Schedule {
  id: number;
  dayNumber: number;
  feedId: number;
}

export interface SchedulePlace {
  id: number;
  itemOrder: number;
  scheduleId: number;
  place: string;
}

export interface Place {
  id: string;
  x: number | string;
  y: number | string;
}

export default function TripInfo({ feedId }: { feedId: number }) {
  const { get: getSchedulePlaces } = useApi<SchedulePlace[]>();
  const { get: getSchedules } = useApi<Schedule[]>();
  const { get: getPlaceDetail } = useApi<Place>();

  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [schedulePlaces, setSchedulePlaces] = useState<
    Record<number, SchedulePlace[]>
  >({});

  // Day별 Place 배열 저장용 상태
  const [dayPlaces, setDayPlaces] = useState<Record<number, Place[]>>({});

  // 일정(스케줄) 가져오기
  useEffect(() => {
    const fetchSchedules = async () => {
      const res = await getSchedules(`feeds/${feedId}/schedules`);
      console.log(res.data);
      setSchedules(res.data || []);
    };
    fetchSchedules();
  }, [feedId]);

  // 각 스케줄별 장소 가져오기
  useEffect(() => {
    const fetchPlaces = async () => {
      const placesBySchedule: Record<number, SchedulePlace[]> = {};
      for (const schedule of schedules) {
        const res = await getSchedulePlaces(
          `schedules/${schedule.id}/scheduleItems`,
        );
        console.log(res.data);
        placesBySchedule[schedule.id] = res.data || [];
      }
      setSchedulePlaces(placesBySchedule);
    };
    if (schedules.length > 0) fetchPlaces();
  }, [schedules]);

  useEffect(() => {
    const fetchAllPlaces = async () => {
      const result: Record<number, Place[]> = {};

      for (const schedule of schedules) {
        const schedulePlaceList = schedulePlaces[schedule.id] || [];
        const places: Place[] = [];
        for (const sp of schedulePlaceList) {
          // place 상세정보 fetch
          const res = await getPlaceDetail(`places/${sp.place}`);
          console.log(res.data);
          if (res.data) places.push(res.data);
        }

        result[schedule.id] = places;
      }

      setDayPlaces(result);
    };
    if (Object.keys(schedulePlaces).length) fetchAllPlaces();
  }, [schedulePlaces]);

  return (
    <section className="flex flex-col items-start gap-[20px] self-stretch font-[Pretendard] bg-[var(--white)]">
      {schedules.map((schedule) => {
        const places = dayPlaces[schedule.id] || [];
        const firstPlace = places[0];
        const center =
          firstPlace && firstPlace.x && firstPlace.y
            ? { lat: Number(firstPlace.y), lng: Number(firstPlace.x) }
            : { lat: 0, lng: 0 };
        return (
          <div key={schedule.id}>
            {/* Day 헤더 */}
            <div className="flex px-[20px] py-[20px] items-center">
              <div className="flex w-[62px] h-[40px] ">
                <h1 className="text-[28px] font-bold leading-[40px] tracking-[-0.5px] text-[var(--Gray900)]">
                  DAY{schedule.dayNumber}
                </h1>
              </div>
            </div>

            {/* 카카오맵 렌더링 */}
            <div className="pc:w-[1200px] pc:h-[750px] tb:w-[768px] tb:h-[375px] shrink-0 mb-[20px]">
              <KakaoMapProvider center={center}>
                <KakaoStaticMapView places={places} />
              </KakaoMapProvider>
            </div>

            {/* 해당 day의 장소 목록 */}
            <div>
              <div className="flex px-[20px] py-[0px] flex-col justify-center items-start gap-[30px] self-stretch mb-[20px]">
                {schedulePlaces[schedule.id]?.length ? (
                  schedulePlaces[schedule.id].map((item, idx) => (
                    <ScheduleInfoItem
                      key={item.id}
                      placeId={item.place}
                      order={idx + 1}
                    />
                  ))
                ) : (
                  <div className="text-gray-400">등록된 장소가 없습니다.</div>
                )}
              </div>
            </div>

            {/* 구분선 */}
            <div className="h-[8px] bg-[var(--Gray100)]" />
          </div>
        );
      })}
    </section>
  );
}
