// components/AuthInput.tsx
import React from 'react';
import { UseFormRegister, Path, FieldValues } from 'react-hook-form'; // 추가된 import
import { LoginFormData, RegisterFormData } from '@/utils/schema';
import PasswordCloseEyeIcon from '@/public/icons/password-close-eye-icon.svg';
import PasswordOpenEyeIcon from '@/public/icons/password-open-eye-icon.svg';

interface AuthInputProps<T extends FieldValues> {
  id: Path<T>;
  label: string;
  type: string;
  placeholder: string;
  register: UseFormRegister<T>;
  errors: any;
  clearErrors: Function;
  showPassword?: boolean;
  handlePasswordVisibility?: {
    onMouseDown: () => void;
    onMouseUp: () => void;
    onMouseLeave: () => void;
  };
  regexMessage?: string;
}

const baseInputClasses =
  'flex h-12 items-center gap-2.5 self-stretch border-b-[0.6px] focus:outline-none w-full';
const errorInputClasses = 'border-red focus:border-red';
const normalInputClasses = 'border-[#CCC] focus:border-[black]';

const AuthInput = <T extends FieldValues>({
  id,
  label,
  type,
  placeholder,
  register,
  errors,
  clearErrors,
  showPassword,
  handlePasswordVisibility,
  regexMessage,
}: AuthInputProps<T>) => {
  const inputType = type === 'password' && showPassword ? 'text' : type;

  const getInputClassNames = (hasError: boolean) =>
    `${baseInputClasses} ${hasError ? errorInputClasses : normalInputClasses}`;

  return (
    <div className="flex flex-col items-start gap-[10px] self-stretch">
      <label htmlFor={id} className="text-subtitle3">
        {label}
      </label>
      <div className="relative flex flex-col items-start w-full">
        <input
          id={id}
          type={inputType}
          {...register(id, {
            onChange: () => errors[id] && clearErrors(id),
          })}
          aria-invalid={errors[id] ? 'true' : 'false'}
          className={`${getInputClassNames(!!errors[id])} placeholder:text-gray-400 placeholder:text-2xl placeholder:font-normal placeholder:leading-[34px] placeholder:tracking-[-0.5px]`}
          placeholder={placeholder}
        />
        {type === 'password' && handlePasswordVisibility && (
          <div
            className="absolute cursor-pointer right-2"
            {...handlePasswordVisibility}
          >
            {showPassword ? <PasswordOpenEyeIcon /> : <PasswordCloseEyeIcon />}
          </div>
        )}
        {regexMessage && (
          <p className="text-gray-500 text-caption3 mt-[4px]">{regexMessage}</p>
        )}
      </div>
      {errors[id] && (
        <p className="mt-1 text-sm text-red">{errors[id].message}</p>
      )}
    </div>
  );
};

export default AuthInput;
