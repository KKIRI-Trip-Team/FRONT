// components/RegisterStep.tsx
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema, RegisterFormData } from '@/utils/schema';
import { useApi } from '@/hooks/useApi';
import { ENDPOINTS } from '@/constants/endpoints';
import AuthInput from '@/components/auth/AuthInput';
import { RegisterStepProps } from '@/types/funnel';
import { motion } from 'framer-motion';
import { slideFadeVariants } from '@/utils/motionVariants';
import { useTransitionStore } from '@/store/transitionStore';

export default function RegisterStepPage({ funnel }: RegisterStepProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const { post } = useApi();

  const { direction } = useTransitionStore();

  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields },
    watch,
    clearErrors,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
      passwordConfirm: '',
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
    console.log('회원가입 요청');
    try {
      setIsLoading(true);
      const response = await post(ENDPOINTS.USER.REGISTER, {
        email: data.email,
        password: data.password,
        confirmPassword: data.passwordConfirm,
      });

      if (response.statusCode === 201) {
        console.log('회원가입 성공:', response);
        funnel.history.push('profileStep', {
          email: data.email,
          password: data.password,
        });
      }
    } catch (error) {
      console.error('회원가입 오류:', error);
      alert('회원가입에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      key="registerStep"
      custom={direction}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={slideFadeVariants}
      className="flex flex-col items-center pc:w-[1200px] tb:w-[768px] h-[854px] pb-[40px] pl-[20px] pr-[20px] pt-[20px] gap-[40px] bg-white shrink-0 font-[Pretendard] not-italic tracking-[-0.5px]"
    >
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
            isDirty={dirtyFields.email}
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
              isDirty={dirtyFields.password}
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
              isDirty={dirtyFields.passwordConfirm}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={!isFormFilled || isLoading}
          className={`flex h-[54px] py-4 justify-center items-center flex-shrink-0 self-stretch mb-[30px] ${
            isFormFilled
              ? 'bg-[#5938DB] text-white'
              : 'bg-gray-200 text-gray-400'
          }`}
        >
          {isLoading ? '회원가입 중...' : isFormFilled ? '회원가입' : '확인'}
        </button>
      </form>
    </motion.div>
  );
}
