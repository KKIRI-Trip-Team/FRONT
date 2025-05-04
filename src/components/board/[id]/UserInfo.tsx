'use client';

import Image from 'next/image';

import OptionButton from '../OptionButton';
import BoardModifyIcon from '@/public/icons/board-modify-icon.svg';

import { BoardType } from '@/types/board';
import { useEffect, useRef, useState } from 'react';

export default function UserInfo({
  id,
  destination,
  period,
  mainTitle,
  subTitle,
  coverImage,
  profileImage,
  nickname,
  styles,
}: BoardType) {
  const [isOptionOpen, setIsOptionOpen] = useState<boolean>(false);
  const dropDownRef = useRef<HTMLDivElement | null>(null);

  const toggleOpen = () => {
    setIsOptionOpen((prev) => !prev);
  };

  useEffect(() => {
    const outSideClick = (e: MouseEvent) => {
      const { target } = e;
      if (
        isOptionOpen &&
        dropDownRef.current &&
        !dropDownRef.current.contains(target as Node)
      ) {
        setIsOptionOpen(false);
      }
    };
    document.addEventListener('mousedown', outSideClick);
  }, [isOptionOpen]);

  return (
    <section className="flex flex-col gap-[20px] bg-[var(--white)] self-stretch font-[Pretendard]">
      <Image
        className="self-stretch"
        src={coverImage}
        width={1200}
        height={750}
        alt={destination}
      />

      {/* 프로필영역 */}
      <div className="flex px-[20px] py-[0px] items-center gap-[10px]">
        <div className="w-[64px] h-[64px]">
          <Image
            className="shrink-0 rounded-[24px]"
            width={64}
            height={64}
            src={profileImage}
            alt={nickname}
          />
        </div>
        <div className=" text-[20px] font-bold leading-[30px] tracking-[-0.5px] text-[var(--Gray900)] flex-[1_0_0]">
          {nickname}
        </div>

        {/* 나중에 유저 id와 동일하면 버튼이 보이도록 수정 */}
        <div className="relative" ref={dropDownRef}>
          <div
            className="w-[36px] h-[36px] cursor-pointer"
            onClick={toggleOpen}
          >
            <BoardModifyIcon />
          </div>

          {isOptionOpen && (
            <div className="absolute right-0">
              <OptionButton />
            </div>
          )}
        </div>
      </div>

      {/* 구분선 */}
      <div className="h-[8px] bg-[var(--Gray100)]"></div>

      {/* 게시글 정보 */}
      <div className="flex px-[20px] py-[0px] flex-col items-start gap-[20px]">
        <div className="flex flex-col items-start gap-[4px]">
          <h1 className="text-[24px] font-bold leading-[34px] tracking-[-0.5px] text-[var(--Gray900)]">
            {mainTitle}
          </h1>
          <h2 className="text-[16px] font-bold leading-[22px] tracking-[-0.5px] text-[var(--Gray600)]">
            {subTitle}
          </h2>
        </div>
        <div className="flex flex-col items-start gap-[12px]">
          <div className="flex items-center gap-[24px]">
            <h1 className="w-[80px] text-[16px] font-normal leading-[22px] tracking-[-0.5px] text-[var(--Gray700)]">
              여행지역
            </h1>
            <span className="text-center text-[16px] font-bold leading-[22px] tracking-[-0.5px] text-[var(--Gray900)]">
              {destination}
            </span>
          </div>

          <div className="flex items-center gap-[24px]">
            <h1 className="w-[80px] text-[16px] font-normal leading-[22px] tracking-[-0.5px] text-[var(--Gray700)]">
              여행일정
            </h1>
            <span className="text-center text-[16px] font-bold leading-[22px] tracking-[-0.5px] text-[var(--Gray900)]">
              {period}
            </span>
          </div>

          <div className="flex items-center gap-[24px]">
            <h1 className="w-[80px] text-[16px] font-normal leading-[22px] tracking-[-0.5px] text-[var(--Gray700)]">
              여행메이트
            </h1>
            <div className="flex items-center gap-[12px] flex-[1_0_0] text-[16px] font-bold leading-[22px] tracking-[-0.5px] text-[var(--Gray900)]">
              <h1 className="text-center">20~30대</h1>
              <h1>여성</h1>
            </div>
          </div>

          <div className="flex items-center gap-[24px]">
            <h1 className="w-[80px] text-[16px] font-normal leading-[22px] tracking-[-0.5px] text-[var(--Gray700)]">
              비용
            </h1>
            <span className="text-center text-[16px] font-bold leading-[22px] tracking-[-0.5px] text-[var(--Gray900)]">
              400,000원
            </span>
          </div>
        </div>
      </div>

      {/* 구분선 */}
      <div className="h-[8px] bg-[var(--Gray100)]"></div>
    </section>
  );
}
