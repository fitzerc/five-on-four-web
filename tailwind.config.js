/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
      "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    colors: {
      bkg: 'rgba(var(--color-bkg) / <alpha-value>)',
      content: 'rgba(var(--color-content) / <alpha-value>)',
      accent: {
        1: 'rgb(var(--color-accent-1) / <alpha-value>)',
        2: 'rgb(var(--color-accent-2) / <alpha-value>)',
        3: 'rgb(var(--color-accent-3) / <alpha-value>)',
      },
    },
    extend: {},
  },
  plugins: [],
}
