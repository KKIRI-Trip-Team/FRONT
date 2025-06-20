'use client';

import dynamic from 'next/dynamic';

import { useFunnel } from '@use-funnel/browser';

import { useFunnelDirection } from '@/hooks/useFunnelDirection';
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
