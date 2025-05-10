// components/auth/LoginForm.tsx
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { loginSchema, LoginFormData } from '@/utils/schema';
import { useRouter } from 'next/navigation';
import AuthInput from '@/components/auth/AuthInput';
import { login } from '@/api/auth';
import { useAuthStore } from '@/store/authStore';
import { setToken } from '@/utils/auth';
import { User } from '@/types/user';

export default function LoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const authStore = useAuthStore();

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

  const onSubmit = async (formData: LoginFormData) => {
    try {
      const response = await login(formData);

      if (response.statusCode === 200) {
        const { data } = response;
        const userData: User = {
          email: data.email,
          nickname: data.nickname,
          profileUrl: data.profileUrl,
        };

        setToken(data.accessToken);

        authStore.setUser(userData);
        authStore.setAuthenticated(true);
        authStore.setLoading(false);

        router.push('/');
        router.refresh();
      }
    } catch (error) {
      console.error('로그인 에러 : ', error);
    }
  };

  const handlePasswordVisibility = {
    onMouseDown: () => setShowPassword(true),
    onMouseUp: () => setShowPassword(false),
    onMouseLeave: () => setShowPassword(false),
  };

  // Button style classes
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

        {/* Email input form */}
        <AuthInput
          id="email"
          label="이메일 주소"
          type="email"
          placeholder="이메일주소"
          register={register}
          errors={isSubmitted ? errors : {}}
          clearErrors={clearErrors}
        />

        {/* Password input form */}
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

      {/* Conditionally styled button */}
      <button
        type="submit"
        disabled={!isFormFilled}
        className={`${buttonBaseClasses} ${buttonColorClass}`}
      >
        {isFormFilled ? '로그인' : '확인'}
      </button>
    </form>
  );
}
