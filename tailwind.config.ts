import type { Config } from 'tailwindcss';

const config: Config = {
  important: true,
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'custom-red': '#FF5A5A',
      },
    },
  },
  plugins: [],
};

export default config;
