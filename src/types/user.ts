// types/user.ts
export interface User {
  email: string;
  nickname: string;
  profileUrl: string;
}

export interface UserWithToken extends User {
  accessToken: string;
}

export interface UserData extends UserWithToken {
  id: string;
  birthDay: string;
  phoneNumber: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  statusCode: number;
  message: string;
  data: UserWithToken;
  timestamp: string;
  // NOTE: 이건 왜이러는걸까...(LoginForm 46~51)
  email: string;
  nickname: string;
  profileUrl: string;
  accessToken: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

export interface UserState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  setAuthenticated: (isAuthenticated: boolean) => void;
  setLoading: (isLoading: boolean) => void;
  logout: () => void;
}
