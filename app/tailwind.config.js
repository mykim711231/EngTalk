export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#047857',
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          700: '#065f46',
        },
        paper: '#f8fafc',
      },
      fontFamily: {
        sans: ['var(--font-sans)'],
        en: ['var(--font-en)'],
      },
    },
  },
  plugins: [],
};
