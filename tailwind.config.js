// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [ /* ... */ ],
  theme: {
    extend: {
      colors: {
        // ANTES: Tenías códigos de color aquí
        // AHORA: Usamos variables de CSS
        primary: 'rgb(var(--color-primary) / <alpha-value>)',
        secondary: 'rgb(var(--color-secondary) / <alpha-value>)',
        accent: 'rgb(var(--color-accent) / <alpha-value>)',
        'base-100': '#fdfdfd',
        'base-content': '#3d3d3d',
        'brand-cream': '#f5e8c7',
      },
      // ... tu fontFamily
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}