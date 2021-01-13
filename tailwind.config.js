const defaultTheme = require("tailwindcss/defaultTheme");
const plugin = require("tailwindcss/plugin");

// Figure this out
module.exports = {
  purge: [
    './*.html',
    './*.js'
  ],
  darkMode: 'media', 
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter var", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  variants: {
    rounded: ['hover'],
    extend: {},
  },
  plugins: [require("@tailwindcss/typography"), require('@tailwindcss/forms')],
};
