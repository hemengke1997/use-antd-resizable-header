import fs from 'node:fs'
import { defineConfig, type Options } from 'tsup'
import { bundleless } from 'tsup-plugin-bundleless'

const env = process.env.NODE_ENV

const { esbuildPlugins, plugins } = bundleless()

const commonOptions = (options: Options): Options => ({
  define: {
    'process.env.NODE_ENV': JSON.stringify(env || 'development'),
  },
  target: 'es2015',
  external: ['react', 'react-dom'],
  dts: true,
  esbuildOptions(opt) {
    !options.watch && (opt.drop = ['debugger'])
  },
  splitting: false,
  treeshake: true,
  minify: false,
})

export default defineConfig((options) => [
  {
    ...commonOptions(options),
    entry: ['./src/**/*.{ts,tsx}'],
    format: ['esm'],
    platform: 'browser',
    esbuildPlugins,
    plugins,
  },
  {
    ...commonOptions(options),
    entry: ['./src/index.ts'],
    format: ['cjs'],
    platform: 'neutral',
    banner() {
      return {
        js: `require('./style.css');`,
      }
    },
    async onSuccess() {
      fs.renameSync('dist/index.css', 'dist/style.css')
    },
  },
])
