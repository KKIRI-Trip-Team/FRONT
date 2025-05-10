'use client';

import { useRef, useEffect, useState } from 'react';
import { useTripFunnelStore } from '@/store/useTripFunnelStore';
import { cityCoordinates } from '@/constants/cityCoordinates';

export default function KakaoMap() {
  const { context } = useTripFunnelStore();
  const mapRef = useRef<HTMLDivElement>(null);
  const [scriptLoaded, setScriptLoaded] = useState(false);

  const city = context.destination;
  const coordinate = cityCoordinates[city];
  console.log('✅ destination:', context.destination);

  useEffect(() => {
    if (!coordinate) return; // 좌표 없는 경우 렌더 방지

    const script = document.createElement('script');
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_API_KAKAO_API_KEY}&autoload=false&libraries=services,clusterer`;
    script.async = true;

    script.onload = () => setScriptLoaded(true);
    document.head.appendChild(script);

    if (!scriptLoaded || !coordinate || !window.kakao || !mapRef.current)
      return;

    window.kakao.maps.load(() => {
      const map = new window.kakao.maps.Map(mapRef.current!, {
        center: new window.kakao.maps.LatLng(coordinate.lat, coordinate.lon),
        level: 3,
      });

      new window.kakao.maps.Marker({
        map,
        position: new window.kakao.maps.LatLng(coordinate.lat, coordinate.lon),
      });
    });
    return () => {
      document.head.removeChild(script);
    };
  }, [scriptLoaded, coordinate]);

  return (
    <div
      ref={mapRef}
      className="pc:w-[1200px] pc:h-[854px] tb:w-[768px] tb:h-[706px] bg-gray-200"
    />
  );
}
