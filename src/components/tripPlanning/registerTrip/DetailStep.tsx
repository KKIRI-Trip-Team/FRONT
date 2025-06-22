'use client';

import KakaoMap from '@/components/kakaoMap/KakaoMap';
import DetailStepLayout from './DetailStepLayout';

import { KakaoMapProvider } from '@/providers/KakaoMapProvider';
import { cityCoordinates } from '@/constants/cityCoordinates';
import { useTripFunnelStore } from '@/store/tripFunnelStore';
import { UseFunnelResults } from '@use-funnel/browser';
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
        <KakaoMap funnel={funnel} />
      </KakaoMapProvider>
    </DetailStepLayout>
  );
}
