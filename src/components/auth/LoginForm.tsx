'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { loginSchema, LoginFormData } from '@/utils/schema';
import { useApi } from '@/hooks/useApi';
import { ENDPOINTS } from '@/constants/endpoints';
import { useRouter } from 'next/navigation';
import PasswordCloseEyeIcon from '@/public/icons/password-close-eye-icon.svg';
import PasswordOpenEyeIcon from '@/public/icons/password-open-eye-icon.svg';
import { User } from '@/types/user';

// 공통 스타일 상수
const baseInputClasses =
  'flex h-12 items-center gap-2.5 self-stretch border-b-[0.6px] focus:outline-none w-full';

const errorInputClasses = 'border-red focus:border-red';
const normalInputClasses = 'border-[#CCC] focus:border-[black]';

const buttonBaseClasses =
  'flex h-[54px] py-4 justify-center items-center flex-shrink-0 self-stretch mb-[30px]';

const buttonEnabledClasses = 'bg-[#5938DB] text-white';
const buttonDisabledClasses = 'bg-gray-200 text-gray-400';

// 폼 입력 검증 및 오류 관리를 위한 커스텀 훅
function useFormValidation(
  formValues: { email: string; password: string },
  clearErrors: Function,
) {
  useEffect(() => {
    if (formValues.email === '') {
      clearErrors('email');
    }
    if (formValues.password === '') {
      clearErrors('password');
    }
  }, [formValues.email, formValues.password, clearErrors]);
}

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

  const { post, isLoading, error, isSuccess, data } = useApi<{
    accessToken: string;
    user: User;
  }>();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
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

  useFormValidation({ email, password }, clearErrors);
  useLoginSuccess(isSuccess, data, router);

  const onSubmit = async (formData: LoginFormData) => {
    await post(ENDPOINTS.USER.LOGIN, formData);
  };

  const handlePasswordVisibility = {
    onMouseDown: () => setShowPassword(true),
    onMouseUp: () => setShowPassword(false),
    onMouseLeave: () => setShowPassword(false),
  };

  // 인풋 클래스 조합 함수
  const getInputClassNames = (hasError: boolean) =>
    `${baseInputClasses} ${hasError ? errorInputClasses : normalInputClasses}`;

  // 버튼 클래스 조합
  const buttonColorClass = isFormFilled
    ? buttonEnabledClasses
    : buttonDisabledClasses;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full max-w-[1200px] min-h-screen pc:min-h-[934px] tb:h-full mb:h-full pt-[60px] tb:pt-[40px] mb:pt-[30px] px-5 flex-col items-center pc:justify-start tb:justify-between mb:justify-between gap-[60px] tb:gap-[40px] mb:gap-[30px] shrink-0 bg-white"
    >
      <div className="flex flex-col w-full gap-[60px] tb:gap-[40px] mb:gap-[30px]">
        <h1 className="self-stretch text-gary-900 font-[Pretendard] text-2xl font-normal leading-[34px] tracking-[-0.5px]">
          이메일로 로그인
        </h1>

        {/* 이메일 입력 폼 */}
        <div className="flex flex-col items-start gap-[10px] self-stretch">
          <label htmlFor="email" className="text-subtitle3">
            이메일 주소
          </label>
          <input
            id="email"
            type="email"
            {...register('email', {
              onChange: () => errors.email && clearErrors('email'),
            })}
            aria-invalid={errors.email ? 'true' : 'false'}
            className={getInputClassNames(!!errors.email)}
            placeholder="이메일주소"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red">{errors.email.message}</p>
          )}
        </div>

        {/* 비밀번호 입력 폼 */}
        <div className="flex flex-col items-start gap-[10px] self-stretch">
          <label htmlFor="password" className="text-subtitle3">
            비밀번호 입력
          </label>
          <div className="relative flex items-center w-full">
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              {...register('password', {
                onChange: () => errors.password && clearErrors('password'),
              })}
              aria-invalid={errors.password ? 'true' : 'false'}
              className={getInputClassNames(!!errors.password)}
              placeholder="비밀번호"
            />
            <div
              className="absolute cursor-pointer right-2"
              {...handlePasswordVisibility}
            >
              {showPassword ? (
                <PasswordOpenEyeIcon />
              ) : (
                <PasswordCloseEyeIcon />
              )}
            </div>
          </div>
          {errors.password && (
            <p className="mt-1 text-sm text-red">{errors.password.message}</p>
          )}
        </div>
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
