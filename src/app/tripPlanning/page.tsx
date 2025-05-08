'use client';

import DestinationStep from '@/components/tripPlanning/registerTrip/DestinationStep';
import PeriodStep from '@/components/tripPlanning/registerTrip/PeriodStep';
import MateStep from '@/components/tripPlanning/registerTrip/MateStep';
import StyleStep from '@/components/tripPlanning/registerTrip/StyleStep';
import ExpenseStep from '@/components/tripPlanning/registerTrip/ExpenseStep';
import ExplainStep from '@/components/tripPlanning/registerTrip/ExplainStep';

import { useFunnel } from '@use-funnel/browser';
import { useTripFunnelStore } from '@/store/useTripFunnelStore';
import { BoardRegisterTypes } from '@/types/boardRegister';
import { useFunnelDirection } from '@/hooks/useFunnelDirection';

export default function Page() {
  const { context } = useTripFunnelStore();

  const funnel = useFunnel<BoardRegisterTypes>({
    id: 'register-trip-funnel',
    initial: {
      step: 'destinationStep',
      context: context,
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
