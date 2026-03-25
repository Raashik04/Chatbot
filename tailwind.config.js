/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        wood: {
          50: '#fcf1ec',
          100: '#f6dfd1',
          200: '#efc1ac',
          300: '#e59d7d',
          400: '#d9744c',
          500: '#cf5429',
          600: '#bb3f1c',
          700: '#9b301a',
          800: '#7e2a1b',
          900: '#652518',
        }
      }
    },
  },
  plugins: [],
}
