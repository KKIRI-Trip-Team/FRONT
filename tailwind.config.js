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
    colors: {
      primary: 'var(--Primary)',
      primaryLight: 'var(--PrimaryLight)',
      secondary: 'var(--Secondary)',
      tertiary: 'var(--Tertiary)',

      button: 'var(--Button)',

      gray: {
        100: 'var(--Gray100)',
        200: 'var(--Gray200)',
        300: 'var(--Gray300)',
        400: 'var(--Gray400)',
        500: 'var(--Gray500)',
        600: 'var(--Gray600)',
        700: 'var(--Gray700)',
        800: 'var(--Gray800)',
        900: 'var(--Gray900)',
      },

      red: 'var(--red)',
      green: 'var(--green)',
      yellow: 'var(--yellow)',
    },
    fontFamily: {
      pretendard: ['Pretendard', 'sans-serif'],
      sans: ['Pretendard', 'ui-sans-serif', 'system-ui', 'sans-serif'],
    },
    fontSize: {
      // 헤더
      h1: [
        '28px',
        {
          lineHeight: '40px',
          fontWeight: '700',
        },
      ],
      h2: [
        '24px',
        {
          lineHeight: '34px',
          fontWeight: '700',
        },
      ],
      h3: [
        '20px',
        {
          lineHeight: '30px',
          fontWeight: '700',
        },
      ],

      // 서브타이틀
      subtitle1: [
        '18px',
        {
          lineHeight: '26px',
          fontWeight: '700',
        },
      ],
      subtitle2: [
        '16px',
        {
          lineHeight: '22px',
          fontWeight: '700',
        },
      ],
      subtitle3: [
        '14px',
        {
          lineHeight: '20px',
          fontWeight: '700',
        },
      ],

      // 바디
      body1: [
        '16px',
        {
          lineHeight: '22px',
          fontWeight: '400',
        },
      ],
      body2: [
        '14px',
        {
          lineHeight: '20px',
          fontWeight: '400',
        },
      ],

      // 캡션
      caption1: [
        '12px',
        {
          lineHeight: '18px',
          fontWeight: '700',
        },
      ],
      caption2: [
        '12px',
        {
          lineHeight: '18px',
          fontWeight: '400',
        },
      ],
      caption3: [
        '10px',
        {
          lineHeight: '16px',
          fontWeight: '700',
        },
      ],
      caption4: [
        '10px',
        {
          lineHeight: '16px',
          fontWeight: '500',
        },
      ],
    },
    backgroundImage: {
      'temporary-img': "url('@/public/images/exampleBusan.png')",
      'detail-image': "url('@/public/images/boardDetailImage.png')",
    },
  },
};
export const plugins = [];
