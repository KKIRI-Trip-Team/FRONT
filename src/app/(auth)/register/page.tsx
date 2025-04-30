'use client';

import { useFunnel } from '@use-funnel/browser';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { RegisterStepTypes } from '@/types/register';
import RegisterStep from '@/components/auth/register/RegisterStep';
import NicknameStep from '@/components/auth/register/NicknameStep';
import CompleteStep from '@/components/auth/register/CompleteStep';

const page = () => {
  const router = useRouter();
  const funnel = useFunnel<RegisterStepTypes>({
    id: 'register-funnel',
    initial: {
      step: 'registerStep',
      context: {
        email: '',
        password: '',
        passwordConfirm: '',
      },
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

  // 현재 단계에 따라 컴포넌트 렌더링
  if (funnel.step === 'registerStep') {
    return <RegisterStep funnel={funnel} />;
  }

  if (funnel.step === 'nicknameStep') {
    return <NicknameStep funnel={funnel} />;
  }

  if (funnel.step === 'completeStep') {
    return <CompleteStep funnel={funnel} />;
  }

  // 기본 리턴 - 타입스크립트 오류 방지
  return <div>회원가입페이지</div>;
};

export default page;
