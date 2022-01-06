/* eslint-disable global-require */
module.exports = {
  plugins: [
    require('postcss-nesting'),
    require('autoprefixer')({ overrideBrowserslist: ['> 0.15% in CN'] }),
  ],
};
