/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
      },
      colors: {
        vinho: '#6F1D1B',
        vinhoClaro: '#8B3A3A',
        vinhoEscuro: '#4E1412',
        vinhoMaisClaro: '#A65E5E',
        vinhoMaisEscuro: '#3B0F0F',
        vinhoTransparente: 'rgba(111, 29, 27, 0.5)',
        vinhoTransparenteClaro: 'rgba(139, 58, 58, 0.5)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0, transform: 'translateY(-5%)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
