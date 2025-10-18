/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    'bg-neutral-bg',
    'bg-gradient-primary',
    'text-deep-blue',
    'text-purple-accent',
    'text-accent-gold'
  ],
  theme: {
    extend: {
      colors: {
        'deep-blue': '#0B57A4',
        'medium-blue': '#2E86FF',
        'purple-accent': '#7B61FF',
        'light-gradient-start': '#4EA1FF',
        'light-gradient-end': '#9B7BFF',
        'neutral-bg': '#F7FAFF',
        'accent-gold': '#FFD166',
      },
      fontFamily: {
        'arabic': ['Noto Kufi Arabic', 'Cairo', 'Arial', 'sans-serif'],
        'english': ['Poppins', 'Arial', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #4EA1FF 0%, #9B7BFF 100%)',
        'gradient-blue': 'linear-gradient(135deg, #0B57A4 0%, #2E86FF 100%)',
      },
      animation: {
        'bounce-slow': 'bounce 2s infinite',
        'pulse-slow': 'pulse 3s infinite',
        'wiggle': 'wiggle 1s ease-in-out infinite',
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        }
      }
    },
  },
  plugins: [],
}
