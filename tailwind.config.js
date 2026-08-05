/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        night: {
          DEFAULT: '#050914',
          light: '#09152B',
        },
        // Champagne Gold accents (legacy names brand-blue / brand-sky)
        brand: {
          blue: '#E6D2A2',
          sky: '#F0E3C0',
          gold: '#D9BE7A',
        },
        text: {
          primary: '#FFFFFF',
          secondary: 'rgba(255, 255, 255, 0.72)',
        },
        compass: {
          50: '#F7F1E4',
          100: '#F0E3C0',
          200: '#E6D2A2',
          300: '#E0C896',
          400: '#D9BE7A',
          500: '#D9BE7A',
          600: '#B09868',
          700: '#8F7C54',
          800: '#6E6042',
          900: '#4A412E',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 40px rgba(230, 210, 162, 0.18)',
        'glow-gold': '0 0 40px rgba(217, 190, 122, 0.16)',
        'glow-sm': '0 0 20px rgba(230, 210, 162, 0.12)',
        card: '0 8px 32px rgba(0, 0, 0, 0.4)',
        'card-hover': '0 16px 48px rgba(230, 210, 162, 0.1)',
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
