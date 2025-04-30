import MakeDetailNavVar from '@/components/tripPlanning/make-detail-trip';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      <div>{children}</div>
      <div className="absolute top-5 left-5 ">
        <MakeDetailNavVar />
      </div>
    </div>
  );
}
