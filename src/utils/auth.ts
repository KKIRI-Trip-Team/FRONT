// utils/auth.ts

export const setToken = (token: string) => {
  localStorage.setItem('accessToken', token);
};

export const getToken = () => {
  const accessToken = localStorage.getItem('accessToken');
  return accessToken;
};
