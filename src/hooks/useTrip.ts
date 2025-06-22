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
  const deleteScheduleItem = async (
    feedId: number,
    scheduleId: number,
    scheduleItemId: number,
    placeId?: string,
  ) => {
    await deleteRequest(
      `feeds/${feedId}/schedules/${scheduleId}/scheduleItems/${scheduleItemId}`,
    );
    // 만약 place도 삭제 필요시
    if (placeId) {
      await deleteRequest(`places/${placeId}`);
    }
  };

  // 스케줄(1일차 전체) 삭제
  const deleteSchedule = async (feedId: number, scheduleId: number) => {
    await deleteRequest(`feeds/${feedId}/schedules/${scheduleId}`);
  };

  return { deleteScheduleItem, deleteSchedule };
}

export function useTrip() {
  const { post, patch, put } = useApi<FeedResponse>();
  const router = useRouter();
  const store = useTripFunnelStore;

  // ----- 일정 생성 -----
  const submitScheduleCreate = async (feedId: number, daysPlan: DayPlan[]) => {
    for (const dayPlan of daysPlan) {
      const scheduleRes = await post(`feeds/${feedId}/schedules`, {
        dayNumber: dayPlan.day,
        feedId,
      });
      const scheduleId = scheduleRes.data.id;

      for (let i = 0; i < dayPlan.places.length; i++) {
        let place = dayPlan.places[i];
        place = toScheduleItemWithKakaoId(place);

        // 1. 카카오 ID만 있고 DB placeId가 없는 경우
        let dbPlaceId = place.id;
        if (!dbPlaceId || dbPlaceId === place.kakaoPlaceId) {
          try {
            const placeRes = await post('places', createPlacePayload(place));
            dbPlaceId = placeRes.data.id.toString();
            // 상태에 반영
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
            console.error('[ERROR][CREATE][place 등록 실패]', err, place);
            alert('장소 등록 실패: ' + (err as any).message);
            continue;
          }
        }

        // 2. scheduleItem 등록
        try {
          await post(
            `feeds/${feedId}/schedules/${scheduleId}/scheduleItems`,
            scheduleItemPayload(i + 1, scheduleId, dbPlaceId!),
          );
        } catch (err) {
          console.error('[ERROR][CREATE][scheduleItem 등록 실패]', err, place);
          alert('일정 장소 등록 실패: ' + (err as any).message);
        }
      }
    }
  };

  // ----- 일정 수정 -----
  const submitScheduleEdit = async (feedId: number, daysPlan: DayPlan[]) => {
    console.log('[EDIT MODE START]', JSON.stringify(daysPlan, null, 2));
    for (const dayPlan of daysPlan) {
      // 1. 일정 자체 PUT/POST
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

      // 2. 각 장소 처리
      let itemOrder = 1;
      for (let place of dayPlan.places.filter(Boolean)) {
        place = toScheduleItemWithKakaoId(place);
        let dbPlaceId = place.id;

        // 신규 장소(카카오ID만 있음)라면 먼저 place POST
        if (!dbPlaceId || dbPlaceId === place.kakaoPlaceId) {
          try {
            const placeRes = await post('places', createPlacePayload(place));
            dbPlaceId = placeRes.data.id.toString();
            // 상태에 반영
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
            console.error('[ERROR][EDIT][place 등록 실패]', err, place);
            alert('장소 등록 실패: ' + (err as any).message);
            continue;
          }
        } else {
          // 기존 장소는 PATCH
          try {
            await patch(`places/${dbPlaceId}`, createPlacePayload(place));
          } catch (err) {
            console.error('[ERROR][EDIT][place PATCH 실패]', err, place);
            // 404면 신경X, 500류만 alert
          }
        }

        // scheduleItem 등록/수정
        if (!place.scheduleItemId) {
          // 신규 scheduleItem
          try {
            const scheduleItemRes = await post(
              `feeds/${feedId}/schedules/${dayPlan.id}/scheduleItems`,
              scheduleItemPayload(itemOrder, dayPlan.id!, dbPlaceId!),
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
            console.error('[ERROR][EDIT][scheduleItem 등록 실패]', err, place);
            alert('장소 일정 등록 실패: ' + (err as any).message);
          }
        } else {
          // 기존 scheduleItem 수정
          try {
            await put(
              `feeds/${feedId}/schedules/${dayPlan.id}/scheduleItems/${place.scheduleItemId}`,
              {
                id: place.scheduleItemId,
                itemOrder,
                scheduleId: dayPlan.id,
                place: dbPlaceId!,
              },
            );
          } catch (err) {
            console.error('[ERROR][EDIT][scheduleItem PATCH 실패]', err, place);
            // 보통 무시, 404인 경우만 체크
          }
        }
        itemOrder++;
      }
      // 디버깅
      console.log(
        `[EDIT][${dayPlan.day}일차] 처리 후 daysPlan:`,
        JSON.stringify(
          useTripFunnelStore
            .getState()
            .daysPlan.find((dp) => dp.day === dayPlan.day),
          null,
          2,
        ),
      );
    }
  };

  // ----- 통합 submit -----
  const submitSchedule = async (update?: Partial<TripContext>) => {
    const { trip, mode, daysPlan, resetAll } = store.getState();
    const id = trip.boardId;

    // null, id 이상한 곳 체크
    if (
      daysPlan.some(
        (d) => !d.places || d.places.some((p) => !p || !p.place_name),
      )
    ) {
      alert('잘못된 장소 데이터가 포함되어 있습니다.');
      return;
    }
    console.log(
      '[DEBUG][submitSchedule 진입 시 daysPlan]',
      JSON.stringify(daysPlan, null, 2),
    );

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
      console.error('❌ submitSchedule 실패:', err);
      alert(err.message || '여행 등록/수정 실패!');
    }
  };

  return { submitSchedule };
}
