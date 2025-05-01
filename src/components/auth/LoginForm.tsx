'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { loginSchema, LoginFormData } from '@/utils/schema';
import { useApi } from '@/hooks/useApi';
import { ENDPOINTS } from '@/constants/endpoints';
import { useRouter } from 'next/navigation';
import { User } from '@/types/user';
import AuthInput from '@/components/auth/AuthInput';

// 로그인 성공 처리를 위한 커스텀 훅
function useLoginSuccess(isSuccess: boolean, data: any, router: any) {
  useEffect(() => {
    if (isSuccess && data?.accessToken) {
      console.log('로그인성공', data);
      localStorage.setItem('accessToken', data.accessToken);
      router.push('/');
    }
  }, [isSuccess, data, router]);
}

export default function LoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const { post, isLoading, isSuccess, data } = useApi<{
    accessToken: string;
    user: User;
  }>();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitted },
    clearErrors,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const email = watch('email');
  const password = watch('password');
  const isFormFilled = email && password;

  useLoginSuccess(isSuccess, data, router);

  const onSubmit = async (formData: LoginFormData) => {
    await post(ENDPOINTS.USER.LOGIN, formData);
  };

  const handlePasswordVisibility = {
    onMouseDown: () => setShowPassword(true),
    onMouseUp: () => setShowPassword(false),
    onMouseLeave: () => setShowPassword(false),
  };

  // 버튼 클래스 조합
  const buttonBaseClasses =
    'flex h-[54px] py-4 justify-center items-center flex-shrink-0 self-stretch mb-[30px]';
  const buttonEnabledClasses = 'bg-[#5938DB] text-white';
  const buttonDisabledClasses = 'bg-gray-200 text-gray-400';

  const buttonColorClass = isFormFilled
    ? buttonEnabledClasses
    : buttonDisabledClasses;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full max-w-[1200px] min-h-screen pc:min-h-[934px] tb:h-full mb:h-full pt-[60px] tb:pt-[40px] mb:pt-[30px] px-5 flex-col items-center pc:justify-start tb:justify-between mb:justify-between gap-[60px] tb:gap-[40px] mb:gap-[30px] shrink-0 bg-white"
    >
      <div className="flex flex-col w-full pc:gap-[60px] tb:gap-[40px] mb:gap-[30px]">
        <h1 className="self-stretch text-gary-900 font-[Pretendard] text-2xl font-normal leading-[34px] tracking-[-0.5px]">
          이메일로 로그인
        </h1>

        {/* 이메일 입력 폼 */}
        <AuthInput
          id="email"
          label="이메일 주소"
          type="email"
          placeholder="이메일주소"
          register={register}
          errors={isSubmitted ? errors : {}}
          clearErrors={clearErrors}
        />

        {/* 비밀번호 입력 폼 */}
        <AuthInput
          id="password"
          label="비밀번호 입력"
          type="password"
          placeholder="비밀번호"
          register={register}
          errors={isSubmitted ? errors : {}}
          clearErrors={clearErrors}
          showPassword={showPassword}
          handlePasswordVisibility={handlePasswordVisibility}
        />
      </div>

      {/* 조건부 스타일이 적용된 버튼 */}
      <button
        type="submit"
        disabled={!isFormFilled || isLoading}
        className={`${buttonBaseClasses} ${buttonColorClass}`}
      >
        {isLoading ? '로그인 중...' : isFormFilled ? '로그인' : '확인'}
      </button>
    </form>
  );
}
