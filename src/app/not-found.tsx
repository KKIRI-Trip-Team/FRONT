// app/not-found.tsx
import ErrorPageLayout from '@/components/common/ErrorPageLayout';

export default function NotFound() {
  return (
    <ErrorPageLayout
      title="앗!"
      subtitle="404-NOT-FOUND"
      description="잘못된 접근입니다."
    />
  );
}
