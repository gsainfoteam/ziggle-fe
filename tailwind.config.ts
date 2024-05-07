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
        primary: 'var(--primary)',
        secondary: 'var(--secondary)',
        text: 'var(--text)',
        secondaryText: 'var(--secondaryText)',
        white: 'var(--white)',
        deselected: 'var(--deselected)',
        grey: 'var(--grey)',
        greyDark: 'var(--greyDark)',
        greyBorder: 'var(--greyBorder)',
        greyLight: 'var(--greyLight)',
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
  plugins: [require('tailwind-scrollbar')({ nocompatible: true })],
};
export default config;
