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
        'fiord': {
          '50': '#f5f7fa',
          '100': '#ebeef3',
          '200': '#d1dbe6',
          '300': '#a9bbd0',
          '400': '#7b98b5',
          '500': '#5b7b9c',
          '600': '#415a77',
          '700': '#3a506a',
          '800': '#334559',
          '900': '#2e3b4c',
          '950': '#1f2632',
        },
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
