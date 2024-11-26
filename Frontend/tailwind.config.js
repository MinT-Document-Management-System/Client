/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'blue-green': '#13455B', 
        'peach': '#FFB27D',
        'primary': 'rgba(230, 149, 61, 0.7)',
      },
    },
  },
  plugins: [],
}

