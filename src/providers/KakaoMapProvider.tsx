import React, {
  createContext,
  useContext,
  useRef,
  useState,
  useEffect,
} from 'react';

interface KakaoMapContextValue {
  map: kakao.maps.Map | null;
  mapRef: React.RefObject<HTMLDivElement | null>;
  scriptLoaded: boolean;
}
const KakaoMapContext = createContext<KakaoMapContextValue | undefined>(
  undefined,
);

export function KakaoMapProvider({ center, level = 4, children }: any) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<kakao.maps.Map | null>(null);
  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    if (window.kakao && window.kakao.maps) {
      setScriptLoaded(true);
      return;
    }
    const script = document.createElement('script');
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_API_KAKAO_API_KEY}&libraries=services&autoload=false`;
    script.async = true;
    script.onload = () => setScriptLoaded(true);
    document.head.appendChild(script);

    return () => {
      script.onload = null;
      document.head.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (!scriptLoaded || !mapRef.current) return;
    window.kakao.maps.load(() => {
      const mapInstance = new window.kakao.maps.Map(mapRef.current!, {
        center: new window.kakao.maps.LatLng(center.lat, center.lng),
        level,
      });
      setMap(mapInstance);
    });
  }, [scriptLoaded, center.lat, center.lng, level]);

  return (
    <KakaoMapContext.Provider value={{ map, mapRef, scriptLoaded }}>
      {children}
    </KakaoMapContext.Provider>
  );
}

export function useKakaoMap() {
  const context = useContext(KakaoMapContext);
  if (!context) throw new Error('KaKaoMapProvider로 감싸주세요!!');
  return context;
}
