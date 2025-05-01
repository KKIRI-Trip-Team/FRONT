// components/register/NicknameStep.tsx
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { UseFunnelResults } from '@use-funnel/browser';
import { RegisterStepTypes } from '@/types/register';

interface NicknameStepProps {
  funnel: UseFunnelResults<
    RegisterStepTypes,
    RegisterStepTypes['nicknameStep']
  >;
}

export default function NicknameStep({ funnel }: NicknameStepProps) {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      nickname: funnel.context.nickname || '',
    },
  });

  const onSubmit = async (data: { nickname: string }) => {
    try {
      setIsLoading(true);

      // 닉네임 업데이트 API 요청
      const response = await fetch('/api/user/nickname', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: funnel.context.email,
          nickname: data.nickname,
        }),
      });

      if (!response.ok) {
        throw new Error('닉네임 설정에 실패했습니다.');
      }

      // 다음 단계로 이동하면서 context 업데이트
      funnel.history.push('completeStep', {
        ...funnel.context,
        nickname: data.nickname,
      });
    } catch (error) {
      console.error('닉네임 설정 오류:', error);
      alert('닉네임 설정 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md p-6 mx-auto bg-white rounded-lg shadow-md">
      <h1 className="mb-6 text-2xl font-bold">가입 완료</h1>
      <p className="mb-4">회원가입이 완료되었습니다. 닉네임을 설정해주세요.</p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-6">
          <label className="block mb-2 text-gray-700">닉네임</label>
          <input
            type="text"
            className="w-full px-3 py-2 border rounded-md"
            {...register('nickname', {
              required: '닉네임을 입력해주세요',
              minLength: {
                value: 2,
                message: '닉네임은 최소 2자 이상이어야 합니다',
              },
              maxLength: {
                value: 10,
                message: '닉네임은 최대 10자까지 가능합니다',
              },
            })}
          />
          {errors.nickname && (
            <p className="mt-1 text-red-500">{errors.nickname.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 disabled:bg-gray-300"
        >
          {isLoading ? '처리 중...' : '닉네임 설정 완료'}
        </button>
      </form>
    </div>
  );
}
