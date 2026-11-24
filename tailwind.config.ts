import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: '#F5EBE0', deep: '#E6D5C3' },
        secondary: '#2D4030',
        background: '#FAF8F5',
        ink: '#1A1A1A',
        muted: '#5C554E',
      },
      fontFamily: {
        serif: ['var(--font-noto-serif-tc)', 'serif'],
        sans: ['var(--font-noto-sans-tc)', 'sans-serif'],
      },
      letterSpacing: { editorial: '0.16em' },
      boxShadow: { soft: '0 18px 60px rgba(45, 64, 48, 0.09)' },
    },
  },
  plugins: [],
};

export default config;
