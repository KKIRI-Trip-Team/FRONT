import { useFunnel } from '@use-funnel/browser';

export default function StyleStep({
  funnel,
}: {
  funnel: ReturnType<typeof useFunnel>;
}) {
  return (
    <div>
      <h1>여행 스타일 페이지</h1>
      <button onClick={() => funnel.history.push('expense', {})}>다음</button>
    </div>
  );
}
