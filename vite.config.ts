import { ConfigEnv } from 'vite'
import react from '@vitejs/plugin-react'
import typescript from '@rollup/plugin-typescript'
import path from 'path'
import { UserConfig } from 'vitest/config'

const env = process.env.NODE_ENV

export default ({ mode }: ConfigEnv): UserConfig => {
  const isDev = mode === 'development'

  return {
    plugins: [react()],
    define: {
      'process.env.NODE_ENV': JSON.stringify(env || 'development'),
    },
    build: {
      outDir: 'dist',
      lib: {
        entry: path.resolve(__dirname, 'src/index.ts'),
        name: 'use-antd-resizable-header',
        fileName: (format) => `index.${format}.js`,
        formats: ['es', 'umd'],
      },
      minify: 'esbuild',
      emptyOutDir: false,
      target: 'es2015',
      cssCodeSplit: false,
      reportCompressedSize: false,
      sourcemap: isDev,
      rollupOptions: {
        external: ['react', 'react-dom'],
        output: {
          globals: {
            'react': 'react',
            'react-dom': 'react-dom',
          },
          exports: 'named',
        },
        plugins: [
          typescript({
            tsconfig: path.resolve(__dirname, './tsconfig.json'),
            sourceMap: isDev,
            include: ['src/index.ts', 'src/utils/useGetDataIndexColumns.ts', 'src/useAntdResizableHeader.tsx'],
          }),
        ],
      },
    },
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './tests/setup.ts',
      // css: true,
    },
  }
}
