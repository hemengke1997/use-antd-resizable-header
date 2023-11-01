import { createRequire } from 'node:module'
const require = createRequire(import.meta.url)

const { defineConfig } = require('@minko-fe/eslint-config')
export default defineConfig([
  {
    rules: {
      'no-empty-pattern': 'off',
      'unicorn/prefer-at': 'off',
    },
  },
])
