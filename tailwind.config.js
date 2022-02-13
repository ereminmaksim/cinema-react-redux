module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      animation: {
        transitionTimingFunction: 'ease-in',
        transition: 'all 0.5s'
      },
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
      },
      backgroundImage: {
       'linearGradient':('180deg transparent rgba(37,37,37,061) #111')
      }
    },

  },
  plugins: [],
}