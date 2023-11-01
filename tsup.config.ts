import fs from 'fs-extra'
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
    !options.watch && (opt.drop = ['console', 'debugger'])
  },
  platform: 'browser',
  bundle: true,
  splitting: true,
  treeshake: true,
  async onSuccess() {
    // css 向下兼容
    fs.copyFileSync('./dist/index.css', './dist/style.css')
    fs.writeFileSync(
      './dist/style.d.ts',
      '// `style.css` has been deprecated. Please import `@minko-fe/use-antd-resizable-header/index.css` instead of `style.css`',
    )
  },
}))
