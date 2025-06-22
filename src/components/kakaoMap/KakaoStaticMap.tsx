import { useKakaoMap } from '@/providers/KakaoMapProvider';
import { useEffect, useRef } from 'react';
import { Place } from '../board/[id]/TripInfo';

export default function KakaoStaticMapView({ places }: { places: Place[] }) {
  const { map, mapRef, scriptLoaded } = useKakaoMap();

  const markersRef = useRef<kakao.maps.Marker[]>([]);

  useEffect(() => {
    if (!scriptLoaded || !map) return;

    // 1. 기존 마커 제거
    markersRef.current.forEach((marker) => marker.setMap(null));
    markersRef.current = [];

    // 2. 새로운 마커 생성 및 지도에 추가
    places.forEach((place) => {
      if (place.x && place.y) {
        const marker = new window.kakao.maps.Marker({
          position: new window.kakao.maps.LatLng(
            Number(place.y),
            Number(place.x),
          ),
        });
        marker.setMap(map);
        markersRef.current.push(marker);
      }
    });

    // 3. 언마운트시 마커 제거
    return () => {
      markersRef.current.forEach((marker) => marker.setMap(null));
      markersRef.current = [];
    };
  }, [map, scriptLoaded, places]);

  return <div ref={mapRef} className="w-full h-full" />;
}
