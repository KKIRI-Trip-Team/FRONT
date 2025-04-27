import { useFunnel } from '@use-funnel/browser';

export default function ExpenseStep({
  funnel,
}: {
  funnel: ReturnType<typeof useFunnel>;
}) {
  return (
    <div>
      <h1>여행 지출 페이지</h1>
      <button onClick={() => funnel.history.push('journey', {})}>다음</button>
    </div>
  );
}
