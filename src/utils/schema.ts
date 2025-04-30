import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('이메일 형식이 아닙니다.'),

  password: z
    .string()
    .min(8, '비밀번호는 최소 8글자 이상 입력해주세요.')
    .max(20, '비밀번호는 최대 20글자까지 입력 가능합니다.'),
});

export const registerSchema = z
  .object({
    email: z.string().email('올바른 형태가 아닙니다.'),

    password: z
      .string()
      .min(8, '비밀번호는 최소 8글자 이상 입력해주세요.')
      .max(20, '비밀번호는 최대 20글자까지 입력 가능합니다.')
      .regex(
        /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/,
        '공백없이 영문, 숫자, 특수문자 조합을 8자 이상 20자 이하로 입력해주세요',
      ),

    passwordConfirm: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: '비밀번호가 일치하지 않습니다',
    path: ['passwordConfirm'],
  });

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;

export type FormState = {
  errors?: {
    email?: string[];
    password?: string[];
  };
  message?: string;
  success?: boolean;
};
