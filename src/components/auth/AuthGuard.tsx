// components/auth/AuthGuard.tsx
'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

interface AuthGuardProps {
  children: React.ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Skip during initial load
    if (isLoading) return;

    // If not authenticated and not on an auth route, redirect to login
    if (
      !isAuthenticated &&
      !pathname?.startsWith('/login') &&
      !pathname?.startsWith('/register')
    ) {
      console.log('로그인이 필요한 페이지입니다');
      alert('로그인이 필요한 페이지입니다');
      router.push(
        `/login/form?redirect=${encodeURIComponent(pathname || '/')}`,
      );
    }
  }, [isAuthenticated, isLoading, pathname, router]);

  // Show nothing while checking authentication
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        로딩 중...
      </div>
    );
  }

  // If not authenticated on protected route, return nothing (will redirect)
  if (
    !isAuthenticated &&
    !pathname?.startsWith('/login') &&
    !pathname?.startsWith('/register')
  ) {
    return null;
  }

  // Authenticated or on public route, show content
  return <>{children}</>;
}
