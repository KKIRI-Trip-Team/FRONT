'use client';
import BoardCard from './boardCard/BoardCard';
import { useEffect } from 'react';
import { useApi } from '@/hooks/useApi';
import { BoardApiResponse, MyBoardData } from '@/types/board';

// 타입 가드 함수
function isMyBoardData(data: BoardApiResponse): data is MyBoardData {
  return typeof data === 'object' && 'content' in data;
}

export default function MainBoard({
  type = 'Main',
}: {
  type?: 'Main' | 'Mypage';
}) {
  const { data: boards, isLoading, get } = useApi<BoardApiResponse>();

  useEffect(() => {
    type === 'Main' ? get('feeds') : get('user/me/feeds?page=1&size=10');
  }, [get]);

  // if (isLoading)
  //   return <div className="p-4 text-center">게시글 불러오는 중...</div>;

  // 데이터 없음 처리
  if (
    !boards ||
    (Array.isArray(boards) && boards.length === 0) ||
    (isMyBoardData(boards) && boards.content.length === 0)
  ) {
    return <div className="p-4">게시글이 없습니다</div>;
  }

  // 실제 렌더링 데이터 추출
  const boardList = isMyBoardData(boards) ? boards.content : boards;

  return (
    <section
      className={`flex ${type === 'Main' ? 'px-[20px]' : ''} py-0 items-start gap-5 flex-wrap`}
    >
      {boardList.map((content) => (
        <BoardCard
          key={content.id}
          {...content}
          // 마이페이지 응답에 없는 필드 기본값 처리
          coverImageUrl={content.coverImageUrl || content.imageUrls?.[0] || ''}
          email={content.email || ''}
          nickname={content.nickname || '익명'}
          profileUrl={content.profileUrl || ''}
          profileImage={content.profileImage || ''}
        />
      ))}
    </section>
  );
}
