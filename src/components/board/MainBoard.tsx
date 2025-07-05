'use client';

import BoardCard from './boardCard/BoardCard';

import { useEffect } from 'react';

import { useApi } from '@/hooks/useApi';
import { BoardData } from '@/types/board';

export default function MainBoard() {
  const { data: boards, get } = useApi<BoardData[]>();

  useEffect(() => {
    get('feeds');
  }, []);

  console.log(boards);

  return (
    <section className="flex px-[20px] py-[0px] items-start content-start gap-[20px] flex-wrap">
      {boards?.map((content) => <BoardCard key={content.id} {...content} />)}
    </section>
  );
}
