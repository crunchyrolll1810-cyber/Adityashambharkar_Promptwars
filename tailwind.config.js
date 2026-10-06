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
        coral: { DEFAULT: '#F43F5E', 400: '#FB7185', 500: '#F43F5E' },
        emerald: { DEFAULT: '#10B981', 400: '#34D399', 500: '#10B981' },
        amber: { DEFAULT: '#F59E0B', 400: '#FBBF24', 500: '#F59E0B' },
        cyan: { DEFAULT: '#06B6D4', 400: '#22D3EE', 500: '#06B6D4' },
        violet: { DEFAULT: '#8B5CF6', 400: '#A78BFA', 500: '#8B5CF6', 600: '#7C3AED' },
        volt: { DEFAULT: '#D2FF00', 400: '#E2FF4D', 500: '#D2FF00', 600: '#B5DC00' },
        papaya: { DEFAULT: '#FF8000', 400: '#FFA233', 500: '#FF8000', 600: '#E67300' },
        carbon: { 950: '#08090C', 900: '#0D0E12', 800: '#121318', 700: '#181A22' },
        brand: {
          50: '#f5f3ff',
          100: '#ede9fe',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
          900: '#4c1d95',
        }
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.3s ease-out forwards',
        'shimmer': 'shimmer 2.5s linear infinite',
        'border-glow': 'borderGlow 3s ease-in-out infinite alternate',
        'waveform': 'waveform 1.2s ease-in-out infinite alternate',
        'radial-pulse': 'radialPulse 4s ease-in-out infinite',
        'slide-up-fade': 'slideUpFade 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'blur-fade': 'blurFadeIn 0.85s cubic-bezier(0.16, 1, 0.3, 1) both',
        'marquee': 'marquee 28s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        blurFadeIn: {
          '0%': { opacity: '0', filter: 'blur(12px)', transform: 'translateY(16px)' },
          '100%': { opacity: '1', filter: 'blur(0px)', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUpFade: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        borderGlow: {
          '0%': { borderColor: 'rgba(210, 255, 0, 0.2)', boxShadow: '0 0 15px rgba(210, 255, 0, 0.1)' },
          '100%': { borderColor: 'rgba(210, 255, 0, 0.6)', boxShadow: '0 0 30px rgba(210, 255, 0, 0.3)' },
        },
        waveform: {
          '0%': { height: '20%' },
          '100%': { height: '100%' },
        },
        radialPulse: {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.12' },
          '50%': { transform: 'scale(1.15)', opacity: '0.22' },
        },
      }
    },
  },
  plugins: [],
}
