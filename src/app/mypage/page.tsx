// mypage
'use client';
import { AuthGuard } from '@/components/auth/AuthGuard';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import DefaultProfileAuthPcIcon from '@/public/icons/default-profile-auth-icon-pc.svg';
import DefaultProfileAuthMobileIcon from '@/public/icons/default-profile-auth-icon-mobile.svg';
import { fetchUserInfo } from '@/api/auth';
import { UserData } from '@/types/user';
import { useRouter } from 'next/navigation';
import { api } from '@/libs/api-client';
import { ENDPOINTS } from '@/constants/endpoints';

const page = () => {
  const router = useRouter();

  const [activeTab, setActiveTab] = useState('info');
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  const [userDataList, setUserDataList] = useState([
    { label: 'ID', value: '' },
    { label: '닉네임', value: '' },
    { label: '생일', value: '' },
    { label: '이메일', value: '' },
    { label: '전화번호', value: '' },
  ]);

  const getUserInfo = async () => {
    try {
      setLoading(true);
      const userData = await fetchUserInfo();
      setUser(userData);

      setUserDataList([
        { label: 'ID', value: userData.id },
        { label: '닉네임', value: userData.nickname },
        { label: '이메일', value: userData.email },
        { label: '생일', value: userData.birthDay || '정보 없음' },
        { label: '전화번호', value: userData.phoneNumber || '정보 없음' },
      ]);
    } catch (error) {
      console.error('사용자 정보를 가져오는 중 오류가 발생했습니다:', error);
    } finally {
      setLoading(false);
    }
  };

  const getUserFeeds = async () => {
    try {
      const response = await api.get<UserData>(ENDPOINTS.USER.ME_FEEDS);
      console.log(response);
    } catch (error) {
      console.error('작성한 여행을 가져오는 중 오류가 발생했습니다:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async () => {
    console.log('유저정보 삭제하기');
  };

  const handleEditProfile = () => {
    router.push('/mypage/edit');
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <AuthGuard>
      <div className="min-h-screen bg-white">
        {/* Header with gradient */}
        <div className="w-full h-[100px] flex-shrink-0 bg-[radial-gradient(141.42%_141.42%_at_0%_0%,#00BE9D_0%,#6474FF_100%)]"></div>

        {/* Profile section */}
        <div className="px-[20px]">
          {/* Profile image and title */}
          <div className="relative -mt-12">
            <div className="bg-white border-[5px] border-white rounded-[24px] aspect-square w-[80px] h-[80px]">
              {user && user.profileUrl !== '' ? (
                <Image
                  src={`https://trebuddy-s3-bucket.s3.ap-northeast-2.amazonaws.com/${user.profileUrl}`}
                  alt={'userProfileImage'}
                  width={80}
                  height={80}
                  priority
                  className="object-cover w-full h-full rounded-[24px]"
                />
              ) : (
                <>
                  <DefaultProfileAuthPcIcon className="hidden w-full h-full pc:block" />
                  <DefaultProfileAuthMobileIcon className="block w-full h-full pc:hidden" />
                </>
              )}
            </div>

            <div className="flex items-center pt-1 gap-[10px]">
              <h1 className="text-h3">{user?.nickname}</h1>
              <p className="text-gray-400 text-caption1">카카오 계정 연결중</p>
            </div>
          </div>

          {/* Navigation tabs */}
          <div className="border-b border-gray-200 mt-[40px]">
            <div
              className={`inline-block px-4 py-2 ${activeTab === 'info' ? 'border-b-2 border-black' : ''}`}
            >
              <button
                className={
                  activeTab === 'info'
                    ? 'text-subtitle2'
                    : 'text-gray-500 text-body1'
                }
                onClick={() => setActiveTab('info')}
              >
                기본정보
              </button>
            </div>
            <div
              className={`inline-block px-4 py-2 ${activeTab === 'myTrip' ? 'border-b-2 border-black' : ''}`}
            >
              <button
                className={
                  activeTab === 'myTrip'
                    ? 'text-subtitle2'
                    : 'text-gray-500 text-body1'
                }
                onClick={() => {
                  setActiveTab('myTrip'), getUserFeeds();
                }}
              >
                내 여행
              </button>
            </div>
          </div>

          {/* Profile information */}
          <div className={`${activeTab === 'info' ? 'block' : 'hidden'}`}>
            <ul className="flex flex-col gap-5 py-10">
              {userDataList.map(({ label, value }) => (
                <li className="flex" key={`${label}-${value}`}>
                  <p className="w-[80px] h-[16px] text-body2 text-gray-600">
                    {label}
                  </p>
                  <p className="text-gray-900 text-subtitle3">{value}</p>
                </li>
              ))}
            </ul>

            {/* Button */}
            <div className="flex justify-between">
              <button
                className="px-5 py-[10px] text-white bg-gray-800 text-subtitle3 leading-[20px] tracking-[-0.5px]"
                onClick={handleEditProfile}
              >
                프로필 수정
              </button>
              <button
                className="text-sm text-gray-400"
                onClick={handleDeleteUser}
              >
                계정 삭제하기
              </button>
            </div>
          </div>

          {/* 홈에있는 컴포넌트 불러오기 */}
          <div className={`${activeTab === 'myTrip' ? 'block' : 'hidden'}`}>
            <div>내가 쓴 여행글</div>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
};

export default page;
