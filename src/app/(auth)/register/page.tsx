// app/(auth)/register/page.tsx
'use client';

import { useFunnel } from '@use-funnel/browser';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { registerStepType, profileStepType } from '@/types/register';
import RegisterStep from '@/components/auth/register/RegisterStep';
import ProfileStep from '@/components/auth/register/ProfileStep';

const page = () => {
  const router = useRouter();
  const funnel = useFunnel<{
    registerStep: registerStepType;
    profileStep: profileStepType;
  }>({
    id: 'register-funnel',
    initial: {
      step: 'registerStep',
      context: {},
    },
  });

  // 뒤로가기 감지 및 처리
  useEffect(() => {
    const handlePopState = () => {
      alert('비정상적인 접근입니다.');
      router.replace('/register');
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [router]);

  switch (funnel.step) {
    case 'registerStep':
      return (
        <RegisterStep
          funnel={funnel}
          onNext={(email: string, password: string) =>
            funnel.history.push('profileStep', () => ({
              email,
              password,
            }))
          }
        />
      );
    case 'profileStep':
      return (
        <ProfileStep
          email={funnel.context.email}
          password={funnel.context.password}
        />
      );
  }
};

export default page;
