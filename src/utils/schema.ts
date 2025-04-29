import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .string()
    .min(3, '이메일은 최소 3글자 이상 입력해주세요.')
    .max(30, '이메일은 최대 30글자 이하 입력해주세요.')
    .email('이메일 형식이 아닙니다.'),

  password: z
    .string()
    .min(8, '비밀번호는 최소 8글자 이상 입력해주세요.')
    .max(20, '비밀번호는 최대 20글자까지 입력 가능합니다.'),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export type FormState = {
  errors?: {
    email?: string[];
    password?: string[];
  };
  message?: string;
  success?: boolean;
};
