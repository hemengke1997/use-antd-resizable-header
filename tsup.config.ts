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
  minify: !options.watch && 'terser',
  banner(ctx) {
    return {
      js: ctx.format === 'cjs' ? `require('./index.css');` : `import './index.css';`,
    }
  },
}))
