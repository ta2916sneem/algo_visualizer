module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        balsamiq: ['Balsamiq Sans'],
        montserrat: ['Montserrat']
      },
      animation: {
        ping: 'pong 1s cubic-bezier(0, 0, 0.2, 1) infinite'
      },
      keyframes: {
        pong: {
          '0%, 100%': {transform: 'scale(1)'},
          '50%': {transform: 'scale(1.3)'},
        }
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
