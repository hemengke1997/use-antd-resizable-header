/// <reference types="vitest" />
import { defineConfig } from 'vitest/config'

export default defineConfig(() => {
  return {
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './__tests__/setup.ts',
    },
  }
})
