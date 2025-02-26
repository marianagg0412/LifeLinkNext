
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
        lilita: ['"Lilita One", "cursive"'],
      },
    },
  },
});



