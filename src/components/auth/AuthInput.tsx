// components/AuthInput.tsx
import React from 'react';
import { UseFormRegister, Path, FieldValues } from 'react-hook-form';
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
  successMessage?: string;
  isDirty?: boolean;
}

const baseInputClasses =
  'flex h-12 items-center gap-2.5 self-stretch border-b-[0.6px] focus:outline-none w-full transition-colors duration-200';
const errorInputClasses = 'border-b-[var(--red)]';
const validInputClasses = 'border-b-[var(--green)]';
const normalInputClasses =
  'border-b-[var(--Gray400)] focus:border-b-[var(--Gray900)]';

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
  successMessage,
  isDirty = false,
}: AuthInputProps<T>) => {
  const inputType = type === 'password' && showPassword ? 'text' : type;
  const hasError = !!errors[id];
  const isValid = isDirty && !hasError;

  const getInputClassNames = () => {
    if (hasError) return `${baseInputClasses} ${errorInputClasses}`;
    if (isValid) return `${baseInputClasses} ${validInputClasses}`;
    return `${baseInputClasses} ${normalInputClasses}`;
  };

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
          aria-invalid={hasError ? 'true' : 'false'}
          className={`${getInputClassNames()} placeholder:text-gray-400 placeholder:text-2xl placeholder:font-normal placeholder:leading-[34px] placeholder:tracking-[-0.5px]`}
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
        {hasError ? (
          <p className="mt-1 text-sm text-[var(--red)]">{errors[id].message}</p>
        ) : (
          <>
            {isValid && successMessage && (
              <p className="mt-1 text-sm text-[var(--green)]">
                {successMessage}
              </p>
            )}
            {!isValid && regexMessage && (
              <p className="mt-1 text-sm text-[var(--Gray500)]">
                {regexMessage}
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AuthInput;
