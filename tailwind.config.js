/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Nueva paleta de colores "Wolf's Burger"
        primary: '#c0392b',    // Rojo profundo del fondo del logo
        secondary: '#e74c3c',  // Un rojo un poco más brillante para acentos
        accent: '#f39c12',     // Naranja/amarillo del queso y el pan
        'base-100': '#fdfdfd', // Un blanco muy suave para el fondo principal
        'base-content': '#3d3d3d', // Un gris oscuro para el texto principal
        'brand-cream': '#f5e8c7', // El color crema del círculo y las letras del logo
      },
      fontFamily: {
        'display': ['Inter', 'system-ui', 'sans-serif'],
        'body': ['Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}