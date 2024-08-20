/** @type {import('tailwindcss').Config} */
const {
  colors,
  fontFamily,
  keyframes,
  animation,
  screens,
} = require("./src/theme.js");

module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: { colors, fontFamily, keyframes, animation, screens },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("tailwindcss-animation-delay"),
  ],
  plugins: [],
};
