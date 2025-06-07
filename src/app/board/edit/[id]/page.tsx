'use client';

import dynamic from 'next/dynamic';

import { useFunnel } from '@use-funnel/browser';

import { useFunnelDirection } from '@/hooks/useFunnelDirection';

import { useParams, useRouter } from 'next/navigation';
import { useApi } from '@/hooks/useApi';
import { useEffect } from 'react';
import { BoardData } from '@/types/board';
import { BoardRegisterSteps } from '@/types/boardFunnel';
import { useTripFunnelStore } from '@/store/tripFunnelStore';

const DestinationStep = dynamic(
  () => import('@/components/tripPlanning/registerTrip/DestinationStep'),
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

export default function Page() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const { setContext, setMode } = useTripFunnelStore();
  const { get } = useApi();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await get(`feeds/${id}`);
        const data = res.data as BoardData;

        setMode('edit');
        setContext({
          region: data.region,
          period: data.period,
          gender: data.gender,
          ageGroup: data.ageGroup,
          tripStyles: data.tripStyles,
          cost: data.cost,
          explain: {
            title: data.title,
            subTitle: data.content,
            coverImageUrl: data.coverImageUrl,
          },
          boardId: data.id,
        });
      } catch (error) {
        console.error('❌ 게시글 로딩 오류:', error);
        alert('게시글 데이터를 불러오지 못했습니다.');
        router.push('/');
      }
    };

    fetchData();
  }, [id]);
  const { trip } = useTripFunnelStore();

  const funnel = useFunnel<BoardRegisterSteps>({
    id: 'register-trip',
    initial: {
      step: 'destinationStep',
      context: trip,
    },
  });

  useFunnelDirection(funnel.step);

  switch (funnel.step) {
    case 'destinationStep':
      return <DestinationStep funnel={funnel} />;
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
    default:
      return null;
  }
}
