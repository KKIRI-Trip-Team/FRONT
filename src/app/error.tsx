// app/error.tsx
'use client';

import { useEffect } from 'react';
import ErrorPageLayout from '@/components/common/ErrorPageLayout';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <ErrorPageLayout
      title="앗!"
      subtitle="일시적인 오류입니다"
      description="잠시후에 다시 시도해주세요"
    />
  );
}
