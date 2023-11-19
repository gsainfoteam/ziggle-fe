export default {
  singleQuote: true,
  trailingComma: 'all',
  plugins: [import('prettier-plugin-tailwindcss')],
  tailwindAttributes: ['className', 'containerClassName', 'carouselClassName'],
}
