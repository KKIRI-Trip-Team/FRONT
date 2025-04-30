// components/RegisterForm.tsx

'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema, RegisterFormData } from '@/utils/schema';
import { useApi } from '@/hooks/useApi';
import { ENDPOINTS } from '@/constants/endpoints';
import AuthInput from '@/components/auth/AuthInput';

export default function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const { post } = useApi();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    clearErrors,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: '',
      password: '',
      passwordConfirm: '', // passwordConfirm 추가
    },
  });

  const email = watch('email');
  const password = watch('password');
  const passwordConfirm = watch('passwordConfirm');
  const isFormFilled = email && password && passwordConfirm;

  const handlePasswordVisibility = {
    onMouseDown: () => setShowPassword(true),
    onMouseUp: () => setShowPassword(false),
    onMouseLeave: () => setShowPassword(false),
  };

  const handlePasswordConfirmVisibility = {
    onMouseDown: () => setShowPasswordConfirm(true),
    onMouseUp: () => setShowPasswordConfirm(false),
    onMouseLeave: () => setShowPasswordConfirm(false),
  };

  const onSubmit = async (data: RegisterFormData) => {
    try {
      setIsLoading(true);
      // 회원가입 요청
      const response = await post(ENDPOINTS.USER.REGISTER, {
        email: data.email,
        password: data.password,
        confirmPassword: data.passwordConfirm,
      });

      if (!response.ok) {
        throw new Error('회원가입에 실패했습니다.');
      }

      alert('회원가입 성공');
      // 로그인 페이지로 이동 등 추가 처리
    } catch (error) {
      console.error('회원가입 오류:', error);
      alert('회원가입 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full max-w-[1200px] min-h-screen pc:min-h-[934px] tb:h-full mb:h-full pt-[60px] tb:pt-[40px] mb:pt-[30px] px-5 flex-col items-center pc:justify-start tb:justify-between mb:justify-between gap-[60px] tb:gap-[40px] mb:gap-[30px] shrink-0 bg-white"
    >
      <div className="flex flex-col w-full pc:gap-[60px] tb:gap-[40px] mb:gap-[30px]">
        <h1 className="self-stretch text-gary-900 font-[Pretendard] text-2xl font-normal leading-[34px] tracking-[-0.5px]">
          이메일로 회원가입
        </h1>

        {/* 이메일 입력 폼 */}
        <AuthInput
          id="email"
          label="이메일 주소"
          type="email"
          placeholder="이메일주소"
          register={register}
          errors={errors}
          clearErrors={clearErrors}
        />

        <div>
          {/* 비밀번호 입력 폼 */}
          <AuthInput
            id="password"
            label="비밀번호 입력"
            type="password"
            placeholder="비밀번호"
            register={register}
            errors={errors}
            clearErrors={clearErrors}
            showPassword={showPassword}
            handlePasswordVisibility={handlePasswordVisibility}
            regexMessage="공백없이 영문, 숫자, 특수문자 조합을 8자 이상 20자 이하로 입력해주세요"
          />

          {/* 비밀번호 확인 입력 폼 */}
          <AuthInput
            id="passwordConfirm"
            label=""
            type="password"
            placeholder="비밀번호 확인"
            register={register}
            errors={errors}
            clearErrors={clearErrors}
            showPassword={showPasswordConfirm}
            handlePasswordVisibility={handlePasswordConfirmVisibility}
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={!isFormFilled || isLoading}
        className={`flex h-[54px] py-4 justify-center items-center flex-shrink-0 self-stretch mb-[30px] ${isFormFilled ? 'bg-[#5938DB] text-white' : 'bg-gray-200 text-gray-400'}`}
      >
        {isLoading ? '회원가입 중...' : isFormFilled ? '회원가입' : '확인'}
      </button>
    </form>
  );
}
