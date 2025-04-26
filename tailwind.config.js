/** @type {import('tailwindcss').Config} */
export const content = [
  './src/app/**/*.{js,ts,jsx,tsx}',
  './src/components/**/*.{js,ts,jsx,tsx}',
];
export const theme = {
  screens: {
    mb: '375px',
    // => @media (min-width: 375px) { ... }

    tb: '768px',
    // => @media (min-width: 768px) { ... }

    pc: '1440px',
    // => @media (min-width: 1440px) { ... }
  },
  extend: {
    fontFamily: {
      pretendard: ['Pretendard', 'sans-serif'],
      // 기본 폰트로 설정하고 싶다면 아래 줄 추가
      sans: ['Pretendard', 'ui-sans-serif', 'system-ui', 'sans-serif'],
    },
  },
};
export const plugins = [];
