'use client';

import dynamic from 'next/dynamic';

import { useFunnel } from '@use-funnel/browser';
import { useTripFunnelStore } from '@/store/useTripFunnelStore';
import { BoardRegisterTypes } from '@/types/boardRegister';
import { useFunnelDirection } from '@/hooks/useFunnelDirection';

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
);

const ExpenseStep = dynamic(
  () => import('@/components/tripPlanning/registerTrip/ExpenseStep'),
);

const ExplainStep = dynamic(
  () => import('@/components/tripPlanning/registerTrip/ExplainStep'),
  { ssr: false },
);

export default function Page() {
  const { trip } = useTripFunnelStore();

  const funnel = useFunnel<BoardRegisterTypes>({
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
  }
}
