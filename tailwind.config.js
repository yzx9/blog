const colors = require("tailwindcss/colors")

module.exports = {
  purge: [
    "./posts/**/*.md",
    "./packages/*/src/**/*.css",
    "./packages/*/src/**/*.vue",
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
