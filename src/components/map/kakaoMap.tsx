'use client';

import { useEffect, useRef, useState } from 'react';
import { useTripFunnelStore } from '@/store/useTripFunnelStore';
import { cityCoordinates } from '@/constants/cityCoordinates';

export default function KakaoMap() {
  const { context } = useTripFunnelStore();
  const mapRef = useRef<HTMLDivElement>(null);

  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [map, setMap] = useState<kakao.maps.Map | null>(null);
  const [markers, setMarkers] = useState<kakao.maps.Marker[]>([]);

  const city = context.destination;
  const coordinate = cityCoordinates[city];

  // 스크립트 로드 전용 useEffect
  useEffect(() => {
    if (!coordinate) return;

    const script = document.createElement('script');
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_API_KAKAO_API_KEY}&autoload=false&libraries=services,clusterer`;
    script.async = true;
    script.onload = () => setScriptLoaded(true);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [coordinate]);

  // 지도 초기화 전용 useEffect
  useEffect(() => {
    const { kakao } = window;

    if (!scriptLoaded || !mapRef.current || !kakao || !coordinate) return;

    kakao.maps.load(() => {
      const kakaoMap = new kakao.maps.Map(mapRef.current!, {
        center: new kakao.maps.LatLng(coordinate.lat, coordinate.lon),
        level: 3,
      });

      setMap(kakaoMap);

      const marker = new kakao.maps.Marker({
        position: new kakao.maps.LatLng(coordinate.lat, coordinate.lon),
        clickable: true,
      });

      marker.setMap(null);
      setMarkers([]);

      // 클릭 시 마커 추가
      kakao.maps.event.addListener(
        kakaoMap,
        'click',
        function (mouseEvent: kakao.maps.event.MouseEvent) {
          const position = mouseEvent.latLng;
          const newMarker = new kakao.maps.Marker({ position });

          newMarker.setMap(kakaoMap);
          setMarkers((prev) => [...prev, newMarker]);
          console.log(newMarker);
          // 마커 지우기
          const markerDelete = () => {
            newMarker.setMap(null);
            setMarkers((marker) => marker.filter((item) => item !== newMarker));
          };

          const markerId = Date.now();
          const iwContent = `<button id="delete-${markerId}" style="padding:5px">삭제하기</button>`;

          const infowindow = new kakao.maps.InfoWindow({
            content: iwContent,
            removable: true,
          });

          // 마커 클릭 시 InfoWindow 열기
          kakao.maps.event.addListener(newMarker, 'click', function () {
            infowindow.open(kakaoMap, newMarker);

            const deleteBtn = document.getElementById(`delete-${markerId}`);
            deleteBtn?.addEventListener('click', () => {
              infowindow.close(); // InfoWindow 닫기
              markerDelete(); // 마커 제거
            });
          });
        },
      );

      kakaoMap.addControl(
        new kakao.maps.MapTypeControl(),
        kakao.maps.ControlPosition.TOPRIGHT,
      );
      kakaoMap.addControl(
        new kakao.maps.ZoomControl(),
        kakao.maps.ControlPosition.RIGHT,
      );
    });
  }, [scriptLoaded, coordinate]);

  const hideMarkers = () => {
    markers.forEach((marker) => marker.setMap(null));
  };

  const showMarkers = () => {
    if (!map) return;
    markers.forEach((marker) => marker.setMap(map));
  };

  // 마커 위도 경도 기준 나중에
  markers.forEach((marker, index) => {
    const pos = marker.getPosition();
    console.log(`📍 Marker ${index}:`, {
      lat: pos.getLat(),
      lng: pos.getLng(),
    });
  });

  return (
    <div className="relative">
      <div
        ref={mapRef}
        className=" pc:w-[1200px] pc:h-[854px] tb:w-[768px] tb:h-[706px] bg-gray-200"
      />

      <div className=" absolute flex gap-[10px] z-10 top-0 right-0 translate-y-60 ">
        {markers.length > 0 && (
          <>
            <button
              className="bg-[var(--white)] p-[10px] rounded-[20px]"
              onClick={hideMarkers}
            >
              마커 감추기
            </button>
            <button
              className="bg-[var(--white)] p-[10px] rounded-[20px]"
              onClick={showMarkers}
            >
              마커 보이기
            </button>
          </>
        )}
      </div>
    </div>
  );
}
