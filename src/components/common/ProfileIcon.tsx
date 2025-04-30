// components/common/ProfileIcon.tsx
'use client';

import DefaultProfilePcIcon from '@/public/icons/default-profile-icon-pc.svg';
import DefaultProfileMobileIcon from '@/public/icons/default-profile-icon-mobile.svg';
import DefaultProfileAuthPcIcon from '@/public/icons/default-profile-auth-icon-pc.svg';
import DefaultProfileAuthMobileIcon from '@/public/icons/default-profile-auth-icon-mobile.svg';
import Link from 'next/link';
import { useAuthStore } from '@/store/useAuthStore';
import { useEffect } from 'react';

interface ProfileIconProps {
  linkEnabled?: boolean;
  onClick?: () => void;
}

export default function ProfileIcon({
  linkEnabled = true,
  onClick,
}: ProfileIconProps) {
  const { isLoggedIn, profileImage, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const content = (
    <>
      {!isLoggedIn ? (
        <>
          <DefaultProfilePcIcon className="hidden pc:block" />
          <DefaultProfileMobileIcon className="block pc:hidden" />
        </>
      ) : profileImage ? (
        <img
          src={profileImage}
          alt="User Profile"
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
      <Link href={isLoggedIn ? '/mypage' : '/login'} className="block">
        {content}
      </Link>
    );
  }

  return <button onClick={onClick}>{content}</button>;
}
