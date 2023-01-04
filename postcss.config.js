module.exports = {
  plugins: [require('postcss-nested'), require('autoprefixer')({ overrideBrowserslist: ['> 0.15% in CN'] })],
}
