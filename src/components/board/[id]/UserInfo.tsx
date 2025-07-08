'use client';

import Image from 'next/image';
import OptionButton from '../OptionButton';
import BoardModifyIcon from '@/public/icons/board-modify-icon.svg';
import DefaultProfileAuthPcIcon from '@/public/icons/default-profile-auth-icon-pc.svg';
import DefaultProfileAuthMobileIcon from '@/public/icons/default-profile-auth-icon-mobile.svg';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

import { useApi } from '@/hooks/useApi';
import {
  ageGroupMap,
  cityMap,
  genderMap,
  periodMap,
  tripStyleMap,
  UnifiedBoardData,
} from '@/types/board';
import { useAuthStore } from '@/store/authStore';
import { User } from '@/types/user';

interface UserId extends User {
  id: number;
}

export default function UserInfo({ boardId }: { boardId: number }) {
  const dropDownRef = useRef<HTMLDivElement | null>(null);
  const [post, setPost] = useState<UnifiedBoardData | null>(null);
  const [isOptionOpen, setIsOptionOpen] = useState(false);
  const { delete: deleteRequest, get } = useApi<UnifiedBoardData>();

  // 현재 로그인한 유저 정보 가져오기
  const user = useAuthStore().user as UserId;
  const router = useRouter();
  const isAuthor = user?.id === post?.owner.id;

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await get(`feeds/${boardId}`);
        setPost(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchPost();
  }, [boardId]);

  // 게시글 수정하기
  const handleModifyData = () => {
    router.push(`/board/edit/${boardId}`);
  };

  // 게시글 삭제하기
  const handleDelete = async () => {
    if (!boardId) {
      alert('삭제할 게시글이 존재하지 않습니다.');
      return;
    }

    const deleteConfrim = confirm('게시글을 삭제하시겠습니까?');
    if (!deleteConfrim) {
      return;
    }

    try {
      const res = await deleteRequest(`feeds/${boardId}`);

      if (res.statusCode !== 200) {
        throw new Error(`삭제 실패: ${res.statusCode}`);
      }

      alert('삭제되었습니다.');
      router.push('/');
    } catch (error) {
      alert('삭제 중 오류가 발생했습니다. 다시 시도해주세요.');
      // router.push('/') 안 함 -> 현재 페이지 유지
    }
  };

  const toggleOpen = () => {
    setIsOptionOpen((prev) => !prev);
  };

  useEffect(() => {
    // 외부 클릭 시 옵션 닫기
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

  if (!post) return <div className="p-4">게시글을 불러오는 중...</div>;

  const {
    imageUrls,
    title,
    content,
    region,
    period,
    cost,
    tripStyles,
    ageGroup,
    gender,
    owner,
  } = post;

  const coverImage = imageUrls?.[0]; // 첫 번째 이미지
  const regionName = cityMap[region]?.name;
  const regionEmoji = cityMap[region]?.emoji;
  const periodName = periodMap[period]?.name;
  const ageGroupName = ageGroupMap[ageGroup]?.name;
  const genderName = genderMap[gender]?.name;
  const genderEmoji = genderMap[gender]?.emoji;

  return (
    <section className="flex flex-col gap-[20px] bg-[var(--white)] self-stretch font-[Pretendard]">
      {coverImage && (
        <Image
          className="self-stretch pc:w-[1200px] pc:h-[750px] tb:w-[768px] tb:h-[375px] mb:w-[375px] mb:h-[375px]"
          src={`https://trebuddy-s3-bucket.s3.ap-northeast-2.amazonaws.com/${coverImage}`}
          alt={region}
          width={1200}
          height={750}
        />
      )}

      <div className="flex px-[20px] items-center gap-[10px] self-stretch">
        <div className="w-[64px] h-[64px]">
          {owner && owner.profileUrl !== '' ? (
            <Image
              className="w-[64px] h-[64px] shrink-0 rounded-[24px]"
              width={64}
              height={64}
              src={`https://trebuddy-s3-bucket.s3.ap-northeast-2.amazonaws.com/${owner?.profileUrl}`}
              alt={'userProfile'}
            />
          ) : (
            <>
              <DefaultProfileAuthPcIcon className="hidden w-full h-full pc:block" />
              <DefaultProfileAuthMobileIcon className="block w-full h-full pc:hidden" />
            </>
          )}
        </div>
        <div className="text-[20px] font-bold leading-[30px] tracking-[-0.5px] text-[var(--Gray900)] flex-1">
          {owner.nickname}
        </div>

        {/* 게시글 ID와 로그인한 유저 ID가 같을 때만 보이도록 */}
        {isAuthor ? (
          <div className="relative" ref={dropDownRef}>
            <div
              className="w-[36px] h-[36px] cursor-pointer"
              onClick={toggleOpen}
            >
              <BoardModifyIcon />
            </div>

            {isOptionOpen && (
              <div className="absolute right-0">
                <OptionButton
                  onEdit={handleModifyData}
                  onDelete={handleDelete}
                />
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={() =>
              console.log('여행 참여하기 버튼 아직 미개발 Coming Soon!!!')
            }
            className="flex w-[160px] px-[0px] py-[16px] justify-center items-cetner gap-[10px] rounded-[8px] bg-[var(--Primary)] text-white"
          >
            여행 참여하기
          </button>
        )}
      </div>

      {/* 구분선 */}
      <div className="h-[8px] bg-[var(--Gray100)]" />

      <div className="flex flex-col gap-[20px] px-[20px] py-[0px]]">
        <div className="flex flex-col gap-[4px] self-stretch">
          <h1 className="text-[24px] font-bold text-[var(--Gray900)]">
            {title}
          </h1>
          <h2 className="text-[16px] font-bold text-[var(--Gray600)]">
            {content}
          </h2>
        </div>

        <div className="flex flex-col items-start gap-[12px] self-stretch">
          <InfoRow label="여행지역" value={`${regionName} ${regionEmoji}`} />
          <InfoRow label="여행일정" value={periodName} />
          <InfoRow
            label="여행메이트"
            value={`${ageGroupName} | ${genderEmoji} ${genderName}`}
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
              .join(', ')}
          />
          <InfoRow label="비용" value={cost.toLocaleString()} />
        </div>
      </div>

      {/* 구분선 */}
      <div className="h-[8px] bg-[var(--Gray100)]" />
    </section>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center gap-[24px] self-stretch">
      <h1 className="w-[80px] text-[16px] text-[var(--Gray700)]">{label}</h1>
      <span className="text-[16px] font-bold text-[var(--Gray900)]">
        {value}
      </span>
    </div>
  );
}
