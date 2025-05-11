// hooks/useAuth.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuthStore } from '@/store/authStore';
import { fetchUserInfo, login, logout as apiLogout } from '@/api/auth';
import { LoginCredentials } from '@/types/user';
import { useEffect } from 'react';

export function useAuth() {
  const {
    setUser,
    setAuthenticated,
    setLoading,
    user,
    isAuthenticated,
    logout: clearAuthState,
  } = useAuthStore();
  const queryClient = useQueryClient();

  // 사용자 정보 가져오기 쿼리
  const { data, isLoading, error } = useQuery({
    queryKey: ['user'],
    queryFn: fetchUserInfo,
    retry: false, // 인증 실패 시 재시도하지 않음
    staleTime: 5 * 60 * 1000, // 5분 동안 데이터를 신선하게 유지
    refetchOnWindowFocus: true, // 창이 포커스될 때 다시 가져오기
  });

  // 로그인 뮤테이션
  const loginMutation = useMutation({
    mutationFn: (credentials: LoginCredentials) => login(credentials),
    onSuccess: (data) => {
      console.log(data);
      setUser(data.data);
      setAuthenticated(true);
      queryClient.setQueryData(['user'], data);
    },
  });

  // 로그아웃 뮤테이션
  const logoutMutation = useMutation({
    mutationFn: apiLogout,
    onSuccess: () => {
      clearAuthState();
      queryClient.clear();
    },
  });

  // 사용자 정보 및 인증 상태 업데이트
  useEffect(() => {
    if (data) {
      setUser(data);
      setAuthenticated(true);
    }

    if (error) {
      clearAuthState();
    }

    setLoading(isLoading);
  }, [
    data,
    error,
    isLoading,
    setUser,
    setAuthenticated,
    setLoading,
    clearAuthState,
  ]);

  return {
    user,
    isAuthenticated,
    isLoading,
    login: loginMutation.mutate,
    logout: logoutMutation.mutate,
    isLoginLoading: loginMutation.isPending,
    isLogoutLoading: logoutMutation.isPending,
    loginError: loginMutation.error,
  };
}
