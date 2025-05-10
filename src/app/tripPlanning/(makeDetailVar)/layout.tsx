import DetailTripHeader from '@/components/tripPlanning/TripDetailHeader';
import HTripNavVar from '@/components/tripPlanning/tripNavVar/HTripNavVar';
import VTripNavVar from '@/components/tripPlanning/tripNavVar/VTripNavVar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="pc:relative">
      <div>{children}</div>

      {/* PC 전용 네비게이션 */}
      <div className="hidden pc:block pc:absolute pc:top-5 pc:left-5 pc:z-10">
        <VTripNavVar />
      </div>

      {/* 태블릿 이하 전용 네비게이션 */}
      <div className="block pc:hidden">
        <HTripNavVar />
      </div>
    </div>
  );
}
