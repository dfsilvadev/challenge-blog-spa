import { defineConfig } from '@tailwindcss/postcss';

export default defineConfig({
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#F7F7F7',
        heading: '#464646',
        text: '#9B9B9B',
        custom: {
          white: '#FFF',
          black: '#040404',
        },
      },
    },
  },
});
