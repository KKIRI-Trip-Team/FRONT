// hooks/useApi.ts
'use client';
import { useState, useCallback } from 'react';
import { api } from '@/libs/api-client';
import { ERROR_MESSAGES } from '@/constants/messages';

interface UseApiState<T> {
  data: T | null;
  isLoading: boolean;
  error: string | null;
  isSuccess: boolean;
}

export function useApi<T>() {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    isLoading: false,
    error: null,
    isSuccess: false,
  });

  const get = useCallback(
    async (endpoint: string, params?: Record<string, any>) => {
      setState((prev) => ({ ...prev, isLoading: true }));
      try {
        const response = await api.get<T>(endpoint, params);
        setState({
          data: response.data,
          isLoading: false,
          error: null,
          isSuccess: true,
        });
        return response;
      } catch (error) {
        setState({
          data: null,
          isLoading: false,
          error:
            error instanceof Error
              ? error.message
              : ERROR_MESSAGES.UNKNOWN_ERROR,
          isSuccess: false,
        });
        throw error;
      }
    },
    [],
  );

  const post = useCallback(async (endpoint: string, data?: any) => {
    setState((prev) => ({ ...prev, isLoading: true }));
    try {
      const response = await api.post<T>(endpoint, data);
      setState({
        data: response.data,
        isLoading: false,
        error: null,
        isSuccess: true,
      });
      return response;
    } catch (error) {
      setState({
        data: null,
        isLoading: false,
        error:
          error instanceof Error ? error.message : ERROR_MESSAGES.UNKNOWN_ERROR,
        isSuccess: false,
      });
      throw error;
    }
  }, []);

  const put = useCallback(async (endpoint: string, data?: any) => {
    setState((prev) => ({ ...prev, isLoading: true }));
    try {
      const response = await api.put<T>(endpoint, data);
      setState({
        data: response.data,
        isLoading: false,
        error: null,
        isSuccess: true,
      });
      return response;
    } catch (error) {
      setState({
        data: null,
        isLoading: false,
        error:
          error instanceof Error ? error.message : ERROR_MESSAGES.UNKNOWN_ERROR,
        isSuccess: false,
      });
      throw error;
    }
  }, []);

  const patch = useCallback(async (endpoint: string, data?: any) => {
    setState((prev) => ({ ...prev, isLoading: true }));
    try {
      const response = await api.patch<T>(endpoint, data);
      setState({
        data: response.data,
        isLoading: false,
        error: null,
        isSuccess: true,
      });
      return response;
    } catch (error) {
      setState({
        data: null,
        isLoading: false,
        error:
          error instanceof Error ? error.message : ERROR_MESSAGES.UNKNOWN_ERROR,
        isSuccess: false,
      });
      throw error;
    }
  }, []);

  const deleteRequest = useCallback(async (endpoint: string) => {
    setState((prev) => ({ ...prev, isLoading: true }));
    try {
      const response = await api.delete<T>(endpoint);
      setState({
        data: response.data,
        isLoading: false,
        error: null,
        isSuccess: true,
      });
      return response;
    } catch (error) {
      setState({
        data: null,
        isLoading: false,
        error:
          error instanceof Error ? error.message : ERROR_MESSAGES.UNKNOWN_ERROR,
        isSuccess: false,
      });
      throw error;
    }
  }, []);

  const upload = useCallback(async (endpoint: string, formData: FormData) => {
    setState((prev) => ({ ...prev, isLoading: true }));
    try {
      const response = await api.upload<T>(endpoint, formData);
      setState({
        data: response.data,
        isLoading: false,
        error: null,
        isSuccess: true,
      });
      return response;
    } catch (error) {
      setState({
        data: null,
        isLoading: false,
        error:
          error instanceof Error ? error.message : ERROR_MESSAGES.UNKNOWN_ERROR,
        isSuccess: false,
      });
      throw error;
    }
  }, []);

  return {
    ...state,
    get,
    post,
    put,
    patch,
    delete: deleteRequest,
    upload,
  };
}
