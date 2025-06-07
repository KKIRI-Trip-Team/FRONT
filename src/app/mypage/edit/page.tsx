'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useEffect } from 'react';
import { profileFormData, profileSchema } from '@/utils/schema';
import { useRouter } from 'next/navigation';
import AuthInput from '@/components/auth/AuthInput';
import { useAuthStore } from '@/store/authStore';
import ProfileImageUploader from '@/components/common/ProfileIconUploader';

const page = () => {
  const { user, isAuthenticated } = useAuthStore();
  const [profileImage, setProfileImage] = useState<File | null>(null);

  const router = useRouter();
  const { setUser, setLoading } = useAuthStore();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitted },
    clearErrors,
  } = useForm<profileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      email: user?.email || '',
      nickname: user?.nickname || '',
    },
  });

  // user 정보가 변경되면 form을 reset하여 새로운 기본값으로 업데이트
  useEffect(() => {
    if (user) {
      reset({
        email: user.email || '',
        nickname: user.nickname || '',
      });
    }
  }, [user, reset]);

  const email = watch('email');
  const nickname = watch('nickname');
  const isFormFilled = email && nickname;

  const onSubmit = async (formData: profileFormData) => {
    try {
      console.log('프로필 수정', formData);
    } catch (error) {
      console.error('프로필 수정 에러 : ', error);
    }
  };

  // Button style classes
  const buttonBaseClasses =
    'flex h-[54px] py-4 justify-center items-center flex-shrink-0 self-stretch mb-[30px]';
  const buttonEnabledClasses = 'bg-[#5938DB] text-white';
  const buttonDisabledClasses = 'bg-gray-200 text-gray-400';

  const buttonColorClass = isFormFilled
    ? buttonEnabledClasses
    : buttonDisabledClasses;

  const handleImageChange = (file: File | null) => {
    setProfileImage(file);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full max-w-[1200px] min-h-screen pc:min-h-[934px] tb:h-full mb:h-full pt-[60px] tb:pt-[40px] mb:pt-[30px] px-5 flex-col items-center pc:justify-start tb:justify-between mb:justify-between gap-[60px] tb:gap-[40px] mb:gap-[30px] shrink-0 bg-white"
    >
      <div className="flex flex-col w-full pc:gap-[60px] tb:gap-[40px] mb:gap-[30px]">
        <h1 className="self-stretch text-gary-900 font-[Pretendard] text-2xl font-normal leading-[34px] tracking-[-0.5px]">
          내 정보 수정
        </h1>

        <ProfileImageUploader
          onImageChange={handleImageChange}
          initialImage={user?.profileUrl}
        />

        {/* Email input form */}
        <AuthInput
          id="email"
          label="이메일"
          type="email"
          placeholder="이메일"
          register={register}
          errors={isSubmitted ? errors : {}}
          clearErrors={clearErrors}
        />

        {/* Nickname input form */}
        <AuthInput
          id="nickname"
          label="닉네임"
          type="nickname"
          placeholder="닉네임"
          register={register}
          errors={isSubmitted ? errors : {}}
          clearErrors={clearErrors}
        />
      </div>

      {/* Conditionally styled button */}
      <button
        type="submit"
        disabled={!isFormFilled}
        className={`${buttonBaseClasses} ${buttonColorClass}`}
      >
        내 정보 수정
      </button>
    </form>
  );
};

export default page;
