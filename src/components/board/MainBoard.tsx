'use client';

import BoardCard from './boardCard/BoardCard';

import { useEffect } from 'react';

import { useApi } from '@/hooks/useApi';
import { BoardData } from '@/types/board';

export default function MainBoard() {
  const { data: boards, isLoading, get } = useApi<BoardData[]>();

  useEffect(() => {
    get('feeds');
  }, [get]);

  if (isLoading) {
    return <div className="p-4 text-center">게시글 불러오는 중...</div>;
  }

  // if (!boards || boards.length === 0) {
  //   return <div className="p-4">게시글이 없습니다</div>;
  // }

  console.log(boards);

  return (
    <section className="flex px-[20px] py-[0px] items-start content-start gap-[20px] flex-wrap">
      {boards?.map((content) => <BoardCard key={content.id} {...content} />)}
    </section>
  );
}
