import { defineConfig } from 'vite'

export default defineConfig(() => {
  return {
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './__tests__/setup.ts',
    },
  }
})
