/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        nexora: {
          dark: '#050505',
          darker: '#0A0A0A',
          darkest: '#111111',
          gold: '#D4AF37',
          goldLight: '#F5E6B3',
          goldLighter: '#FFF7E6',
        }
      }
    },
  },
  plugins: [],
}
