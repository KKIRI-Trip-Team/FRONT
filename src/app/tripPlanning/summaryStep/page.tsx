import { useFunnel } from '@use-funnel/browser';

export default function JourneyStep({
  funnel,
}: {
  funnel: ReturnType<typeof useFunnel>;
}) {
  return (
    <>
      <h1>여행 일정 만들기 페이지</h1>
      <div>trip - journey page</div>
    </>
  );
}
