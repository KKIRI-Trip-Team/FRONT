// app/components/ErrorPageLayout.tsx
'use client';

import { useRouter } from 'next/navigation';

interface ErrorPageLayoutProps {
  title: string;
  subtitle: string;
  description: string;
}

const ErrorPageLayout: React.FC<ErrorPageLayoutProps> = ({
  title,
  subtitle,
  description,
}) => {
  const router = useRouter();

  const handleMoveHome = () => {
    router.replace('/');
  };

  return (
    <div className="flex w-full mb:w-[375px] tb:w-[768px] pc:w-[1200px] h-[600px] mb:h-[500px] tb:h-[700px] pc:h-[934px] pt-[50px] mb:pt-[40px] tb:pt-[80px] pc:pt-[100px] flex-col items-center gap-3 mb:gap-4 tb:gap-4 pc:gap-5 shrink-0 bg-white">
      <div className="flex w-[375px] flex-col items-center gap-[11px]">
        <p className="text-[var(--Gray900,#222)] text-center font-pretendard text-[40px] font-bold leading-[40px] tracking-[-0.5px]">
          {title}
        </p>
        <p className="text-[var(--Gray900,#222)] text-center text-subtitle3 tracking-[-0.5px]">
          {subtitle}
        </p>
        <p className="text-[var(--Gray600,#999)] text-center text-body2 tracking-[-0.5px]">
          {description}
        </p>
      </div>
      <button
        className="flex w-[130px] py-[10px] justify-center items-center rounded-lg border border-[var(--Gray300,#E0E0E0)] text-subtitle3 tracking-[-0.03125rem] text-[var(--Gray600,#999)] text-center"
        onClick={handleMoveHome}
      >
        홈으로 이동
      </button>
    </div>
  );
};

export default ErrorPageLayout;
