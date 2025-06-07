'use client';

import { TripContext, useTripFunnelStore } from '@/store/tripFunnelStore';
import { useApi } from './useApi';

import { useRouter } from 'next/navigation';

export function useSubmitTrip() {
  const { trip, mode, resetAll } = useTripFunnelStore.getState();
  const { post, patch } = useApi();
  const router = useRouter();
  const id = trip.boardId;

  const submitSchedule = async (update?: Partial<TripContext>) => {
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
      // coverImageUrl: funnelData.explain.coverImageUrl,
      region: funnelData.region,
      period: funnelData.period,
      gender: funnelData.gender,
      ageGroup: funnelData.ageGroup,
      cost: funnelData.cost,
      tripStyles: funnelData.tripStyles,
    };
    console.log('전송 직전 ', funnelData);

    try {
      console.log('🚀 최종 전송 payload:', payload);

      if (mode === 'create') {
        const res = await post('feeds', payload);

        if (!res?.data) {
          throw new Error('서버로부터 유효한 응답을 받지 못했습니다.');
        }

        alert('여행 일정이 등록되었습니다.');
        resetAll();
        router.push('/');
      }

      if (mode === 'edit') {
        if (!id) {
          alert('해당 게시글이 존재하지 않습니다.');
          return;
        }

        await patch(`feeds/${id}`, payload);
        console.log('✏️ 수정된 payload:', payload);
        alert('게시글이 수정되었습니다.');
        resetAll();
        router.push(`/board/${id}`);
      }
    } catch (error: any) {
      console.error(
        '❌ 게시글 저장 오류:',
        error?.response?.data || error.message,
      );
    }
  };

  return { submitSchedule };
}
