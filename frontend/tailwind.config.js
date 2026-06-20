/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        obsidian: '#0a0a0a',
        charcoal: '#121212',
        graphite: '#1a1a1a',
        'soft-gold': '#c9a962',
        'soft-gold-light': '#d9bd84',
        'muted-white': '#f5f3ef',
        'muted-gray': '#8a8a8a',
        cream: '#f8f7f4',
        'light-gray': '#e8e6e1',
        'dark-text': '#1a1a1a',
        'light-text': '#4a4a4a',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        widest: '0.2em',
      },
      lineHeight: {
        tighter: '1.05',
        snug: '1.25',
      },
      animation: {
        'fade-in': 'fadeIn 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-in-up': 'fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'float': 'float 7s ease-in-out infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'shimmer': 'shimmer 3s ease-in-out infinite',
        'twinkle': 'twinkle 4s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-16px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        twinkle: {
          '0%, 100%': { opacity: '0.2', transform: 'scale(0.8)' },
          '50%': { opacity: '0.9', transform: 'scale(1.2)' },
        },
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      boxShadow: {
        'gold-soft': '0 0 60px -12px rgba(201, 169, 98, 0.25)',
        'gold-lg': '0 0 100px -20px rgba(201, 169, 98, 0.35)',
        'book': '0 40px 100px -30px rgba(0, 0, 0, 0.85), 0 20px 60px -20px rgba(201, 169, 98, 0.15)',
        'book-light': '0 40px 100px -30px rgba(0, 0, 0, 0.25), 0 20px 60px -20px rgba(201, 169, 98, 0.2)',
      },
    },
  },
  plugins: [],
};
