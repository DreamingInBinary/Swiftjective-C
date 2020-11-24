module.exports = {
  parser: "postcss-scss",
  plugins: [
    require("autoprefixer"),
    require("tailwindcss")("./tailwind.config.js"),
  ],
};
