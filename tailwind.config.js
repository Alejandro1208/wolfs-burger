/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#c0392b',    // Rojo profundo
        secondary: '#e74c3c',  // Rojo brillante
        accent: '#f39c12',     // Naranja/amarillo
        'base-100': '#fdfdfd', // Blanco suave
        'base-content': '#3d3d3d', // Gris oscuro
        'brand-cream': '#f5e8c7', // Crema
      },
      fontFamily: {
        'display': ['Inter', 'system-ui', 'sans-serif'],
        'body': ['Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}