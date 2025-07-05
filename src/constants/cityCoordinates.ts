// 도시 별 경도 위도 (수정 필요시 이 파일을 수정하시면됩니다.)
// 우선 지금까지의 기준은 각 도시의 시청을 기준으로하였습니다.
type coordinate = Record<string, { y: number; x: number }>;

export const cityCoordinates: coordinate = {
  SEOUL: { y: 37.5665, x: 126.9784 },
  BUSAN: { y: 35.1795, x: 129.075 },
  DAEGU: { y: 35.8683, x: 128.5988 },
  INCHEON: { y: 37.456, x: 126.7053 },
  GWANGJU: { y: 35.16, x: 126.8512 },
  GYEONGJU: { y: 35.8562, x: 129.2247 },
  DAEJEON: { y: 36.3505, x: 127.3852 },
  ULSAN: { y: 35.5397, x: 129.3117 },
  GYEONGGI: { y: 37.2888, x: 127.054 },
  GANGWON: { y: 37.8855, x: 127.7299 },
  CHUNGBUK: { y: 36.6359, x: 127.4916 },
  CHUNGNAM: { y: 36.6592, x: 127.6731 },
  GYEONGBUK: { y: 36.5759, x: 128.5056 },
  GYEONGNAM: { y: 35.2378, x: 128.6919 },
  JEONJU: { y: 35.8241, x: 127.1483 },
  JEJU: { y: 33.4998, x: 126.5313 },
  JEONBUK: { y: 35.8201, x: 127.1088 },
  JEONNAM: { y: 34.816, x: 126.4629 },
  SEJONG: { y: 36.48, x: 127.2887 },
};
