/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Cormorant Garamond"', '"Noto Serif KR"', 'serif'],
        sans: ['"Noto Sans KR"', 'system-ui', 'sans-serif'],
      },
      colors: {
        ink: '#111111',
        // 포인트 컬러 1개 (테라코타). 바꾸고 싶으면 이 값만 고치세요.
        accent: '#9C4A2F',
      },
    },
  },
  plugins: [],
};
