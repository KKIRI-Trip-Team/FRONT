'use client';

import Image from 'next/image';
import OptionButton from '../OptionButton';
import BoardModifyIcon from '@/public/icons/board-modify-icon.svg';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

import { useApi } from '@/hooks/useApi';
import {
  ageGroupMap,
  BoardData,
  cityMap,
  genderMap,
  periodMap,
  tripStyleMap,
} from '@/types/board';
import { useAuthStore } from '@/store/authStore';

export default function UserInfo({ boardId }: { boardId: number }) {
  const [post, setPost] = useState<BoardData | null>(null);
  const [isOptionOpen, setIsOptionOpen] = useState(false);
  const dropDownRef = useRef<HTMLDivElement | null>(null);

  const { delete: deleteRequest, get, error } = useApi<BoardData>();
  const user = useAuthStore.getState().user;

  const router = useRouter();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await get(`feeds/${boardId}`);
        setPost(response.data);
        console.log(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchPost();
  }, [boardId]);

  const handleModifyData = () => {
    router.push(`/board/edit/${boardId}`);
  };

  const handleDelete = async () => {
    if (!boardId) {
      alert('삭제할 게시글이 존재하지 않습니다.');
    }
    try {
      const confirmed = confirm('정말 삭제하시겠습니까?');
      if (!confirmed) return;

      await deleteRequest(`feeds/${boardId}`);

      alert('삭제되었습니다.');
      router.push('/');
    } catch (error) {
      alert('삭제 중 오류가 발생하였습니다.');
      console.log(error);
    }
  };

  const toggleOpen = () => {
    setIsOptionOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        isOptionOpen &&
        dropDownRef.current &&
        !dropDownRef.current.contains(e.target as Node)
      ) {
        setIsOptionOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [isOptionOpen]);

  if (error) return <div className="p-4 text-red-500">오류 발생: {error}</div>;

  if (!post) {
    return (
      <div className="p-4">
        해당 게시글 정보를 불러오는데 오류가 발생하였습니다
      </div>
    );
  }

  const {
    coverImageUrl,
    profileImage,
    nickname,
    title,
    content,
    region,
    period,
    cost,
    tripStyles,
    ageGroup,
    gender,
  } = post;

  const regionName = cityMap[region]?.name;
  const periodName = periodMap[period]?.name;
  const ageGroupName = ageGroupMap[ageGroup]?.name;

  const genderName = genderMap[gender]?.name;
  const genderEmoji = genderMap[gender]?.emoji;

  return (
    <section className="flex flex-col gap-[20px] bg-[var(--white)] self-stretch font-[Pretendard]">
      {coverImageUrl && (
        <Image
          className="self-stretch pc:w-[1200px] pc:h-[750px] tb:w-[768px] tb:h-[375px]"
          src={coverImageUrl}
          alt={region}
          width={1200}
          height={750}
        />
      )}

      <div className="flex px-[20px] items-center gap-[10px] self-stretch">
        <div className="w-[64px] h-[64px]">
          {profileImage && (
            <Image
              className="shrink-0 rounded-[24px]"
              width={64}
              height={64}
              src={profileImage}
              alt={nickname}
            />
          )}
        </div>
        <div className="text-[20px] font-bold leading-[30px] tracking-[-0.5px] text-[var(--Gray900)] flex-1">
          {nickname}
        </div>

        {/* 게시글 Id 와 로그인한 유저의 Id값이 일치한 경우에만 보이도록 */}
        <div className="relative" ref={dropDownRef}>
          <div
            className="w-[36px] h-[36px] cursor-pointer"
            onClick={toggleOpen}
          >
            <BoardModifyIcon />
          </div>
          {isOptionOpen && (
            <div className="absolute right-0">
              <OptionButton onEdit={handleModifyData} onDelete={handleDelete} />
            </div>
          )}
        </div>
      </div>

      <div className="h-[8px] bg-[var(--Gray100)]" />

      <div className="flex flex-col gap-[20px] px-[20px]">
        <div className="flex flex-col gap-[4px]">
          <h1 className="text-[24px] font-bold text-[var(--Gray900)]">
            {title}
          </h1>
          <h2 className="text-[16px] font-bold text-[var(--Gray600)]">
            {content}
          </h2>
        </div>

        <div className="flex flex-col items-start gap-[12px] self-stretch">
          <InfoRow label="여행지역" value={regionName} />
          <InfoRow label="여행일정" value={periodName} />
          <InfoRow
            label="여행메이트"
            value={`${ageGroupName} ${genderEmoji} ${genderName}`}
          />
          <InfoRow
            label="여행스타일"
            value={tripStyles
              .map((style) => {
                const found = Object.entries(tripStyleMap).find(
                  ([key, { name, emoji }]) => key === style || name === style,
                );
                return found ? `${found[1].name} ${found[1].emoji}` : style;
              })
              .join(' ')}
          />
          <InfoRow label="비용" value={cost.toLocaleString()} />
        </div>
      </div>

      <div className="h-[8px] bg-[var(--Gray100)]" />
    </section>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center gap-[24px] self-stretch">
      <h1 className="w-[80px] text-[16px] text-[var(--Gray700)]">{label}</h1>
      <span className="text-[16px] font-bold text-[var(--Gray900)]">
        {Array.isArray(value) ? value.join(' ') : value}
      </span>
    </div>
  );
}
