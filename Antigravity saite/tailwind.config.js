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
        dark: {
          950: '#07090E',
          900: '#0B0F17',
          850: '#0F1623',
          800: '#141D2E',
          700: '#1E293B',
          600: '#334155',
        },
        cyan: {
          glow: '#00F0FF',
          accent: '#00D2EE',
          dim: '#0284C7',
        },
        purple: {
          glow: '#A855F7',
          accent: '#8B5CF6',
        },
        lime: {
          glow: '#84CC16',
          accent: '#10B981',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      boxShadow: {
        'glow-cyan': '0 0 25px -5px rgba(0, 240, 255, 0.3)',
        'glow-purple': '0 0 25px -5px rgba(168, 85, 247, 0.3)',
        'glow-cyan-lg': '0 0 40px -5px rgba(0, 240, 255, 0.4)',
        'card': '0 8px 30px rgba(0, 0, 0, 0.45)',
        'card-hover': '0 15px 40px -10px rgba(0, 229, 255, 0.25)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
