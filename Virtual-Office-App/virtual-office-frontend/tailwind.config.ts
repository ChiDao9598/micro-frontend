import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Virtual Office design tokens
        office: {
          bg: '#0a0a0f',
          surface: '#12121a',
          border: 'rgba(255,255,255,0.08)',
          accent: '#61DAFB',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config;
