const tailwindcss = await import('@tailwindcss/postcss');
const autoprefixer = await import('autoprefixer');

export default {
  plugins: [
    tailwindcss.default(),
    autoprefixer.default(),
  ],
}