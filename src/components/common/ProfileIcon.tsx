// components/common/ProfileIcon.tsx
'use client';

import DefaultProfilePcIcon from '@/public/icons/default-profile-icon-pc.svg';
import DefaultProfileMobileIcon from '@/public/icons/default-profile-icon-mobile.svg';
import DefaultProfileAuthPcIcon from '@/public/icons/default-profile-auth-icon-pc.svg';
import DefaultProfileAuthMobileIcon from '@/public/icons/default-profile-auth-icon-mobile.svg';
import Link from 'next/link';
import Image from 'next/image';
import { useAuthStore } from '@/store/authStore';

interface ProfileIconProps {
  linkEnabled?: boolean;
  onClick?: () => void;
}

export default function ProfileIcon({
  linkEnabled = true,
  onClick,
}: ProfileIconProps) {
  const { user, isAuthenticated } = useAuthStore();

  const content = (
    <>
      {!isAuthenticated ? (
        <>
          <DefaultProfilePcIcon className="hidden pc:block" />
          <DefaultProfileMobileIcon className="block pc:hidden" />
        </>
      ) : user && user.profileUrl !== '' ? (
        <Image
          src={`https://trebuddy-s3-bucket.s3.ap-northeast-2.amazonaws.com/${user.profileUrl}`}
          alt={'userProfileImage'}
          width={60}
          height={60}
          className="w-10 h-10 rounded-full pc:w-[60px] pc:h-[60px]"
        />
      ) : (
        <>
          <DefaultProfileAuthPcIcon className="hidden pc:block" />
          <DefaultProfileAuthMobileIcon className="block pc:hidden" />
        </>
      )}
    </>
  );

  if (linkEnabled) {
    return (
      <Link href={isAuthenticated ? '/mypage' : '/login'} className="block">
        {content}
      </Link>
    );
  }

  return <button onClick={onClick}>{content}</button>;
}
