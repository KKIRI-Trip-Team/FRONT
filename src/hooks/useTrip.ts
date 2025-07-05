'use client';

import { useTripFunnelStore, TripContext } from '@/store/tripFunnelStore';
import { useApi } from './useApi';
import { useRouter } from 'next/navigation';
import { DayPlan, ScheduleItem } from '@/types/board';

type FeedResponse = { id: number };

// kakaoPlaceId가 있으면 그대로, 없으면 id를 kakaoPlaceId로 넣어준다!
function toScheduleItemWithKakaoId(
  place: ScheduleItem,
): ScheduleItem & { kakaoPlaceId: string } {
  return {
    ...place,
    kakaoPlaceId: (place as ScheduleItem).kakaoPlaceId ?? place.id,
  };
}

function createPlacePayload(place: ScheduleItem) {
  return {
    id: place.id, // 서버 placeId (아닐 수도 있으므로, POST 시는 무시됨)
    place_name: place.place_name,
    address_name: place.address_name,
    road_address_name: place.road_address_name,
    place_url: place.place_url,
    category_name: place.category_name,
    phone: place.phone,
    x: +place.x,
    y: +place.y,
  };
}

function scheduleItemPayload(
  itemOrder: number,
  scheduleId: number,
  id: string,
) {
  return {
    itemOrder,
    scheduleId,
    place: id,
  };
}

// ----- 여행 일정 삭제 -----
export function deleteTripItems() {
  const { delete: deleteRequest } = useApi<FeedResponse>();

  // 상세일정(장소) 삭제
  // 등록한 장소 삭제시에 필요함
  const deleteScheduleItem = async (
    feedId: number,
    scheduleId: number,
    scheduleItemId: number,
    placeId?: string,
  ) => {
    await deleteRequest(
      `feeds/${feedId}/schedules/${scheduleId}/scheduleItems/${scheduleItemId}`,
    );
    // 만약 place도 삭제 필요시 <- 필요없음
    // if (placeId) {
    //   await deleteRequest(`places/${placeId}`);
    // }
  };

  // 스케줄(1일차 전체) 삭제
  // 지역 및 기한 변경시에 필요함
  const deleteSchedule = async (feedId: number, scheduleId: number) => {
    await deleteRequest(`feeds/${feedId}/schedules/${scheduleId}`);
  };

  return { deleteScheduleItem, deleteSchedule };
}

