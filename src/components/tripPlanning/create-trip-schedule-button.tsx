'use client';

import { useRouter } from 'next/navigation';

export default function CreateTripScheduleButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push('/tripPlanning')}
      style={{ textDecoration: 'underline' }}
    >
      trip Planning만들기
    </button>
  );
}
