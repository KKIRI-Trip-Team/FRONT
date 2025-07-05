// Board
// 기존 BoardData와 MyBoardContent를 하나의 통합 타입으로 재정의
export interface UnifiedBoardData {
  id: number;
  region: string;
  period: string;
  gender: string;
  ageGroup: string;
  cost: number;
  title: string;
  content: string;
  tripStyles: string[];
  // 공통 필드 (필수)
  coverImageUrl: string;
  // 옵셔널 필드 (마이페이지 응답에 없는 경우)
  email?: string;
  nickname?: string;
  profileUrl?: string;
  profileImage?: string;
  // 마이페이지 전용 필드
  owner?: any | null;
  imageUrls?: string[];
}

export interface MyBoardData {
  content: UnifiedBoardData[];
  pageInfo: {
    hasNextPage: boolean;
    hasPrevPage: boolean;
    totalPages: number;
    totalElements: number;
    currentPage: number;
    size: number;
  };
}

export type BoardApiResponse = UnifiedBoardData[] | MyBoardData;
// Schedule
export interface ScheduleData {
  feedId: number;
  scheduleId: number;
  places: ScheduleItem[];
}

export type ScheduleItem = {
  id: string;
  place_name: string;
  address_name: string;
  road_address_name: string;
  category_name: string;
  category_group_name: string;
  phone: string;
  x: string;
  y: string;
  place_url: string;
  distance: string;
};

// 백엔드 ENUM 통합
export const cityMap: Record<string, { name: string; emoji: string }> = {
  SEOUL: { name: '서울', emoji: '🗼' },
  BUSAN: { name: '부산', emoji: '🌊' },
  DAEGU: { name: '대구', emoji: '🌞' },
  INCHEON: { name: '인천', emoji: '🛫' },
  GWANGJU: { name: '광주', emoji: '💪' },
  GYEONGJU: { name: '경주', emoji: '🪷' },
  DAEJEON: { name: '대전', emoji: '🥯' },
  ULSAN: { name: '울산', emoji: '🌅' },
  SEJONG: { name: '세종', emoji: '🏛️' },
  GYEONGGI: { name: '경기', emoji: '🏙️' },
  GANGWON: { name: '강원', emoji: '🐠' },
  CHUNGBUK: { name: '충북', emoji: '🎍' },
  CHUNGNAM: { name: '충남', emoji: '🌰' },
  GYEONGBUK: { name: '경북', emoji: '🏔️' },
  GYEONGNAM: { name: '경남', emoji: '🦆' },
  JEONBUK: { name: '전북', emoji: '🍱' },
  JEONJU: { name: '전주', emoji: '🏯' },
  JEONNAM: { name: '전남', emoji: '🌾' },
  JEJU: { name: '제주', emoji: '🏝' },
};

export const periodMap: Record<string, { name: string; id?: number }> = {
  ANYTIME: { name: '아무떄나', id: 1 },
  DAY_TRIP: { name: '당일치기', id: 2 },
  ONE_NIGHT: { name: '1박 2일', id: 3 },
  TWO_NIGHT: { name: '2박 3일', id: 4 },
  THREE_NIGHT: { name: '3박 4일', id: 5 },
  FOUR_NIGHT: { name: '4박 5일', id: 6 },
  FIVE_NIGHT: { name: '5박 6일', id: 7 },
  OVER_SEVEN: { name: '7일 이상', id: 8 },
};

export const genderMap: Record<string, { name: string; emoji?: string }> = {
  FEMALE: { name: '여성', emoji: '👩' },
  MALE: { name: '남성', emoji: '👱‍♂️' },
  ANY: { name: '상관없음', emoji: '' },
};

export const ageGroupMap: Record<string, { name: string }> = {
  TWENTIES: { name: '20대' },
  THIRTIES: { name: '30대' },
  FORTIES: { name: '40대' },
  FIFTY_PLUS: { name: '50대' },
  ANY: { name: '상관없음' },
};

export const tripStyleMap: Record<string, { name: string; emoji: string }> = {
  REST: { name: '휴식', emoji: '🧘🍵' },
  EXPERIENCE: { name: '체험', emoji: '🤿' },
  ACTIVITY: { name: '액티비티', emoji: '🏃' },
  SHOPPING: { name: '쇼핑', emoji: '🛒🛍' },
  BROADEN_HORIZONS: { name: '견문넓히기', emoji: '🏛🖼' },
  GOURMET: { name: '식도락', emoji: '🍕🍖' },
  EMOTIONAL_TOUR: { name: '감성투어', emoji: '🌆' },
  COST_EFFECTIVE: { name: '가성비', emoji: '💸' },
  FLEX: { name: '플랙스', emoji: '🤑' },
  METICULOUS_PLANNING: { name: '꼼꼼한계획', emoji: '✍️⏱️' },
  SPONTANEOUS: { name: '즉흥', emoji: '🤹‍♀️' },
  NATURE_FRIENDLY: { name: '자연친화', emoji: '🌳' },
  RELAXED: { name: '여유', emoji: '⏳' },
  MUST_TAKE_PHOTO: { name: '인생샷필수', emoji: '📸' },
  HOT_PLACE: { name: '핫플', emoji: '🎪✨' },
  WAITING_OK: { name: '웨이팅가능', emoji: '📋' },
  ANY_NEARBY_RESTAURANT: { name: '근처아무식당', emoji: '🍽️' },
};
