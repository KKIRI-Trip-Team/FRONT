'use client';

import ArrowIcon from '@/public/icons/right-arrow-icon.svg';

import { createPortal } from 'react-dom';

import { useEffect, useRef, useState } from 'react';

import { cityCoordinates } from '@/constants/cityCoordinates';
import { KakaoCategory } from '@/constants/kakaoCategory';
import { useMapStore } from '@/store/mapStore';
import { useTripFunnelStore } from '@/store/tripFunnelStore';
import { useKakaoMap } from '@/providers/KakaoMapProvider';
import { UseFunnelResults } from '@use-funnel/browser';
import { BoardRegisterSteps } from '@/types/boardFunnel';

interface KakaoCategoryItem {
  id: KakaoCategory;
  label: string;
}

interface PlaceOverlayProps {
  places: kakao.maps.services.PlacesSearchResultItem;
  onClose: () => void;
}

interface CategorySelectProps {
  currentCategory: KakaoCategory | undefined;
  onChange: (category: KakaoCategory | undefined) => void;
}

interface KakaoMapProps {
  funnel: UseFunnelResults<
    BoardRegisterSteps,
    BoardRegisterSteps['detailStep']
  >;
}
// 카테고리 목록
const kakaoCategoryList: KakaoCategoryItem[] = [
  { id: 'MT1', label: '대형마트' },
  { id: 'CS2', label: '편의점' },
  { id: 'PK6', label: '주차장' },
  { id: 'OL7', label: '주유소/충전소' },
  { id: 'SW8', label: '지하철역' },
  { id: 'CT1', label: '문화시설' },
  { id: 'PO3', label: '공공기관' },
  { id: 'AT4', label: '관광명소' },
  { id: 'AD5', label: '숙박' },
  { id: 'FD6', label: '음식점' },
  { id: 'CE7', label: '카페' },
  { id: 'HP8', label: '병원' },
  { id: 'PM9', label: '약국' },
  { id: 'BK9', label: '은행' },
];

// 카테고리 옵션 컴포넌트
function CategorySelect({ currentCategory, onChange }: CategorySelectProps) {
  return (
    <select
      onChange={(e) => {
        const selected = e.target.value as KakaoCategory;
        onChange(currentCategory === selected ? undefined : selected);
      }}
      className=" bg-white p-2 rounded-lg shadow cursor-pointer"
    >
      <option value="">카테고리 선택</option>
      {kakaoCategoryList.map((category) => (
        <option key={category.id} value={category.id}>
          {category.label}
        </option>
      ))}
    </select>
  );
}

// 마커 오버레이 동작시 건물 이름 + 전화번호 + 주소등을 보여줄 컴포넌트
function DisplayPlaceInfo({ places, onClose }: PlaceOverlayProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        onClose();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  if (!places) {
    console.log('데이터와 일치하는 항목이 없습니다.');
  }

  return (
    <div
      ref={containerRef}
      className="relative placeinfo w-full bg-white p-2 rounded-lg shadow-lg text-sm flex flex-col font-[Pretendard]"
    >
      <a
        className="flex justify-between text-[var(--PrimaryLight)] font-bold mb-1 items-center text-center"
        href={places.place_url}
        target="_blank"
        rel="noopener noreferrer"
      >
        {places.place_name}
        <ArrowIcon />
      </a>

      <div>
        <div>{places.road_address_name || places.address_name}</div>
        {places.road_address_name && (
          <div className="text-[var(--Gray400)] text-xs">
            (지번: {places.address_name})
          </div>
        )}
        <div className="text-xs mt-1">
          {places.phone ? places.phone : '등록된 전화번호가 없습니다'}
        </div>
      </div>
    </div>
  );
}

