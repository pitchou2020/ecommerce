/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  extend: {
  keyframes: {
    fadeIn: {
      '0%': { opacity: 0 },
      '100%': { opacity: 1 },
    },
    scaleIn: {
      '0%': { transform: 'scale(0.8)' },
      '100%': { transform: 'scale(1)' },
    }
  },
  animation: {
    fadeIn: 'fadeIn 0.3s ease-out',
    scaleIn: 'scaleIn 0.3s ease-out',
  }
}

}