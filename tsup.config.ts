import { defineConfig } from 'tsup'

const env = process.env.NODE_ENV

export default defineConfig({
  entry: ['./src/index.ts'],
  define: {
    'process.env.NODE_ENV': JSON.stringify(env || 'development'),
  },
  target: 'es6',
  external: ['react', 'react-dom'],
  format: ['esm', 'cjs'],
  dts: true,
  esbuildOptions(opt) {
    opt.drop = ['console', 'debugger']
  },
  platform: 'browser',
  bundle: true,
})
