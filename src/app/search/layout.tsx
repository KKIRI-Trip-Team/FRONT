import SearchBar from '@/components/search/SearchBar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-[var(--white)]">
      <SearchBar />
      {children}
    </div>
  );
}
