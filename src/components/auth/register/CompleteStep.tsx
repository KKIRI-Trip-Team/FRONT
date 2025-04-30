'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { UseFunnelResults } from '@use-funnel/browser';
import { RegisterStepTypes } from '@/types/register';

interface CompleteStepProps {
  funnel: UseFunnelResults<
    RegisterStepTypes,
    RegisterStepTypes['completeStep']
  >;
}

export default function CompleteStep({ funnel }: CompleteStepProps) {
  const router = useRouter();

  useEffect(() => {
    // 닉네임이 설정된 후 3초 뒤에 메인 페이지로 이동
    const timer = setTimeout(() => {
      router.replace('/');
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="max-w-md p-6 mx-auto text-center bg-white rounded-lg shadow-md">
      <h1 className="mb-6 text-2xl font-bold">회원가입 완료</h1>
      <p className="mb-4">
        {/* nickname이 있을 경우에만 출력, 없으면 기본 텍스트 */}
        <strong>{funnel.context.nickname || '사용자'}</strong>님, 환영합니다!
      </p>
      <p>잠시 후 메인 페이지로 이동합니다...</p>
    </div>
  );
}
