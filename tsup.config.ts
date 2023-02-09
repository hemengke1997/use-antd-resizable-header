import { defineConfig } from 'tsup'

export const tsup = defineConfig((option) => ({
  entry: ['src/index.ts', './src/index.css'],
  dts: true,
  clean: false,
  format: ['esm'],
  minify: false,
  platform: 'browser',
  sourcemap: !!option.watch,
}))
