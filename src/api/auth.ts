// api/auth.ts
import { api } from '@/libs/api-client';
import { LoginCredentials, LoginResponse, UserData } from '@/types/user';
import { ENDPOINTS } from '@/constants/endpoints';

export const login = async (loginData: LoginCredentials) => {
  const response = await api.post<LoginResponse>(
    ENDPOINTS.USER.LOGIN,
    loginData,
  );
  return response;
};

export const logout = async () => {
  return await api.post(ENDPOINTS.USER.LOGOUT);
};

export const fetchUserInfo = async () => {
  const response = await api.get<UserData>(ENDPOINTS.USER.ME);
  return response.data;
};

export const refreshToken = async () => {
  const response = await api.post(ENDPOINTS.TOKEN.REFRESH);
  return response;
};
