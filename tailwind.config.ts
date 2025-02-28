import type { Config } from 'tailwindcss';

const config: Config = {
  important: true, // Ensures Tailwind styles override others
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './src/pages/**/*.{js,ts,jsx,tsx}', // ✅ Include `src/` if Next.js is using it
    './src/components/**/*.{js,ts,jsx,tsx}', // ✅ Include `src/` components
    './app/**/*.{js,ts,jsx,tsx}', // ✅ For Next.js App Router (if applicable)
  ],
  theme: {
    extend: {
      colors: {
        'custom-red': '#FF5A5A',
      },
      fontFamily: {
        lilita: ['Lilita One', 'sans-serif'],
      }
    },
  },
  plugins: [],
};

export default config;

