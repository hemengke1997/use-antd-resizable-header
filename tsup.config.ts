import { defineConfig } from 'tsup'
import fs from 'fs-extra'

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
  splitting: false,
  treeshake: true,
  async onSuccess() {
    // css 向下兼容
    fs.copyFileSync('./dist/index.css', './dist/style.css')
    fs.writeFileSync(
      './dist/style.d.ts',
      '// `style.css` has been deprecated. Please import `@minko-fe/use-antd-resizable-header/index.css` instead of `style.css`',
    )
  },
})
