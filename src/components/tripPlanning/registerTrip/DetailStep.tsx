'use client';

import KakaoPlanMap from '@/components/kakaoMap/KakaoPlanMap';
import DetailStepLayout from './DetailStepLayout';

import { UseFunnelResults } from '@use-funnel/browser';

import { KakaoMapProvider } from '@/providers/KakaoMapProvider';
import { cityCoordinates } from '@/constants/cityCoordinates';
import { useTripFunnelStore } from '@/store/tripFunnelStore';
import { BoardRegisterSteps } from '@/types/boardFunnel';
import { useEffect } from 'react';

interface DetailFunnel {
  funnel: UseFunnelResults<
    BoardRegisterSteps,
    BoardRegisterSteps['detailStep']
  >;
}

export default function DetailStep({ funnel }: DetailFunnel) {
  const { trip, setStepIndex } = useTripFunnelStore();
  const coordinate = cityCoordinates[trip.region];

  useEffect(() => {
    setStepIndex(7);
  }, []);

  return (
    <DetailStepLayout>
      <KakaoMapProvider center={{ lat: coordinate.y, lng: coordinate.x }}>
        <KakaoPlanMap funnel={funnel} />
      </KakaoMapProvider>
    </DetailStepLayout>
  );
}
