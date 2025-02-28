
import { defineConfig } from 'twind';
import tailwind from '@twind/preset-tailwind';

export default defineConfig({
  presets: [tailwind()],
  theme: {
    extend: {
      fontFamily: {
        // sans: `Inter, ui-sans-serif, system-ui, -apple-system,
        //     BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans",
        //     sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"`,
        'lilita': '"Lilita One"'
      },
    },
  },

  preflight : 
  {
     '@import': `url('https://fonts.googleapis.com/css2?family=Lilita+One&display=swap')`,

     '@font-face': [
       {
  
        fontFamily: 'Lilita One',
        fontDisplay: 'swap',
        src: 'url(https://fonts.gstatic.com/s/lilitaone/v15/i7dPIFZ9Zz-WBtRtedDbYEF8RQ.woff2) format("woff2")',
        fontWeight: '400',
       }

     ]
  }
});



