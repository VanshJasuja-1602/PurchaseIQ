/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          indigo: "#4F46E5",
          DEFAULT: "#4F46E5",
        },
        brand: {
          indigo: "#4F46E5",
          purple: "#8B5CF6",
          pink: "#EC4899",
          cyan: "#06B6D4",
          green: "#10B981",
          orange: "#F59E0B",
          red: "#EF4444",
        }
      },
      fontFamily: {
        sans: ["'Plus Jakarta Sans'", "Outfit", "Inter", "sans-serif"],
      },
      animation: {
        'gradient-x': 'gradient-x 15s ease infinite',
        'pulse-slow': 'pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float-slow': 'float 6s ease-in-out infinite',
        'float-medium': 'float 4s ease-in-out infinite',
        'sparkle': 'sparkle 1.5s ease-in-out infinite',
      },
      keyframes: {
        'gradient-x': {
          '0%, 100%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'sparkle': {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.2)' },
        }
      },
      boxShadow: {
        'premium': '0 10px 30px -10px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.02)',
        'premium-hover': '0 20px 40px -15px rgba(79, 70, 229, 0.1), 0 1px 10px rgba(79, 70, 229, 0.05)',
        'glow-indigo': '0 0 20px rgba(79, 70, 229, 0.25)',
        'glow-green': '0 0 20px rgba(16, 185, 129, 0.25)',
        'glow-orange': '0 0 20px rgba(245, 158, 11, 0.25)',
      }
    },
  },
  plugins: [],
}
