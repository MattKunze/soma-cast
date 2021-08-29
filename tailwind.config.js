// lightBlue is renamed 'sky' - this still triggers a console warning due
// to the import but without explicitly listing the colors I'm not seeing a
// way around that
const { lightBlue, ...colors } = require("tailwindcss/colors")

module.exports = {
  purge: [
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: { ...colors, transparent: "transparent" },
    extend: {},
  },
  variants: {
    extend: {
      backgroundColor: ["active"],
      cursor: ["disabled"],
      opacity: ["disabled"],
    },
  },
  plugins: [],
}
