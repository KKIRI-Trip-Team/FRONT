import TripInfo from '@/components/board/[id]/TripInfo';
import UserInfo from '@/components/board/[id]/UserInfo';

export default async function page({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const { id } = await params;

  return (
    <div className="flex pc:w-[1200px] pb-[40px] flex-col items-start">
      {/* 대표 이미지 및 유저 정보 section */}
      <UserInfo boardId={id} />

      {/* 일정 나열 section */}
      {/* <TripInfo /> */}
    </div>
  );
}
