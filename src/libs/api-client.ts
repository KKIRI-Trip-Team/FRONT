// libs/api-client.ts

import ky from '@toss/ky';
import { ApiResponse, ApiOptions } from '@/types/api';

/**
 * API 클라이언트 설정
 */
/**
 * API 클라이언트 인스턴스 생성
 */
const createApiClient = (baseUrl: string, options: ApiOptions = {}) => {
  const mergedOptions = {
    ...options,
    headers: {
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
    ): Response | void | Promise<Response | void>;
  }

  interface KyHooks {
    beforeRequest?: BeforeRequestHook[];
    afterResponse?: AfterResponseHook[];
  }

  interface KyOptions {
    prefixUrl: string;
    timeout: number;
    headers: Record<string, string>;
    hooks: KyHooks;
  }

  const client = ky.create({
    prefixUrl: baseUrl,
    credentials: 'include',
    timeout: 10 * 1000,
    headers: {
      'content-type': 'application/json',
    },
    hooks: {
      beforeRequest: [],
      afterResponse: [
        async (
          _request: Request,
          _options: RequestInit,
          response: Response,
        ) => {
          // 응답 헤더에서 쿠키 정보 확인 (디버깅 용도)
          // if (process.env.NODE_ENV === 'development') {
          //   console.log('Response headers:', response.headers);
          //   console.log('개발 디버깅');
          // }

          // // 401 Unauthorized 응답 처리
          // if (response.status === 401) {
          //   // 인증 오류 처리 - 리다이렉트만 수행
          //   // 쿠키는 서버에서 삭제하거나 만료시간 설정으로 관리
          //   if (typeof window !== 'undefined') {
          //     window.location.href = '/auth/login';
          //   }
          // }

          // // 403 Forbidden - 권한 오류 처리
          // if (response.status === 403) {
          //   if (typeof window !== 'undefined') {
          //     // 권한 오류 페이지로 리다이렉트 또는 다른 처리
          //     console.error('접근 권한이 없습니다.');
          //   }
          // }

          return response;
        },
      ],
    },
    // retry: {
    //   // 재시도 요청
    //   limit: 5, // 재시도 횟수
    //   statusCodes: [401], // 401 에러일 때 재시도
    //   methods: ['get', 'post', 'put', 'delete', 'patch'], // 재시도를 적용할 HTTP 메서드
    //   backoffLimit: 3 * 1000, // 재시도 간격의 최댓값
    // },
  });

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
    try {
      // 응답이 비어 있는지 확인
      const text = await error.response.text();
      const errorData = text
        ? JSON.parse(text)
        : { message: '빈 응답이 반환되었습니다.' };

      console.log('서버 응답:', {
        message: errorData.message || '응답 메시지 없음',
        status: error.response.status,
      });

      return {
        data: null as T,
        statusCode: error.response.status || 500,
        message: errorData.message || '서버 오류가 발생했습니다.',
        timestamp: errorData.timestamp || new Date().toISOString(),
      };
    } catch (parseError) {
      console.log('응답 파싱 오류:', parseError);
      return {
        data: null as T,
        statusCode: error.response.status || 500,
        message: `서버 오류 (${error.response.status}): 응답을 처리할 수 없습니다`,
        timestamp: new Date().toISOString(),
      };
    }
  }

  // 네트워크 오류 등
  return {
    data: null as T,
    statusCode: 500,
    message: error.message || '네트워크 오류가 발생했습니다.',
    timestamp: new Date().toISOString(),
  };
};

// API 인스턴스 생성
const api = createApiClient(
  process.env.NEXT_PUBLIC_API_URL || 'https://api.example.com',
);

export { api, createApiClient };
export type { ApiResponse, ApiOptions };
