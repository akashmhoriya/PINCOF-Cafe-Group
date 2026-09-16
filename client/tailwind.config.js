/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        espresso: {
          50: '#f7f4f2',
          100: '#ede6e1',
          200: '#dccfc6',
          300: '#c5b1a3',
          400: '#a78b79',
          500: '#8c6b57',
          600: '#6f503e',
          700: '#543b2d',
          800: '#3c291f',
          900: '#261912',
          950: '#140c08',
        },
        charcoal: {
          900: '#121212',
          800: '#18181b',
          700: '#27272a',
        },
        cream: {
          50: '#fffefc',
          100: '#faf7f2',
          200: '#f5efe6',
          300: '#ece2d3',
          400: '#dfd2be',
        },
        caramel: {
          300: '#e5b27a',
          400: '#d79a5b',
          500: '#c88949',
          600: '#b06f34',
          700: '#8f5326',
        },
        terracotta: {
          500: '#a04d2b',
          600: '#853c1f',
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
        display: ['"Playfair Display"', 'serif'],
      },
      letterSpacing: {
        widest: '.2em',
        ultra: '.3em',
      },
      animation: {
        'spin-slow': 'spin 20s linear infinite',
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
}
