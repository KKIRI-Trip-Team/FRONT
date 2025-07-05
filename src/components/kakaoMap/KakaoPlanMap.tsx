'use client';

import ArrowIcon from '@/public/icons/right-arrow-icon.svg';

import { createPortal } from 'react-dom';

import { useEffect, useRef, useState } from 'react';

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

// 여행 게시글 생성시 사용되는 카카오맵 컴포넌트

export default function KakaoPlanMap({ funnel }: KakaoMapProps) {
  // 클라이언트 상태 관리
  const { daysPlan, trip } = useTripFunnelStore();
  const region = trip.region;
  const currentDay = useTripFunnelStore((s) => s.currentDay);
  const placeFromScheduleItem = useMapStore((s) => s.selectedPlace);

  const setMapSelectedPlace = useMapStore((s) => s.setSelectedPlace);
  const clearSelectedPlace = useMapStore((s) => s.clearSelectedPlace);

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

  // 카카오맵 PlacesService 인스턴스 생성
  useEffect(() => {
    // [목적] map과 스크립트가 모두 준비되면, 카카오 PlacesService를 초기화 (장소검색 API 사용 위해)
    if (map && scriptLoaded) {
      placesServiceRef.current = new window.kakao.maps.services.Places(map);
    }
  }, [map, scriptLoaded]);

  // 지도에 컨트롤(지도/줌) 추가 (최초 1회)
  useEffect(() => {
    // [목적] 지도 타입/줌 컨트롤을 최초 map 마운트 시 1회만 추가
    if (!map) return;
    const mapTypeControl = new window.kakao.maps.MapTypeControl();
    const zoomControl = new window.kakao.maps.ZoomControl();
    map.addControl(mapTypeControl, window.kakao.maps.ControlPosition.TOPRIGHT);
    map.addControl(zoomControl, window.kakao.maps.ControlPosition.RIGHT);
  }, [map]);

  // markers 배열이 변할 때마다 이전 마커들 정리
  useEffect(() => {
    // markers가 변경될 때, 이전 마커들을 지도에서 제거해 메모리릭 방지
    return () => {
      markers.forEach((marker) => marker.setMap(null));
    };
  }, [markers]);

  // region(여행 지역)이 바뀔 때 모든 상태/마커/오버레이 초기화
  useEffect(() => {
    // 사용자가 여행 지역(region)을 변경하면
    //  - 이전 지역의 마커, 오버레이, 선택상태, 카테고리/검색어 모두 초기화
    markers.forEach((marker) => marker.setMap(null));
    setMarkers([]);
    if (placeOverlay) {
      placeOverlay.setMap(null);
      setPlaceOverlay(null);
    }
    setSelectedPlace(null);
    overlayRef.current = null;

    setCurrentCategory(undefined);
    setKeyword('');
    clearSelectedPlace(); // zustand 스토어도 초기화
  }, [region]);

  // 요일(currentDay)이나 일정(daysPlan)이 바뀔 때 마커 갱신
  useEffect(() => {
    // 날짜(요일) 또는 일정 데이터가 바뀔 때
    //  - 포커싱된 오버레이가 없을 때만, 해당 날짜의 장소 리스트로 마커들 다시 그리기
    if (!map) return;
    if (selectedPlace !== null) return; // 오버레이가 열려있으면 렌더링 안함

    // 기존 마커 제거
    markers.forEach((m) => m.setMap(null));
    setMarkers([]);

    // 새로운 마커 생성 및 지도에 추가
    const currentPlaces =
      daysPlan.find((d) => d.day === currentDay)?.places || [];
    const newMarkers = currentPlaces.map((place) => {
      const position = new kakao.maps.LatLng(+place.y, +place.x);
      const marker = new kakao.maps.Marker({ position });
      marker.setMap(map);

      // 마커 클릭 시 오버레이 띄우기
      kakao.maps.event.addListener(marker, 'click', () => {
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
  }, [currentDay, map, daysPlan, selectedPlace]);

  // placeFromScheduleItem(특정 장소 포커스) 변경 시 단일 마커+오버레이 띄우기
  useEffect(() => {
    // 상세 일정 클릭 등으로 특정 장소를 포커스할 때,
    //  - 기존 마커/오버레이를 모두 지우고, 해당 장소에 단일 마커와 오버레이만 띄움
    if (!map || !placeFromScheduleItem) return;

    const { kakao } = window;
    const { x, y } = placeFromScheduleItem;
    const position = new kakao.maps.LatLng(+y, +x);

    markers.forEach((marker) => marker.setMap(null));
    if (placeOverlay) placeOverlay.setMap(null);

    // 포커스된 장소에만 마커/오버레이 생성
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
