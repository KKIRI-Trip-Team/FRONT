import RecentSearchList from '@/components/search/RecentSearchList';
import RecoAIList from '@/components/search/RecoAIList';
import SearchResultList from '@/components/search/SearchResultList';

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;

  return (
    <div className="bg-[var(--white)]">
      {q ? (
        <SearchResultList q={q} />
      ) : (
        <>
          <RecentSearchList />
          <RecoAIList />
        </>
      )}
    </div>
  );
}
