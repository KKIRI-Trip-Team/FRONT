import { useKakaoMap } from '@/providers/KakaoMapProvider';
import { useEffect, useRef } from 'react';
import { Place } from '../board/[id]/TripInfo';

// 여행 게시글 조회시 사용되는 카카오맵 컴포넌트
export default function KakaoStaticMapView({ places }: { places: Place[] }) {
  const { map, mapRef, scriptLoaded } = useKakaoMap();

  const overlaysRef = useRef<kakao.maps.CustomOverlay[]>([]);

  useEffect(() => {
    if (!scriptLoaded || !map) return;

    // 기존 오버레이 제거
    overlaysRef.current.forEach((overlay) => overlay.setMap(null));
    overlaysRef.current = [];

    // 새로운 오버레이 생성 및 지도에 추가
    places.forEach((place, idx) => {
      if (place.x && place.y) {
        let bgVar =
          idx % 3 === 0
            ? 'var(--PrimaryLight)'
            : idx % 3 === 1
              ? 'var(--Secondary)'
              : 'var(--Tertiary)';

        const content = `
          <div style="
            background: ${bgVar};
            color:white;
            border-radius: 50%;
            width: 32px;
            height: 32px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            font-size: 16px;
          ">
            ${idx + 1}
          </div>
        `;

        const overlay = new window.kakao.maps.CustomOverlay({
          position: new window.kakao.maps.LatLng(
            Number(place.y),
            Number(place.x),
          ),
          content,
          yAnchor: 1,
        });
        overlay.setMap(map);
        overlaysRef.current.push(overlay);
      }
    });

    return () => {
      overlaysRef.current.forEach((overlay) => overlay.setMap(null));
      overlaysRef.current = [];
    };
  }, [map, scriptLoaded, places]);

  return <div ref={mapRef} className="w-full h-full" />;
}
