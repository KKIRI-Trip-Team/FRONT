import { StaticImageData } from 'next/image';

export interface BoardData {
  id: number;
  title: string;
  destination: string;
  period: string;
  gender: string;
  ageRange: string[];
  expense: string;
  content: string;
  imageUrl: string;
  email: string;
  nickname: string;
  profileUrl: string;
  coverImage: string | StaticImageData;
  profileImage: string | StaticImageData;
  styles: string[];
}

export interface ScheduleData {
  id: number;
  dayNumber: number;
  feedId: number;
}
