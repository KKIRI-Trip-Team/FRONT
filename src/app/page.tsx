'use client';

import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  return (
    <>
      <div>Home</div>
      <button
        onClick={() => router.push('/tripPlanning')}
        style={{ textDecoration: 'underline' }}
      >
        trip Planning가는 버튼
      </button>
    </>
  );
}
