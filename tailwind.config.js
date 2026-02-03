/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      spacing: {
        '100mm': '100mm',
        '50mm': '50mm',
        '4mm': '4mm',
      },
      fontSize: {
        'xxs': '7px',
      },
    },
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