import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('이메일 형식이 아닙니다.'),

  password: z
    .string()
    .min(8, '비밀번호는 최소 8글자 이상 입력해주세요.')
    .max(20, '비밀번호는 최대 20글자까지 입력 가능합니다.')
    .regex(
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,20}$/,
      '공백없이 영문, 숫자, 특수문자 조합을 8자 이상 20자 이하로 입력해주세요',
    )
    .trim(),
});

export const registerSchema = z
  .object({
    email: z.string().email('올바른 형태가 아닙니다.'),

    password: z
      .string()
      .min(8, '비밀번호는 최소 8글자 이상 입력해주세요.')
      .max(20, '비밀번호는 최대 20글자까지 입력 가능합니다.')
      .regex(
        /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,20}$/,
        '공백없이 영문, 숫자, 특수문자 조합을 8자 이상 20자 이하로 입력해주세요',
      )
      .trim(),

    passwordConfirm: z
      .string()
      .regex(
        /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,20}$/,
        '공백없이 영문, 숫자, 특수문자 조합을 8자 이상 20자 이하로 입력해주세요',
      )
      .trim(),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: '비밀번호가 일치하지 않습니다',
    path: ['passwordConfirm'],
  });

export const nicknameSchema = z.object({
  email: z.string().email('이메일 형식이 아닙니다.'),

  nickname: z
    .string()
    .min(2, '닉네임은 최소 2글자 이상 입력해주세요.')
    .max(16, '닉네임은 최대 16글자까지 입력 가능합니다.')
    .regex(
      /^(?=.*[a-zA-Z가-힣])[a-zA-Z0-9가-힣]{2,16}$/,
      '닉네임은 한글 또는 영어를 최소 1자 이상 포함해야 합니다.',
    ),

  profileUrl: z.string().optional(),
});

export const postSchema = z.object({
  title: z
    .string()
    .min(4, '제목은 최소 4글자 이상 입력해주세요.')
    .max(30, '제목은 최대 30글자까지 입력 가능합니다.')
    .regex(
      /^(?=.*[a-zA-Z가-힣])[a-zA-Z가-힣!@#$%^&*]{4,30}$/,
      '제목은 한글 또는 영어를 반드시 포함해야 합니다.',
    ),

  content: z
    .string()
    .min(2, '본문은 최소 2글자 이상 입력해주세요.')
    .max(400, '본문은 최대 400글자까지 입력 가능합니다.')
    .regex(
      /^[a-zA-Z가-힣!@#$%^&*]{2,400}$/,
      '본문은 한글, 영어, 특수문자만 입력 가능합니다.',
    ),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type NicknameFormData = z.infer<typeof nicknameSchema>;
export type PostFormData = z.infer<typeof postSchema>;
