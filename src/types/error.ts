// app/types/error.ts
export type ErrorType = 'NOT_FOUND' | 'SERVER_ERROR' | 'UNKNOWN_ERROR';

export interface ErrorMessage {
  title: string;
  subtitle?: string;
  description?: string;
}

export interface ErrorPageProps {
  type: ErrorType;
  customMessage?: Partial<ErrorMessage>;
}
