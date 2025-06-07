// components/common/ProfileIconUploader.tsx
'use client';

import { useState, useRef } from 'react';
import ProfileCameraIcon from '@/public/icons/profile-camera-icon.svg';
import DefaultProfileAuthEditIcon from '@/public/icons/default-profile-auth-icon-edit.svg';
import Image from 'next/image';

interface ProfileImageUploaderProps {
  onImageChange: (file: File | null) => void;
  initialImage?: string;
}

const ProfileImageUploader = ({
  onImageChange,
  initialImage,
}: ProfileImageUploaderProps) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      // 이미지 미리보기용 URL 생성
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);

      // 파일 자체를 부모 컴포넌트로 전달
      onImageChange(file);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const profileImageSrc = imagePreview
    ? imagePreview
    : initialImage
      ? `https://trebuddy-s3-bucket.s3.ap-northeast-2.amazonaws.com/${initialImage}`
      : null;

  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <div className="flex items-center justify-center w-[100px] h-[100px] overflow-hidden rounded-[40px]">
          {profileImageSrc ? (
            <Image
              src={profileImageSrc}
              alt="User profile image"
              width={100}
              height={100}
              className="object-cover w-full h-full"
              priority
            />
          ) : (
            <DefaultProfileAuthEditIcon className="w-full h-full" />
          )}
        </div>

        <button
          type="button"
          onClick={handleButtonClick}
          className="flex w-6 h-6 justify-center items-center g-[10px] shrink-0 bg-gray-900 rounded-[100px] bottom-0 right-0 absolute"
          aria-label="Upload profile image"
        >
          <ProfileCameraIcon />
        </button>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />
      </div>
    </div>
  );
};

export default ProfileImageUploader;