export function useTrip() {
  const { post, patch, put } = useApi<FeedResponse>();
  const router = useRouter();
  const store = useTripFunnelStore;

  // ...생략...

  // ----- 일정 생성 -----
  const submitScheduleCreate = async (feedId: number, daysPlan: DayPlan[]) => {
    for (const dayPlan of daysPlan) {
      dayPlan.places.forEach((place, idx) => {
        place.itemOrder = idx + 1;
      });

      const scheduleRes = await post(`feeds/${feedId}/schedules`, {
        dayNumber: dayPlan.day,
        feedId,
      });
      const scheduleId = scheduleRes.data.id;

      for (let i = 0; i < dayPlan.places.length; i++) {
        let place = dayPlan.places[i];
        place = toScheduleItemWithKakaoId(place);

        let dbPlaceId = place.id;
        if (!dbPlaceId || dbPlaceId === place.kakaoPlaceId) {
          try {
            const placeRes = await post('places', createPlacePayload(place));
            dbPlaceId = placeRes.data.id.toString();
            useTripFunnelStore.setState((state) => ({
              daysPlan: state.daysPlan.map((dp) =>
                dp.day === dayPlan.day
                  ? {
                      ...dp,
                      places: dp.places.map((p) =>
                        (p.kakaoPlaceId ?? p.id) === place.kakaoPlaceId
                          ? { ...p, id: dbPlaceId }
                          : p,
                      ),
                    }
                  : dp,
              ),
            }));
          } catch (err) {
            alert('장소 등록 실패: ' + (err as any).message);
            continue;
          }
        }

        // 2. scheduleItem 등록 (itemOrder를 place.itemOrder로)
        try {
          await post(
            `feeds/${feedId}/schedules/${scheduleId}/scheduleItems`,
            scheduleItemPayload(place.itemOrder!, scheduleId, dbPlaceId!),
          );
        } catch (err) {
          alert('일정 장소 등록 실패: ' + (err as any).message);
        }
      }
    }
  };

  // ----- 일정 수정 -----
  const submitScheduleEdit = async (feedId: number, daysPlan: DayPlan[]) => {
    for (const dayPlan of daysPlan) {
      // ✅ 1. 항상 순서대로 itemOrder 부여
      dayPlan.places.forEach((place, idx) => {
        place.itemOrder = idx + 1;
      });

      if (dayPlan.id) {
        await put(`feeds/${feedId}/schedules/${dayPlan.id}`, {
          id: dayPlan.id,
          dayNumber: dayPlan.day,
          feedId,
        });
      } else {
        const scheduleRes = await post(`feeds/${feedId}/schedules`, {
          dayNumber: dayPlan.day,
          feedId,
        });
        const newId = scheduleRes.data.id;
        dayPlan.id = newId;
        useTripFunnelStore.setState((state) => ({
          daysPlan: state.daysPlan.map((dp) =>
            dp.day === dayPlan.day ? { ...dp, id: newId } : dp,
          ),
        }));
      }

      for (let i = 0; i < dayPlan.places.length; i++) {
        let place = dayPlan.places[i];
        place = toScheduleItemWithKakaoId(place);
        let dbPlaceId = place.id;

        if (!dbPlaceId || dbPlaceId === place.kakaoPlaceId) {
          try {
            const placeRes = await post('places', createPlacePayload(place));
            dbPlaceId = placeRes.data.id.toString();
            useTripFunnelStore.setState((state) => ({
              daysPlan: state.daysPlan.map((dp) =>
                dp.day === dayPlan.day
                  ? {
                      ...dp,
                      places: dp.places.map((p) =>
                        (p.kakaoPlaceId ?? p.id) === place.kakaoPlaceId
                          ? { ...p, id: dbPlaceId }
                          : p,
                      ),
                    }
                  : dp,
              ),
            }));
          } catch (err) {
            alert('장소 등록 실패: ' + (err as any).message);
            continue;
          }
        } else {
          try {
            await patch(`places/${dbPlaceId}`, createPlacePayload(place));
          } catch (err) {
            alert('장소 수정 실패: ' + (err as any).message);
          }
        }

        // scheduleItem 등록/수정
        if (!place.scheduleItemId) {
          try {
            const scheduleItemRes = await post(
              `feeds/${feedId}/schedules/${dayPlan.id}/scheduleItems`,
              scheduleItemPayload(place.itemOrder!, dayPlan.id!, dbPlaceId!),
            );
            const scheduleItemId = scheduleItemRes.data.id;
            useTripFunnelStore.setState((state) => ({
              daysPlan: state.daysPlan.map((dp) =>
                dp.day === dayPlan.day
                  ? {
                      ...dp,
                      places: dp.places.map((p) =>
                        (p.kakaoPlaceId ?? p.id) === place.kakaoPlaceId
                          ? { ...p, scheduleItemId }
                          : p,
                      ),
                    }
                  : dp,
              ),
            }));
          } catch (err) {
            alert('장소 일정 등록 실패: ' + (err as any).message);
          }
        } else {
          try {
            await put(
              `feeds/${feedId}/schedules/${dayPlan.id}/scheduleItems/${place.scheduleItemId}`,
              {
                id: place.scheduleItemId,
                itemOrder: place.itemOrder!,
                scheduleId: dayPlan.id,
                place: dbPlaceId!,
              },
            );
          } catch (err) {
            alert('장소 일정 수정 실패: ' + (err as any).message);
          }
        }
      }
    }
  };

  // ----- 통합 submit -----
  const submitSchedule = async (update?: Partial<TripContext>) => {
    const { trip, mode, daysPlan, resetAll } = store.getState();
    const id = trip.boardId;

    const funnelData = {
      ...trip,
      ...update,
      explain: {
        ...trip.explain,
        ...(update?.explain ?? {}),
      },
    };

    const payload = {
      title: funnelData.explain.title,
      content: funnelData.explain.subTitle,
      imageUrls: funnelData.explain.coverImageUrl
        ? [funnelData.explain.coverImageUrl]
        : [],
      region: funnelData.region,
      period: funnelData.period,
      gender: funnelData.gender,
      ageGroup: funnelData.ageGroup,
      cost: funnelData.cost,
      tripStyles: funnelData.tripStyles,
    };

    try {
      let feedId: number;
      if (mode === 'create') {
        const res = await post('feeds', payload);
        feedId = res.data.id;
        await submitScheduleCreate(feedId, daysPlan);
      } else if (mode === 'edit') {
        if (!id) throw new Error('Feed ID 없음');
        const res = await patch(`feeds/${id}`, payload);
        feedId = res.data.id;
        await submitScheduleEdit(feedId, daysPlan);
      } else {
        throw new Error('mode 값이 잘못됨');
      }

      alert(
        mode === 'create'
          ? '여행 일정이 등록되었습니다.'
          : '여행 일정이 수정되었습니다.',
      );
      resetAll();
      router.push('/');
    } catch (err: any) {
      alert(err.message || '여행 등록/수정 실패!');
    }
  };

  return { submitSchedule };
}
