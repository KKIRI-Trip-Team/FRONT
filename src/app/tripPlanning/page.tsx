'use client';

import DestinationStep from '@/components/tripPlanning/registerTrip/DestinationStep';
import PeriodStep from '@/components/tripPlanning/registerTrip/Period';
import MateStep from '@/components/tripPlanning/registerTrip/MateStep';
import StyleStep from '@/components/tripPlanning/registerTrip/StyleStep';
import ExpenseStep from '@/components/tripPlanning/registerTrip/ExpenseStep';
import ExplainStep from '@/components/tripPlanning/registerTrip/ExplainStep';

import { useFunnel } from '@use-funnel/browser';

export default function Page() {
  const funnel = useFunnel({
    id: 'trip-register-funnel',
    initial: {
      step: 'destination',
      context: {
        destination: '',
        period: '',
        mate: '',
        style: '',
        expense: '',
        explain: '',
      },
    },
  });

  switch (funnel.step) {
    case 'destination':
      return <DestinationStep funnel={funnel} />;
    case 'period':
      return <PeriodStep funnel={funnel} />;
    case 'mate':
      return <MateStep funnel={funnel} />;
    case 'style':
      return <StyleStep funnel={funnel} />;
    case 'expense':
      return <ExpenseStep funnel={funnel} />;
    case 'explain':
      return <ExplainStep funnel={funnel} />;
  }
}
