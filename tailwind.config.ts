import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          500: '#00c2c7',
          700: '#155e75',
          900: '#0f172a'
        }
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(255,255,255,0.12), 0 18px 45px rgba(2,6,23,0.45)'
      }
    }
  },
  plugins: [],
} satisfies Config;
