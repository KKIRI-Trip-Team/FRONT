// src/utils/api.ts

import ky from '@toss/ky';

/**
 * API 응답의 기본 구조
 */
interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

/**
 * API 요청 옵션
 */
interface ApiOptions {
  withCredentials?: boolean;
  headers?: Record<string, string>;
  timeout?: number;
}

/**
 * API 클라이언트 설정
 */
const defaultOptions: ApiOptions = {
  withCredentials: true,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
};

/**
 * API 클라이언트 인스턴스 생성
 */
const createApiClient = (baseUrl: string, options: ApiOptions = {}) => {
  const mergedOptions = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  };

  interface BeforeRequestHook {
    (request: Request): void;
  }

  interface AfterResponseHook {
    (
      request: Request,
      options: RequestInit,
      response: Response,
    ): Response | void;
  }

  interface KyHooks {
    beforeRequest?: BeforeRequestHook[];
    afterResponse?: AfterResponseHook[];
  }

  interface KyOptions {
    prefixUrl: string;
    credentials: RequestCredentials;
    timeout: number;
    headers: Record<string, string>;
    hooks: KyHooks;
  }

  const client = ky.create({
    prefixUrl: baseUrl,
    credentials: mergedOptions.withCredentials ? 'include' : 'same-origin',
    timeout: mergedOptions.timeout,
    headers: mergedOptions.headers,
    hooks: {
      beforeRequest: [
        (request: Request) => {
          // 요청 전 훅 - JWT 토큰 추가 등의 작업 수행 가능
          const token = localStorage.getItem('token');
          if (token) {
            request.headers.set('Authorization', `Bearer ${token}`);
          }
        },
      ],
      afterResponse: [
        (_request: Request, _options: RequestInit, response: Response) => {
          // 응답 후 훅 - 토큰 갱신이나 에러 처리 등의 작업 수행 가능
          if (response.status === 401) {
            // 인증 오류 처리 예시
            localStorage.removeItem('token');
            if (typeof window !== 'undefined') {
              window.location.href = '/auth/login';
            }
          }
          return response;
        },
      ],
    },
  } as KyOptions);

  return {
    /**
     * GET 요청
     */
    get: async <T>(
      endpoint: string,
      params?: Record<string, any>,
    ): Promise<ApiResponse<T>> => {
      try {
        const searchParams = params
          ? new URLSearchParams(params as any)
          : undefined;
        const response = await client
          .get(endpoint, { searchParams })
          .json<ApiResponse<T>>();
        return response;
      } catch (error) {
        return handleApiError<T>(error);
      }
    },

    /**
     * POST 요청
     */
    post: async <T>(endpoint: string, data?: any): Promise<ApiResponse<T>> => {
      try {
        const response = await client
          .post(endpoint, { json: data })
          .json<ApiResponse<T>>();
        return response;
      } catch (error) {
        console.log(error);
        return handleApiError<T>(error);
      }
    },

    /**
     * PUT 요청
     */
    put: async <T>(endpoint: string, data?: any): Promise<ApiResponse<T>> => {
      try {
        const response = await client
          .put(endpoint, { json: data })
          .json<ApiResponse<T>>();
        return response;
      } catch (error) {
        return handleApiError<T>(error);
      }
    },

    /**
     * PATCH 요청
     */
    patch: async <T>(endpoint: string, data?: any): Promise<ApiResponse<T>> => {
      try {
        const response = await client
          .patch(endpoint, { json: data })
          .json<ApiResponse<T>>();
        return response;
      } catch (error) {
        return handleApiError<T>(error);
      }
    },

    /**
     * DELETE 요청
     */
    delete: async <T>(endpoint: string): Promise<ApiResponse<T>> => {
      try {
        const response = await client.delete(endpoint).json<ApiResponse<T>>();
        return response;
      } catch (error) {
        return handleApiError<T>(error);
      }
    },

    /**
     * 파일 업로드 요청
     */
    upload: async <T>(
      endpoint: string,
      formData: FormData,
    ): Promise<ApiResponse<T>> => {
      try {
        const response = await client
          .post(endpoint, { body: formData })
          .json<ApiResponse<T>>();
        return response;
      } catch (error) {
        return handleApiError<T>(error);
      }
    },

    /**
     * 원본 클라이언트 인스턴스 반환
     */
    instance: client,
  };
};

/**
 * API 에러 처리
 */
const handleApiError = async <T>(error: any): Promise<ApiResponse<T>> => {
  if (error.response) {
    // 서버로부터 응답이 있는 경우
    try {
      const errorData = await error.response.json();

      // 서버 응답 내용을 콘솔에 출력
      console.log('서버 응답 데이터:', {
        message: errorData.message,
        data: errorData.data,
        timestamp: errorData.timestamp,
      });
      alert(errorData.message);

      return {
        data: null as T,
        success: false,
        message: errorData.message || '서버 오류가 발생했습니다.',
      };
    } catch (parseError) {
      console.log('응답 파싱 오류:', parseError);
      return {
        data: null as T,
        success: false,
        message: `서버 오류 (${error.response.status}): ${error.response.statusText}`,
      };
    }
  }

  // 네트워크 오류 등
  return {
    data: null as T,
    success: false,
    message: error.message || '네트워크 오류가 발생했습니다.',
  };
};

// API 인스턴스 생성
const api = createApiClient(
  process.env.NEXT_PUBLIC_API_URL || 'https://api.example.com',
);

export { api, createApiClient };
export type { ApiResponse, ApiOptions };
