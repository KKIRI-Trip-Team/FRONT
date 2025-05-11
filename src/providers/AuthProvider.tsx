// contexts/AuthProvider.tsx
import { createContext, ReactNode, useContext, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { User } from '@/types/user';
import { useRouter } from 'next/navigation';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: { email: string; password: string }) => void;
  logout: () => void;
  isLoginLoading: boolean;
  isLogoutLoading: boolean;
  loginError: Error | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
    isLoginLoading,
    isLogoutLoading,
    loginError,
  } = useAuth();

  const value = {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
    isLoginLoading,
    isLogoutLoading,
    loginError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
}

export function withAuth(Component: React.ComponentType<any>) {
  return function WithAuth(props: any) {
    const { isAuthenticated, isLoading } = useAuthContext();
    const router = useRouter();

    useEffect(() => {
      if (!isLoading && !isAuthenticated) {
        router.replace('/login');
      }
    }, [isLoading, isAuthenticated, router]);

    if (isLoading) {
      return (
        <div className="flex items-center justify-center h-screen">
          로딩 중...
        </div>
      );
    }

    return isAuthenticated ? <Component {...props} /> : null;
  };
}
