import path from 'path'
import type { ConfigEnv } from 'vite'
import react from '@vitejs/plugin-react'
import type { UserConfig } from 'vitest/config'
import dts from 'vite-plugin-dts'

const env = process.env.NODE_ENV

export default ({ mode }: ConfigEnv): UserConfig => {
  const isDev = mode === 'development'

  return {
    plugins: [react(), dts({ skipDiagnostics: true, insertTypesEntry: true })],
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
      },
    },
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './__tests__/setup.ts',
    },
  }
}