export default function KakaoMap({ funnel }: KakaoMapProps) {
  // Zustand 등 외부 상태
  const { daysPlan } = useTripFunnelStore();
  const placeFromScheduleItem = useMapStore((s) => s.selectedPlace);
  const currentDay = useTripFunnelStore((s) => s.currentDay);
  const setMapSelectedPlace = useMapStore((s) => s.setSelectedPlace);

  // Provider에서 받아옴
  const { mapRef, map, scriptLoaded } = useKakaoMap();

  // 내부 UI 상태
  const [markers, setMarkers] = useState<kakao.maps.Marker[]>([]);
  const [selectedPlace, setSelectedPlace] =
    useState<kakao.maps.services.PlacesSearchResultItem | null>(null);
  const [placeOverlay, setPlaceOverlay] =
    useState<kakao.maps.CustomOverlay | null>(null);
  const [currentCategory, setCurrentCategory] = useState<KakaoCategory>();

  const placesServiceRef = useRef<kakao.maps.services.Places | undefined>(
    undefined,
  );
  const overlayRef = useRef<HTMLDivElement>(null);
  const categoryRef = useRef<KakaoCategory | undefined>(undefined);
  const searchPlacesRef = useRef<() => void | undefined>(undefined);
  const [keyword, setKeyword] = useState('');

  // 서비스 초기화
  useEffect(() => {
    if (map && scriptLoaded) {
      placesServiceRef.current = new window.kakao.maps.services.Places(map);
    }
  }, [map, scriptLoaded]);

  // 지도 컨트롤 추가
  useEffect(() => {
    if (!map) return;
    const mapTypeControl = new window.kakao.maps.MapTypeControl();
    const zoomControl = new window.kakao.maps.ZoomControl();
    map.addControl(mapTypeControl, window.kakao.maps.ControlPosition.TOPRIGHT);
    map.addControl(zoomControl, window.kakao.maps.ControlPosition.RIGHT);
  }, [map]);

  // 마커 정리
  useEffect(() => {
    return () => {
      markers.forEach((marker) => marker.setMap(null));
    };
  }, [markers]);

  useEffect(() => {
    if (!map) return;

    // 포커싱 상태가 아닐 때만 전체 마커 다시 렌더
    if (selectedPlace === null) {
      const { kakao } = window;
      const currentPlaces =
        daysPlan.find((d) => d.day === currentDay)?.places || [];

      // 기존 마커 모두 제거
      markers.forEach((m) => m.setMap(null));
      setMarkers([]);

      // 새로운 마커 생성
      const newMarkers = currentPlaces.map((place) => {
        const position = new kakao.maps.LatLng(+place.y, +place.x);
        const marker = new kakao.maps.Marker({ position });
        marker.setMap(map);

        kakao.maps.event.addListener(marker, 'click', () => {
          // 이 부분은 기존대로, 포커싱으로 들어감
          const container = document.createElement('div');
          overlayRef.current = container;

          const overlay = new kakao.maps.CustomOverlay({
            content: container,
            position: marker.getPosition(),
          });

          setSelectedPlace(place);
          setPlaceOverlay(overlay);
          overlay.setMap(map);
        });
        return marker;
      });

      setMarkers(newMarkers);
    }
  }, [currentDay, map, daysPlan, selectedPlace]);

  useEffect(() => {
    if (!map || !placeFromScheduleItem) return;

    const { kakao } = window;
    const { x, y } = placeFromScheduleItem;

    const position = new kakao.maps.LatLng(+y, +x);

    markers.forEach((marker) => marker.setMap(null));
    if (placeOverlay) placeOverlay.setMap(null);

    const marker = new kakao.maps.Marker({ position });
    marker.setMap(map);
    setMarkers([marker]);

    const container = document.createElement('div');
    overlayRef.current = container;

    const overlay = new kakao.maps.CustomOverlay({
      content: container,
      position: marker.getPosition(),
    });

    setPlaceOverlay(overlay);
    setSelectedPlace(placeFromScheduleItem);
    overlay.setMap(map);
    map.setCenter(position);
  }, [placeFromScheduleItem, map]);

  // 카테고리 변경
  const handleCategoryChange = (category: KakaoCategory | undefined) => {
    const { kakao } = window;

    if (!map || !placesServiceRef.current) return;

    // 기존 오버레이 제거
    setSelectedPlace(null);
    setMarkers([]);

    if (!category) {
      setCurrentCategory(undefined);
      categoryRef.current = undefined;

      if (searchPlacesRef.current) {
        kakao.maps.event.removeListener(map, 'idle', searchPlacesRef.current);
      }
      return;
    }

    // 이벤트 제거 후 다시 등록
    if (searchPlacesRef.current) {
      kakao.maps.event.removeListener(map, 'idle', searchPlacesRef.current);
    }

    setCurrentCategory(category);
    categoryRef.current = category;

    const searchPlaces = () => {
      if (!categoryRef.current || !placesServiceRef.current) return;

      placesServiceRef.current.categorySearch(
        categoryRef.current,
        (data, status) => {
          if (status === kakao.maps.services.Status.OK) {
            // 마커 정리
            markers.forEach((marker) => marker.setMap(null));

            const newMarkers = data.map((place) => {
              const position = new kakao.maps.LatLng(+place.y, +place.x);
              const marker = new kakao.maps.Marker({ position });
              marker.setMap(map);

              kakao.maps.event.addListener(marker, 'click', () => {
                setMapSelectedPlace(place);
                setSelectedPlace(place);
                if (placeOverlay) {
                  placeOverlay.setMap(null); // 기존꺼 제거
                }
                const container = document.createElement('div');
                overlayRef.current = container;

                const overlay = new kakao.maps.CustomOverlay({
                  content: container,
                  position: marker.getPosition(),
                });
                overlay.setMap(map);
                setPlaceOverlay(overlay);
              });

              return marker;
            });

            setMarkers(newMarkers);

            console.log(
              '📍 검색된 장소:',
              data.map((p) => ({
                name: p.place_name,
                address: p.address_name,
                category: p.category_name,
              })),
            );
          }
        },
        { useMapBounds: true },
      );
    };

    searchPlacesRef.current = searchPlaces;
    kakao.maps.event.addListener(map, 'idle', searchPlacesRef.current);

    // 최초 실행
    searchPlaces();
  };

  // 키워드 검색 함수
  const handleKeywordSearch = () => {
    const { kakao } = window;
    if (!map || !placesServiceRef.current || !keyword.trim()) return;

    setCurrentCategory(undefined); // 카테고리 선택 해제
    categoryRef.current = undefined;
    setSelectedPlace(null);
    markers.forEach((marker) => marker.setMap(null));
    setMarkers([]);

    placesServiceRef.current.keywordSearch(
      keyword,
      (data, status) => {
        if (status === kakao.maps.services.Status.OK) {
          const newMarkers = data.map((place) => {
            const position = new kakao.maps.LatLng(+place.y, +place.x);
            const marker = new kakao.maps.Marker({ position });
            marker.setMap(map);

            kakao.maps.event.addListener(marker, 'click', () => {
              setMapSelectedPlace(place);
              setSelectedPlace(place);
              if (placeOverlay) {
                placeOverlay.setMap(null);
              }

              const container = document.createElement('div');
              overlayRef.current = container;

              const overlay = new kakao.maps.CustomOverlay({
                content: container,
                position: marker.getPosition(),
              });

              overlay.setMap(map);
              setPlaceOverlay(overlay);
            });

            return marker;
          });

          setMarkers(newMarkers);
        } else {
          alert('검색 결과가 없습니다.');
        }
      },
      { useMapBounds: true },
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleKeywordSearch();
    }
  };

  return (
    <div className="relative w-full pc:h-[854px] tb:h-[712px]">
      <div
        ref={mapRef}
        className="w-full pc:h-[854px] tb:h-[712px] bg-gray-200"
      />
      <div className="absolute flex flex-col gap-[5px] tb:left-4 tb:top-4 z-10 pc:translate-x-[320px] pc:translate-y-[10px]">
        <CategorySelect
          currentCategory={currentCategory}
          onChange={(selected) => {
            setKeyword('');
            handleCategoryChange(selected);
          }}
        />
        <div className="flex gap-[2px]">
          <input
            type="text"
            placeholder="검색어 입력"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={handleKeyDown}
            className="bg-white p-2 rounded-lg shadow text-sm w-[150px]"
          />
          <button
            onClick={handleKeywordSearch}
            className="bg-[var(--PrimaryLight)] text-white px-3 py-2 rounded-lg text-sm"
          >
            검색
          </button>
        </div>
      </div>
      {selectedPlace &&
        overlayRef.current &&
        createPortal(
          <DisplayPlaceInfo
            places={selectedPlace}
            onClose={() => {
              if (placeOverlay) {
                placeOverlay.setMap(null);
                setPlaceOverlay(null);
                setSelectedPlace(null);
              }
            }}
          />,
          overlayRef.current,
        )}
    </div>
  );
}
