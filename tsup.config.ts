import fs from 'node:fs'
import { defineConfig } from 'tsup'

const env = process.env.NODE_ENV

export default defineConfig((options) => ({
  entry: ['./src/index.ts'],
  define: {
    'process.env.NODE_ENV': JSON.stringify(env || 'development'),
  },
  target: 'es2015',
  external: ['react', 'react-dom'],
  format: ['esm', 'cjs'],
  dts: true,
  esbuildOptions(opt) {
    !options.watch && (opt.drop = ['debugger'])
  },
  platform: 'browser',
  bundle: true,
  splitting: true,
  treeshake: true,
  minify: false,
  banner(ctx) {
    return {
      js: ctx.format === 'cjs' ? `require('./style.css');` : `import './style.css';`,
    }
  },
  async onSuccess() {
    fs.renameSync('dist/index.css', 'dist/style.css')
  },
}))
