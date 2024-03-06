/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      height: { 'full-minus-header': 'calc(100vh - 8rem)' },
    },
  },
  plugins: [],
}
