const colors = require("tailwindcss/colors")

module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      ...colors,
      primary: colors.cyan,
      secondary: colors.pink,
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
