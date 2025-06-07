// constants/endpoints.ts

export const ENDPOINTS = {
  // 토큰
  TOKEN: {
    ACCESS: '/auth/access',
    REFRESH: '/auth/refresh',
  },

  // 인증/인가
  USER: {
    PASS: 'user/pass',
    REGISTER: 'user/register',
    PROFILE: 'user/register/profile',
    LOGIN: 'user/login',
    LOGOUT: 'user/logout',
    INFO: 'user/information/',
    DELETE: 'user',
    ME: 'user/me',
    ME_FEEDS: 'user/me/feeds',
    ME_DASHBOARD: 'user/me/dashboard',
  },

  // 이미지
  IMAGES: {
    UPLOAD: 'images/upload',
    GET: 'images/url',
  },
};
