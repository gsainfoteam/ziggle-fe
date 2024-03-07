import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#eb6263',
        secondary: '#ffeaea',
        text: '#252525',
        secondaryText: '#959595',
        white: '#ffffff',
        deselected: '#d6d6d6',
        greyDark: '#6e6e73',
        greyBorder: '#d6d6d6',
        greyLight: '#f5f5f7',
      },
      spacing: {
        pageSide: '10vw',
      },
      boxShadow: {
        thumbnail: `rgb(0 0 0 / 20%) 0 5px, rgb(0 0 0 / 20%) 0 10px, rgb(0 0 0 / 15%) 0 15px, rgb(0 0 0 / 10%) 0 20px, rgb(0 0 0 / 5%) 0 25px`,
      },
      lineClamp: {
        8: '8',
        10: '10',
      },
    },
  },
  plugins: [require('tailwind-scrollbar')],
};
export default config;
