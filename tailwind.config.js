/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          orange: {
            start: '#e39123',
            end: '#db5721',
          },
          dark: '#000000',
          light: '#ffffff',
        },
        primary: {
          50: '#fdf8f0',
          100: '#faf0e1',
          200: '#f4ddc2',
          300: '#edc598',
          400: '#e4a56c',
          500: '#de8448',
          600: '#db5721',
          700: '#b8471d',
          800: '#94391c',
          900: '#78301a',
          950: '#40170c',
        },
        secondary: {
          50: '#f9f9f9',
          100: '#f2f2f2',
          200: '#e6e6e6',
          300: '#d1d1d1',
          400: '#b0b0b0',
          500: '#888888',
          600: '#6d6d6d',
          700: '#5d5d5d',
          800: '#4f4f4f',
          900: '#454545',
          950: '#262626',
        },
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(135deg, #e39123 0%, #db5721 100%)',
        'brand-gradient-hover': 'linear-gradient(135deg, #de8448 0%, #b8471d 100%)',
      },
      fontFamily: {
        'sans': ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'Noto Sans', 'sans-serif'],
      },
      animation: {
        'scroll-left': 'scroll-left 30s linear infinite',
        'scroll-right': 'scroll-right 30s linear infinite',
        'fade-in': 'fade-in 0.5s ease-out',
        'slide-up': 'slide-up 0.5s ease-out',
      },
      keyframes: {
        'scroll-left': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        'scroll-right': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
