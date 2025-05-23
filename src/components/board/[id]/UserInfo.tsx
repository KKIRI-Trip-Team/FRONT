'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { useRouter, notFound } from 'next/navigation';

import OptionButton from '../OptionButton';
import BoardModifyIcon from '@/public/icons/board-modify-icon.svg';

import { useApi } from '@/hooks/useApi';
import { BoardData } from '@/types/board';

export default function UserInfo({ boardId }: { boardId: number }) {
  const [post, setPost] = useState<BoardData | null>(null);

  const [isOptionOpen, setIsOptionOpen] = useState(false);
  const dropDownRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();
  const { delete: deleteRequest, get, patch, error } = useApi<BoardData>();

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
  }, [boardId, get]);

  const handleEdit = () => {
    router.push(`/board/${boardId}/edit`);
  };

  const handleDelete = async () => {
    const confirmed = confirm('정말 삭제하시겠습니까?');
    if (!confirmed) return;
    try {
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
  if (!post) return <div className="p-4">불러오는 중...</div>;

  const {
    coverImage,
    profileImage,
    nickname,
    title,
    content,
    destination,
    period,
    expense,
    styles,
    ageRange,
    gender,
  } = post;

  return (
    <section className="flex flex-col gap-[20px] bg-[var(--white)] self-stretch font-[Pretendard]">
      {coverImage && (
        <Image
          className="self-stretch pc:w-[1200px] pc:h-[750px] tb:w-[768px] tb:h-[375px]"
          src={coverImage}
          alt={destination}
          width={1200}
          height={750}
        />
      )}

      <div className="flex px-[20px] items-center gap-[10px]">
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

        <div className="relative" ref={dropDownRef}>
          <div
            className="w-[36px] h-[36px] cursor-pointer"
            onClick={toggleOpen}
          >
            <BoardModifyIcon />
          </div>
          {isOptionOpen && (
            <div className="absolute right-0">
              <OptionButton onEdit={handleEdit} onDelete={handleDelete} />
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

        <div className="flex flex-col gap-[12px]">
          <InfoRow label="여행지역" value={destination} />
          <InfoRow label="여행일정" value={period} />
          <InfoRow
            label="여행메이트"
            value={styles?.map((style) => style.split(',').join(' '))}
          />
          <InfoRow label="비용" value={expense} />
        </div>
      </div>

      <div className="h-[8px] bg-[var(--Gray100)]" />
    </section>
  );
}

function InfoRow({
  label,
  value,
}: {
  label: string;
  value: string | string[];
}) {
  return (
    <div className="flex items-center gap-[24px]">
      <h1 className="w-[80px] text-[16px] text-[var(--Gray700)]">{label}</h1>
      <span className="text-[16px] font-bold text-[var(--Gray900)]">
        {value}
      </span>
    </div>
  );
}
