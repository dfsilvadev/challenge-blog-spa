import { defineConfig } from '@tailwindcss/postcss';

export default defineConfig({
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#F7F7F7',
        heading: '#464646',
        text: '#9B9B9B',
      },
      screens: {
        '3xl': '1920px',
        '4xl': '2560px',
      },
    },
  },
});
