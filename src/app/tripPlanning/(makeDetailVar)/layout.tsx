import TripNavVar from '@/components/tripPlanning/TripNavVar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      <div>{children}</div>
      <div className="absolute top-5 left-5 ">
        <TripNavVar />
      </div>
    </div>
  );
}
