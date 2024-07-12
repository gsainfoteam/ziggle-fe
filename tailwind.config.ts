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

        dark_dark: 'var(--dark_dark)',
        dark_greyDark: 'var(--dark_greyDark)',
        dark_greyBorder: 'var(--dark_greyBorder)',
        dark_grey: 'var(--dark_grey)',
        dark_white: 'var(--dark_white)',
        dark_secondary: 'var(--dark_secondary)',
      },
      spacing: {
        pageSide: '20vw',
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
  darkMode: 'class',
};
export default config;
