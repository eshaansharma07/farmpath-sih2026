/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        agri: {
          50: '#f2fbf5',
          100: '#e1f6e9',
          200: '#c5ebd3',
          300: '#99d9b4',
          400: '#64bf8d',
          500: '#3da46e',
          600: '#2c8556',
          700: '#246946',
          800: '#1f5439',
          900: '#1b4530',
          950: '#0b2619',
        },
        earth: {
          50: '#faf6f0',
          100: '#f3eadf',
          200: '#e5d3be',
          300: '#d5b798',
          400: '#c39771',
          500: '#b68055',
          600: '#a76c48',
          700: '#8b543c',
          800: '#714435',
          900: '#5c392e',
        }
      }
    },
  },
  plugins: [],
};
