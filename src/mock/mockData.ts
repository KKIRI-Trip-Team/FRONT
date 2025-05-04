// 임시 저장용 데이터. 추후 삭제예정

import coverImage1 from '@/public/images/coverImage1.png';
import coverImage2 from '@/public/images/coverImage2.png';
import coverImage3 from '@/public/images/coverImage3.png';
import coverImage4 from '@/public/images/coverImage4.png';
import coverImage5 from '@/public/images/coverImage5.png';
import coverImage6 from '@/public/images/coverImage6.png';
import coverImage7 from '@/public/images/coverImage7.png';
import coverImage8 from '@/public/images/coverImage8.png';
import coverImage9 from '@/public/images/coverImage9.png';
import coverImage10 from '@/public/images/coverImage10.png';

import profileImage1 from '@/public/images/profileImage1.png';
import profileImage2 from '@/public/images/profileImage2.png';
import profileImage3 from '@/public/images/profileImage3.png';

import { BoardType } from '@/types/board';

export const mockData: BoardType[] = [
  {
    id: 1,
    destination: '부산',
    period: '3박 4일',
    mainTitle: '부산 봄 즐기기',
    subTitle: '생각보다 할 것도, 먹을 것도 많아서 바빳던 ... ',
    coverImage: coverImage1,
    profileImage: profileImage1,
    nickname: '트레버디1',
    styles: ['#20~30대', '#자연친화', '#견문 넓히기', '#휴식'],
  },
  {
    id: 2,
    destination: '전주',
    period: '1박 2일',
    mainTitle: '긴 휴가보다 1박 2일 전주여행',
    subTitle: '전주 먹방여행',
    coverImage: coverImage2,
    profileImage: profileImage2,
    nickname: '트레버디2',
    styles: ['#20대', '#감성투어', '#가성비', '#웨이팅 가능'],
  },
  {
    id: 3,
    destination: '서울',
    period: '아무때나',
    mainTitle: '벚꽃놀이 가실분',
    subTitle: '서울 벚꽃 명소 도장꺠기 고고씽 시간 맞을떄만 만나요',
    coverImage: coverImage3,
    profileImage: profileImage3,
    nickname: '트레버디3',
    styles: ['#20~50대', '#핫플', '#자연친화', '#인생샷필수'],
  },
  {
    id: 4,
    destination: '경북',
    period: '당일치기',
    mainTitle: '낮과 밤 언제나 아름다운, 낙동강',
    subTitle: "강을 보며 잠시 쉬어가기 좋은 '월영정'",
    coverImage: coverImage4,
    profileImage: profileImage3,
    nickname: '트레버디4',
    styles: ['#40대', '#휴식', '#자연친화', '#감성투어'],
  },
  {
    id: 5,
    destination: '경북',
    period: '1박 2일',
    mainTitle: '관광파 vs 힐링파, 1박 2일 추천 코스',
    subTitle:
      '생각보다 할 것도, 먹을 것도 많아서 바빳던 안동여행!!! 일직식 ...',
    coverImage: coverImage5,
    profileImage: profileImage3,
    nickname: '트레버디5',
    styles: ['#30대', '#식도락', '#웨이팅 가능', '#플랙스'],
  },
  {
    id: 6,
    destination: '강원',
    period: '당일치기',
    mainTitle: '닭강정에 진심임',
    subTitle: '닭강정부터 오징어순대까지 속처 먹방의 중심지',
    coverImage: coverImage6,
    profileImage: profileImage3,
    nickname: '트레버디6',
    styles: ['#30대', '#식도락', '#웨이팅 가능', '#플랙스'],
  },
  {
    id: 7,
    destination: '전남',
    period: '1박 2일',
    mainTitle: '여수 1박 2일  코스💕',
    subTitle: '취향 따라 선택하는 여수 카페 추천',
    coverImage: coverImage7,
    profileImage: profileImage3,
    nickname: '트레버디7',
    styles: ['#40대', '#식도락', '#휴식', '#핫플'],
  },
  {
    id: 8,
    destination: '부산',
    period: '3박 4일',
    mainTitle: '♡ 레트로 키치 힐링 부산 여행 ✮',
    subTitle: '러블리한여행~ ',
    coverImage: coverImage8,
    profileImage: profileImage3,
    nickname: '트레버디8',
    styles: ['#20~30대', '#자연친화', '#견문 넓히기', '#휴식'],
  },
  {
    id: 9,
    destination: '제주',
    period: '일주일',
    mainTitle: '일주일 추천 코스',
    subTitle: '우도가 선물하는 힐링 타임',
    coverImage: coverImage9,
    profileImage: profileImage3,
    nickname: '트레버디9',
    styles: ['#20대', '#자연친화', '#견문 넓히기', '#휴식'],
  },
  {
    id: 10,
    destination: '강원',
    period: '아무때나',
    mainTitle: '속초아이 사진찍어요',
    subTitle: '찐으로 좋았던 곳만 모은 속초 여행 코스 추천 🌊',
    coverImage: coverImage10,
    profileImage: profileImage3,
    nickname: '트레버디10',
    styles: ['#30대', '#자연친화', '#견문 넓히기', '#휴식'],
  },
];
