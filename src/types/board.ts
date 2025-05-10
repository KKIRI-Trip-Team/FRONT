import type { StaticImageData } from 'next/image';

export interface BoardType {
  id: number;
  destination: string;
  period: string;
  mainTitle: string;
  subTitle: string;
  coverImage: string | StaticImageData;
  profileImage: string | StaticImageData;
  nickname: string;
  styles: string[];
}
