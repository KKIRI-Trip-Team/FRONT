// store/useAuthStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  isLoggedIn: boolean;
  profileImage: string;
  setLoggedIn: (value: boolean) => void;
  setProfileImage: (url: string) => void;
  checkAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      profileImage: '',
      setLoggedIn: (value) => set({ isLoggedIn: value }),
      setProfileImage: (url) => set({ profileImage: url }),
      checkAuth: () => {
        const token = localStorage.getItem('accessToken');
        const profileImage = localStorage.getItem('profileImage') || '';

        set({
          isLoggedIn: !!token,
          profileImage,
        });
      },
    }),
    {
      name: 'auth-storage',
      // localStorage에서 가져온 데이터만 유지하고 싶다면 다음 옵션 추가
      partialize: (state) => ({
        isLoggedIn: state.isLoggedIn,
        profileImage: state.profileImage,
      }),
    },
  ),
);
