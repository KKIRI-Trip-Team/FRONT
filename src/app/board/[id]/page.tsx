import TripInfo from '@/components/board/[id]/TripInfo';
import UserInfo from '@/components/board/[id]/UserInfo';

import { mockData } from '@/mock/mockData';

export default async function page({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const { id } = await params;

  const post = mockData.find((item) => item.id === Number(id));

  if (!post) {
    return <div>게시글을 찾을 수 없습니다.</div>;
  }
  return (
    <div className="flex w-[1200px] pb-[40px] flex-col items-start">
      {/* 대표 이미지 및 유저 정보 section */}
      <UserInfo {...post} />

      {/* 일정 나열 section */}
      <TripInfo />
    </div>
  );
}
