'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { NicknameFormData, nicknameSchema } from '@/utils/schema';
import { useApi } from '@/hooks/useApi';
import { ENDPOINTS } from '@/constants/endpoints';
import AuthInput from '@/components/auth/AuthInput';
import ProfileImageUploader from '@/components/common/ProfileIconUploader';
import { useRouter } from 'next/navigation';
import { ProfileFormData, ProfileStepProps } from '@/types/funnel';
import { useAuthStore } from '@/store/authStore';
import { ImageUploadResponseData } from '@/types/api';
import { User } from '@/types/user';

export default function ProfileStep({
  email,
  password,
  onNext,
}: ProfileStepProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const router = useRouter();

  const { setUser } = useAuthStore();

  const { post } = useApi();

  useEffect(() => {
    console.log('email', email);
    console.log('pw', password);
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    watch,
    clearErrors,
  } = useForm<NicknameFormData>({
    resolver: zodResolver(nicknameSchema),
    defaultValues: {
      email: email,
      nickname: '',
    },
    mode: 'onChange',
  });

  const nickname = watch('nickname');
  const isFormFilled = nickname;

  const handleImageChange = (file: File | null) => {
    setProfileImage(file);
  };

  // 이미지 업로드 함수
  const uploadImageToServer = async (file: File): Promise<string> => {
    const imageData = {
      fileName: file.name,
      contentType: file.type,
      contentLength: file.size,
    };

    try {
      // 1. 서버에 이미지 업로드 요청하여 presigned URL 받기
      const uploadResponse = await post(ENDPOINTS.IMAGES.UPLOAD, imageData);
      if (uploadResponse.statusCode !== 200) {
        throw new Error('이미지 업로드 요청 실패');
      }
      console.log(uploadResponse);
      const { presignedUrl, key } =
        uploadResponse.data as ImageUploadResponseData;
      console.log('Pre-signed URL 획득 성공:', presignedUrl);

      // 2. presigned URL을 사용해 실제 이미지 파일 업로드
      const uploadToS3 = await fetch(presignedUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': file.type,
        },
        body: file,
      });

      if (uploadToS3.status === 200) {
        console.log('S3에 이미지 등록 성공');
        console.log(uploadToS3);
      }

      return key;
    } catch (error) {
      console.error('이미지 업로드 오류:', error);
      throw error;
    }
  };

  // 폼 제출 성공 시 콜백
  const onSubmit = async (data: NicknameFormData) => {
    try {
      setIsLoading(true);

      // 이미지가 있는 경우 먼저 업로드
      let profileImageUrl = '';
      if (profileImage) {
        profileImageUrl = await uploadImageToServer(profileImage);
      }

      // 프로필 데이터 전송 (이미지 URL 포함)
      await sendProfileData(data, profileImageUrl);
    } catch (error) {
      console.error('프로필 설정 오류:', error);
      alert('프로필 설정 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const sendProfileData = async (data: NicknameFormData, imageUrl: string) => {
    try {
      const profileData: ProfileFormData = {
        email: email,
        nickname: data.nickname,
        profileUrl: imageUrl || '',
      };
      console.log(profileData);
      const response = await post(ENDPOINTS.USER.PROFILE, profileData);
      console.log(response);
      if (response.statusCode === 200) {
        console.log('프로필 설정 성공:', response);
        handleLogin(email, password);
        router.replace('/');

        if (onNext) onNext();
      }
    } catch (error) {
      console.log(error);
      console.error('프로필 설정 오류:', error);
      throw error;
    }
  };

  // 로그인 핸들러
  const handleLogin = async (email: string, password: string) => {
    console.log(email, password);

    try {
      const response = await post(ENDPOINTS.USER.LOGIN, {
        email: email,
        password: password,
      });

      if (response.statusCode === 200 && response.data) {
        console.log('자동 로그인 성공:', response);

        // 응답 데이터에서 사용자 정보를 추출하여 store에 저장
        setUser(response.data as User);

        // React Query 캐시 갱신을 위해 필요하다면 추가 코드
        // queryClient.invalidateQueries({ queryKey: ['user'] });

        return true;
      }
      return false;
    } catch (error) {
      console.error('자동 로그인 오류:', error);
      return false;
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full max-w-[1200px] min-h-screen pc:min-h-[934px] tb:h-full mb:h-full pt-[60px] tb:pt-[40px] mb:pt-[30px] px-5 flex-col items-center pc:justify-start tb:justify-between mb:justify-between gap-[60px] tb:gap-[40px] mb:gap-[30px] shrink-0 bg-white"
    >
      {/* 기존 코드와 동일 */}
      <div className="flex flex-col w-full pc:gap-[60px] tb:gap-[40px] mb:gap-[30px]">
        <h1 className="self-stretch text-gary-900 font-[Pretendard] text-2xl font-normal leading-[34px] tracking-[-0.5px] whitespace-pre-line">
          {`가입 완료 🎉
이제 같이 떠날 버디를
찾아볼까요?`}
        </h1>

        <ProfileImageUploader onImageChange={handleImageChange} />

        <AuthInput
          id="nickname"
          label=""
          type="text"
          placeholder="닉네임을 입력해주세요"
          register={register}
          errors={errors}
          clearErrors={clearErrors}
          regexMessage="한글, 숫자 2~10자 / 공백, 영문, 특수기호 불가"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting || isLoading}
        className={`flex h-[54px] py-4 justify-center items-center flex-shrink-0 self-stretch mb-[30px] ${isFormFilled ? 'bg-[#5938DB] text-white' : 'bg-gray-200 text-gray-400'}`}
      >
        {isLoading ? '프로필 설정 중...' : '확인'}
      </button>
    </form>
  );
}
