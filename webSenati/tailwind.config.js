/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'custom': '0px 0px 25px -10px rgba(0, 0, 0, 0.38)',
      },
      spacing: {
        '1/5': '3%',
      },
      minWidth: {
        '400px': '800px',
        '200px': '800px',
      },
      maxWidth: {
        '800px': '800px',
      },
    },
  },
  plugins: [],
}

