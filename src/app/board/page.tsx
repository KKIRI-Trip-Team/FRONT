'use client';

import MainBoard from '@/components/board/MainBoard';
import FilterHeader from '@/components/board/FilterHeader';
import CreateTripButton from '@/components/board/CreateTripButton';

// board-main
export default function Page() {
  return (
    <div className="bg-[var(--white)]">
      <FilterHeader />
      <MainBoard />
      <CreateTripButton />
    </div>
  );
}
