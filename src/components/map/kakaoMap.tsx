'use client';

import Script from 'next/script';
import { useEffect, useRef, useState } from 'react';

export default function KakaoMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [mapInitialized, setMapInitialized] = useState(false);

  useEffect(() => {
    if (!scriptLoaded || !window.kakao || mapInitialized) return;

    if (window.kakao.maps) {
      window.kakao.maps.load(() => {
        if (!mapRef.current) return;

        const map = new window.kakao.maps.Map(mapRef.current, {
          center: new window.kakao.maps.LatLng(33.450701, 126.570667),
          level: 3,
        });

        new window.kakao.maps.Marker({
          map,
          position: new window.kakao.maps.LatLng(33.450701, 126.570667),
        });

        setMapInitialized(true); // 중복 초기화 방지
      });
    }
  }, [scriptLoaded, mapInitialized]);

  return (
    <>
      <Script
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_API_KAKAO_API_KEY}&autoload=false`}
        strategy="afterInteractive"
        onLoad={() => setScriptLoaded(true)}
      />
      <div
        ref={mapRef}
        className="pc:w-[1200px] pc:h-[854px] tb:w-[768px] tb:h-[706px] bg-gray-200"
      />
    </>
  );
}
