const colors = require("tailwindcss/colors")

module.exports = {
  purge: [
    "./src/**/*.md",
    "./theme/**/*.css",
    "./theme/**/*.vue",
    "./theme/**/*.html",
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: colors.cyan,
        secondary: colors.pink,
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography")],
}
