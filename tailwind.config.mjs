/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Enable dark mode with class strategy
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#E50914', // Netflix red
          50: '#FEE2E2',
          100: '#FDC4C4',
          200: '#FB9999',
          300: '#F96D6D',
          400: '#F64242',
          500: '#E50914', // Main red
          600: '#C70812',
          700: '#A9070F',
          800: '#8B050C',
          900: '#6D040A',
        },
        secondary: {
          DEFAULT: '#121212', // Rich black
          50: '#F8F8F8',
          100: '#E0E0E0',
          200: '#C2C2C2',
          300: '#A3A3A3',
          400: '#858585',
          500: '#666666',
          600: '#484848',
          700: '#2A2A2A',
          800: '#1A1A1A',
          900: '#121212', // Main black
        },
        accent: {
          DEFAULT: '#FF2D20', // Bright red
          light: '#FF5348',
          dark: '#D41C10',
          glow: 'rgba(229, 9, 20, 0.5)',
        },
        // Additional colors for variety
        gray: {
          dark: '#1E1E1E',
          medium: '#2D2D2D',
          light: '#3D3D3D',
        },
        white: {
          DEFAULT: '#FFFFFF',
          off: '#F5F5F5',
          muted: 'rgba(255, 255, 255, 0.8)',
          faded: 'rgba(255, 255, 255, 0.6)',
        },
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'monospace'],
      },
      boxShadow: {
        'smooth': '0 4px 20px rgba(229, 9, 20, 0.15)',
        'smooth-lg': '0 10px 30px -5px rgba(229, 9, 20, 0.2)',
        'button': '0 4px 10px rgba(229, 9, 20, 0.3)',
        'card': '0 8px 30px rgba(0, 0, 0, 0.12)',
        'red-glow': '0 0 20px rgba(229, 9, 20, 0.5)',
        'inner-red': 'inset 0 2px 10px rgba(229, 9, 20, 0.2)',
        'neon': '0 0 5px rgba(229, 9, 20, 0.5), 0 0 20px rgba(229, 9, 20, 0.3)',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'red-black-gradient': 'linear-gradient(to right, #E50914, #121212)',
        'dark-gradient': 'linear-gradient(to bottom, #1A1A1A, #121212)',
        'red-glow-radial': 'radial-gradient(circle, rgba(229, 9, 20, 0.2) 0%, rgba(18, 18, 18, 0) 70%)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(229, 9, 20, 0.5), 0 0 10px rgba(229, 9, 20, 0.3)' },
          '100%': { boxShadow: '0 0 10px rgba(229, 9, 20, 0.7), 0 0 20px rgba(229, 9, 20, 0.5)' },
        },
      },
    },
  },
  plugins: [],
};
