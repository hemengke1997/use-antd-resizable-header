const { defineConfig } = require('eslint-define-config');

module.exports = defineConfig({
  parser: '@typescript-eslint/parser',
  extends: ['plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended'],
  plugins: ['@typescript-eslint'],
  // "off" or 0 - turn the rule off
  // "warn" or 1 - turn the rule on as a warning (doesn't affect exit code)
  // "error" or 2 - turn the rule on as an error (exit code will be 1)
  rules: {
    'prettier/prettier': 'error',
    'arrow-body-style': 'off',
    'prefer-arrow-callback': 'off',
    '@typescript-eslint/no-var-requires': 'off',
  },
});
