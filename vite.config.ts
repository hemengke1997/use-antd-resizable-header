import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import typescript from '@rollup/plugin-typescript';
import path from 'path';

const env = process.env.NODE_ENV;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    'process.env.NODE_ENV': JSON.stringify(env || 'development'),
  },
  esbuild: {
    pure: ['console.log', 'debugger'],
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

    cssCodeSplit: false,
    // watch: {},
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'react',
          'react-dom': 'react-dom',
        },
        exports: 'named',
      },
      plugins: [
        typescript({
          tsconfig: path.resolve(__dirname, 'tsconfig.json'),
          include: ['src/index.ts', 'src/utils/useGetDataIndexColumns.ts', 'src/useAntdResizableHeader.tsx'],
        }),
      ],
    },
  },
});
