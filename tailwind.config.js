/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{ts,tsx}','./components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#0d0d0f', surface: '#161619', surface2: '#1e1e24',
        border: '#2a2a35', muted: '#7a7890', accent: '#c8f04d',
        accent2: '#ff6b6b', accent3: '#6bceff',
      },
      fontFamily: { serif: ['Fraunces','serif'], mono: ['DM Mono','monospace'] },
    },
  },
  plugins: [],
};
