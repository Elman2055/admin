/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        'desktop': '1280px',

        'desktop2': '1700px'
      },
      fontFamily: {
        'jost': ["Jost", "sans-serif"],
      },
    },
  },
  plugins: [],
};
