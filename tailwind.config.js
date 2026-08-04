/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Фоновые поверхности
        night: {
          DEFAULT: '#050914',
          light: '#09152B',
        },
        // Фирменная палитра AI Compass → утилиты: brand-blue, brand-sky, brand-gold
        brand: {
          blue: '#168BFF',
          sky: '#65C7FF',
          gold: '#D9B56D',
        },
        // Типографика → утилиты: text-primary, text-secondary
        text: {
          primary: '#F7F8FC',
          secondary: '#AAB6CC',
        },
        // Расширенная синяя шкала (compass-*)
        compass: {
          50: '#f0f7ff',
          100: '#e0effe',
          200: '#b9dffd',
          300: '#7cc5fb',
          400: '#36a7f6',
          500: '#0c8ce9',
          600: '#006fc7',
          700: '#0158a1',
          800: '#064b85',
          900: '#0b3f6e',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 40px rgba(22, 139, 255, 0.25)',
        'glow-gold': '0 0 40px rgba(217, 181, 109, 0.2)',
        'glow-sm': '0 0 20px rgba(22, 139, 255, 0.15)',
        card: '0 8px 32px rgba(0, 0, 0, 0.4)',
        'card-hover': '0 16px 48px rgba(22, 139, 255, 0.15)',
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'pulse-glow': 'pulseGlow 4s ease-in-out infinite',
        float: 'float 6s ease-in-out infinite',
        twinkle: 'twinkle 3s ease-in-out infinite',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        twinkle: {
          '0%, 100%': { opacity: '0.3' },
          '50%': { opacity: '1' },
        },
      },
      transitionDuration: {
        800: '800ms',
      },
    },
  },
  plugins: [],
}
