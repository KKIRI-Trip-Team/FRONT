'use client';

import { useEffect } from 'react';
import BoardCard from './boardCard/BoardCard';
import { useApi } from '@/hooks/useApi';
import { BoardType } from '@/types/board';

export default function MainBoard() {
  const { data: boards, isLoading, error, get } = useApi<BoardType[]>();

  useEffect(() => {
    get('feeds');
  }, [get]);

  if (isLoading) return <div className="p-4">불러오는 중...</div>;
  if (error) return <div className="p-4 text-red-500">에러: {error}</div>;
  if (!boards || boards.length === 0)
    return <div className="p-4">게시글이 없습니다</div>;

  return (
    <section className="flex px-[20px] py-[0px] items-start content-start gap-[20px] flex-wrap">
      {boards.map((content) => (
        <BoardCard key={content.id} {...content} />
      ))}
    </section>
  );
}
