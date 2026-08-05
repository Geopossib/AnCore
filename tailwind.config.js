/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        navy:     '#021739',
        surface:  '#0B2350',
        surface2: '#122A5C',
        gold:     '#C9980B',
        goldSoft: '#E4C05E',
        ink:      '#FFFFFF',
        muted:    '#9FADC9',
        line:     'rgba(201,152,11,0.22)',
        charcoal: '#1A1A1A'
      },
      fontFamily: {
        head: ['Manrope', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif']
      }
    }
  },
  plugins: []
};
