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
    },
  },
  plugins: [],
}

