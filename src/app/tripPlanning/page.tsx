'use client';

import { useFunnel } from '@use-funnel/browser';
import dynamic from 'next/dynamic';

const DestinationStep = dynamic(() => import('./destinationStep/page'), {
  ssr: false,
});
const PeriodStep = dynamic(() => import('./periodStep/page'), { ssr: false });
const MateStep = dynamic(() => import('./mateStep/page'), { ssr: false });
const StyleStep = dynamic(() => import('./styleStep/page'), { ssr: false });
const ExpenseStep = dynamic(() => import('./expenseStep/page'), { ssr: false });
const JourneyStep = dynamic(() => import('./summaryStep/page'), { ssr: false });

export default function Page() {
  const funnel = useFunnel({
    id: 'trip-planning-funnel',
    initial: {
      step: 'destination',
      context: {},
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
    case 'journey':
      return <JourneyStep funnel={funnel} />;
  }
}
