'use client';

import { useTripFunnelStore } from '@/store/useTripFunnelStore';
import { useApi } from './useApi';
import { useAuthStore } from '@/store/authStore';
import { BoardData, ScheduleData } from '@/types/board';
import { useRouter } from 'next/navigation';

export function useSubmitTrip() {
  const { trip, daysPlan, resetAll } = useTripFunnelStore.getState();
  const { post } = useApi();
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  //게시글 post

  const submitSchedule = async () => {
    const title = trip.explain.title.trim() || '';
    const content = trip.explain.subTitle.trim() || '';

    console.log('전송 바디:', { title, content });
    try {
      const feedRes = await post('feeds', {
        // destination: trip.destination, // 목적지
        // ageRange: trip.ageRange, // 나이대
        // gender: trip.gender, // 성별
        // expense: trip.expense, // 지출
        // period: trip.period, // 기간

        title: title, // 제목
        content: content, // 내용
        // imageUrl: trip.explain.image, // 게시글 coverImage
        // email: user?.email, // 유저 이메일
        // nickname: user?.nickname,
        // profileImage: user?.profileUrl,
      });

      const feedData = feedRes.data as { id: number };
      const feedId = feedData?.id;

      console.log('응답:', feedRes);
      if (!feedId) {
        throw new Error('feedId 생성 실패');
      }

      // // N일차 일정 생성
      // const scheduleIds: number[] = [];
      // for (const day of daysPlan) {
      //   const scheduleRes = await post(`feeds/${feedId}/schedules`, {
      //     id: 0,
      //     dayNumber: day.day,
      //     feedId,
      //   });

      //   const scheduleData = scheduleRes.data as ScheduleData;
      //   const scheduleId = scheduleData.id;
      //   if (!scheduleId) {
      //     throw new Error('ScheduleId 생성 실패');
      //   }
      // }

      // // 일정 아이템
      // for (let i = 0; i < scheduleIds.length; i++) {
      //   const scheduleId = scheduleIds[i];
      //   const places = daysPlan[i].places;

      //   for (let j = 0; j < places.length; j++) {
      //     const place = places[j];
      //     await post(`feeds/${feedId}/schedules/${scheduleId}/scheduleItems`, {
      //       itemOrder: j + 1,
      //       scheduleId,
      //       id: place.id,
      //       place_name: place.place_name,
      //       address_name: place.address_name,
      //       road_address_name: place.road_address_name,
      //       place_url: place.place_url,
      //       category_name: place.category_name,
      //       phone: place.phone,
      //       x: place.x,
      //       y: place.y,
      //     });
      //   }
      // }

      alert('여행 일정이 성공적으로 등록되었습니다');
      resetAll();
      router.push('/');
    } catch (error) {
      console.log(`에러 발생 :${error}`);
      alert('일정 등록 중 문제가 발생하였습니다.');
    }
  };

  return { submitSchedule };
}
