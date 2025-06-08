// 도시 별 경도 위도
type coordinate = Record<string, { y: number; x: number }>;

export const cityCoordinates: coordinate = {
  SEOUL: { y: 37.5729, x: 126.9794 },
  BUSAN: { y: 35.1068, x: 129.0312 },
  DAEGU: { y: 35.8683, x: 128.5988 },
  INCHEON: { y: 37.4643, x: 126.5904 },
  CWANGJU: { y: 35.173, x: 126.889 },
  GYEONJU: { y: 35.8562, x: 129.2247 },
  DAEJEON: { y: 36.3515, x: 127.4239 },
  ULSAN: { y: 35.5664, x: 129.319 },
  GYEONGGI: { y: 37.2636, x: 127.0286 }, // 수원 기준
  GANGWON: { y: 37.8816, x: 127.7291 }, // 춘천 기준
  CHUNGBUK: { y: 36.6419, x: 127.4898 }, // 청주 기준
  CHUNGNAM: { y: 36.8145, x: 127.1469 }, // 천안 기준
  GYEONGBUK: { y: 36.0194, x: 129.3434 }, // 포항 기준
  GYEONGNA: { y: 35.2372, x: 128.6811 }, // 창원 기준
  JEONJU: { y: 35.8242, x: 127.1489 },
  JEJU: { y: 33.4996, x: 126.5312 },
  JEONBUK: { y: 35.8194, x: 127.1063 }, // 전주 기준
  JEONNAM: { y: 34.812, x: 126.3917 }, // 목포 기준
  SEJONG: { y: 36.4801, x: 127.2889 },
};
