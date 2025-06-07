// types/api.ts
export interface LoginResponseData {
  accessToken: string;
  nickname: string;
}

export interface RegisterResponseData {
  user?: {
    email: string;
    password: string;
    passwordConfirm: string;
  };
}

export interface LoginResponseType {
  statusCode: number;
  message: string;
  data: LoginResponseUserData;
  timestamp: string;
}

export interface ImageUploadResponseData {
  presignedUrl: string;
  key: string;
}

export interface LoginResponseUserData {
  email: string;
  nickname: string;
  profileUrl: string;
}

/**
 * API 응답의 기본 구조
 */
export interface ApiResponse<T> {
  data: T;
  statusCode: number;
  message: string;
  timestamp: string;
}

/**
 * API 요청 옵션
 */
export interface ApiOptions {
  credentials?: string;
  headers?: Record<string, string>;
  timeout?: number;
}
