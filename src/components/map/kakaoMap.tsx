'use client';

import Script from 'next/script';

import { useEffect, useState, useRef } from 'react';

export default function KakaoMap() {
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isMapLoaded || !window.kakao) return;

    window.kakao.maps.load(() => {
      if (!mapRef.current) return;

      const map = new window.kakao.maps.Map(mapRef.current, {
        center: new window.kakao.maps.LatLng(37.5665, 126.978),
        level: 3,
      });

      new window.kakao.maps.Marker({
        map,
        position: new window.kakao.maps.LatLng(37.5665, 126.978),
      });
    });
  }, [isMapLoaded]);

  return (
    <>
      <Script
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_API_KAKAO_API_KEY}&autoload=false`}
        strategy="afterInteractive"
        onLoad={() => setIsMapLoaded(true)}
      />
      <div ref={mapRef} className="w-full h-[854px] bg-gray-200" />
    </>
  );
}
