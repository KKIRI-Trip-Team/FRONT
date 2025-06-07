// app/constants/errorMessages.ts
import { ErrorMessage, ErrorType } from '@/types/error';

export const ERROR_MESSAGES: Record<ErrorType, ErrorMessage> = {
  NOT_FOUND: {
    title: '앗!',
    subtitle: '404-NOT-FOUND',
    description: '잘못된 접근입니다.',
  },
  SERVER_ERROR: {
    title: '앗!',
    subtitle: '일시적인 오류입니다',
    description: '잠시후에 다시 시도해주세요',
  },

  UNKNOWN_ERROR: { title: '알 수 없는 오류가 발생했습니다.' },
} as const;

export const BUTTON_TEXT = '홈으로 이동' as const;
