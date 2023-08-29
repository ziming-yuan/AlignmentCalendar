/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary': colors.indigo,
      },
      keyframes: {
        // shake2: {
        //   "0%, 100%": { transform: "translateX(0)" },
        //   "10%, 30%, 50%, 70%, 90%": { transform: "translateX(-5px)" },
        //   "20%, 40%, 60%, 80%": { transform: "translateX(5px)" },
        // },
        shake: {
          "0%, 100%": { transform: "translateX(0)" },
          "40%, 80%": { transform: "translateX(-5px)" },
          "20%, 60%": { transform: "translateX(5px)" },
        },
      },
      animation: {
        shake: "shake 0.4s linear 0s",
      },
    },
  },
  plugins: [],
}