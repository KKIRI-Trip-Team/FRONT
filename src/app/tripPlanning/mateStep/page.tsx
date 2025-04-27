import { useFunnel } from '@use-funnel/browser';

export default function MateStep({
  funnel,
}: {
  funnel: ReturnType<typeof useFunnel>;
}) {
  return (
    <div>
      <h1>여행 친구 페이지</h1>
      <button onClick={() => funnel.history.push('style', {})}>다음</button>
    </div>
  );
}
