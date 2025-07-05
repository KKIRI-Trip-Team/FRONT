'use client';

import dynamic from 'next/dynamic';
import { useFunnel } from '@use-funnel/browser';
import { useFunnelDirection } from '@/hooks/useFunnelDirection';
import { useParams, useRouter } from 'next/navigation';
import { useApi } from '@/hooks/useApi';
import { useEffect, useRef, useState } from 'react';
import { BoardData, ScheduleItem } from '@/types/board';
import { BoardRegisterSteps } from '@/types/boardFunnel';
import { useTripFunnelStore } from '@/store/tripFunnelStore';

const RegionStep = dynamic(
  () => import('@/components/tripPlanning/registerTrip/RegionStep'),
  { ssr: false },
);
const PeriodStep = dynamic(
  () => import('@/components/tripPlanning/registerTrip/PeriodStep'),
  { ssr: false },
);
const MateStep = dynamic(
  () => import('@/components/tripPlanning/registerTrip/MateStep'),
  { ssr: false },
);
const StyleStep = dynamic(
  () => import('@/components/tripPlanning/registerTrip/StyleStep'),
  { ssr: false },
);
const ExpenseStep = dynamic(
  () => import('@/components/tripPlanning/registerTrip/ExpenseStep'),
  { ssr: false },
);
const ExplainStep = dynamic(
  () => import('@/components/tripPlanning/registerTrip/ExplainStep'),
  { ssr: false },
);

const DetailStep = dynamic(
  () => import('@/components/tripPlanning/registerTrip/DetailStep'),
  { ssr: false },
);

export default function Page() {
  const { id } = useParams<{ id: string }>();
  const { trip, daysPlan, setContext, setMode, setDayPlans, resetAll } =
    useTripFunnelStore();
  const { get } = useApi();

  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가
  const router = useRouter();

  // **초기화가 이미 한 번 되었는지 추적**
  const isInitialized = useRef(false);

  // **hydrate(상태 복구) 플래그 추가**
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      resetAll(); // 상태 완전 초기화 (더 안전한 접근)

      try {
        // 게시글 데이터 조회
        const userInfoRes = await get(`feeds/${id}`);
        const userInfoData = userInfoRes.data as BoardData;

        setMode('edit');
        setContext({
          region: userInfoData.region,
          period: userInfoData.period,
          gender: userInfoData.gender,
          ageGroup: userInfoData.ageGroup,
          tripStyles: userInfoData.tripStyles,
          cost: userInfoData.cost,
          explain: {
            title: userInfoData.title,
            subTitle: userInfoData.content,
            coverImageUrl: userInfoData.imageUrls[0] || '',
          },
          boardId: userInfoData.id,
        });

        // 스케줄 데이터 조회 및 설정
        const scheduleListRes = await get(`feeds/${id}/schedules`);
        const schedules = scheduleListRes.data as {
          id: number;
          dayNumber: number;
          feedId: number;
        }[];

        const daysPlanPromises = schedules.map(async (schedule) => {
          const scheduleItemsRes = await get(
            `schedules/${schedule.id}/scheduleItems`,
          );
          const scheduleItems = scheduleItemsRes.data as {
            place: string;
            id: number;
          }[];

          const placeDetails = await Promise.all(
            scheduleItems.map(async (item) => {
              const placeRes = await get(`places/${item.place}`);
              if (!placeRes.data) return null;
              return {
                ...placeRes.data,
                scheduleItemId: item.id,

                kakaoPlaceId: ((
                  placeRes.data as { kakaoPlaceId?: string; id?: string }
                ).kakaoPlaceId ??
                  (placeRes.data as { id?: string }).id) as string,
              } as ScheduleItem;
            }),
          );

          return {
            id: schedule.id,
            day: schedule.dayNumber,
            places: placeDetails.filter(Boolean) as ScheduleItem[],
          };
        });

        const daysPlan = await Promise.all(daysPlanPromises);

        // 편집(EDIT) 진입 시, daysPlan이 비었을 때만 set!
        if (useTripFunnelStore.getState().daysPlan.length === 0) {
          setDayPlans(daysPlan);
        }
      } catch (error) {
        console.error('❌ 게시글 로딩 오류:', error);
        alert('게시글 데이터를 불러오지 못했습니다.');
        router.push('/');
      } finally {
        setIsLoading(false);
        isInitialized.current = true; // 다시는 fetchData 실행 안 됨
      }
    };

    fetchData();
  }, [hydrated, id, setContext, setDayPlans, setMode, resetAll]);

  const funnel = useFunnel<BoardRegisterSteps>({
    id: 'register-trip',
    initial: {
      step: 'regionStep',
      context: trip,
    },
  });

  useFunnelDirection(funnel.step);

  if (isLoading) {
    return <div className="p-10">데이터를 불러오는 중입니다...</div>;
  }

  switch (funnel.step) {
    case 'regionStep':
      return <RegionStep funnel={funnel} />;
    case 'periodStep':
      return <PeriodStep funnel={funnel} />;
    case 'mateStep':
      return <MateStep funnel={funnel} />;
    case 'styleStep':
      return <StyleStep funnel={funnel} />;
    case 'expenseStep':
      return <ExpenseStep funnel={funnel} />;
    case 'explainStep':
      return <ExplainStep funnel={funnel} />;
    case 'detailStep':
      return <DetailStep funnel={funnel} />;
    default:
      return null;
  }
}
