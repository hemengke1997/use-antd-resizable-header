import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import typescript2 from 'rollup-plugin-typescript2';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    reactRefresh(),
    {
      ...typescript2({
        check: false,
        tsconfig: path.resolve(__dirname, `tsconfig.json`),
        tsconfigOverride: {
          compilerOptions: {
            sourceMap: false,
            declaration: true,
            declarationMap: false,
          },
          include: ['src/**/*'],
        },
      }),
      enforce: 'pre',
      apply: 'build',
    },
  ],
  resolve: {
    alias: {
      '~': path.resolve(__dirname, 'node_modules'),
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
  build: {
    outDir: 'dist',
    minify: false,
    lib: {
      entry: path.resolve(__dirname, 'src/index.tsx'),
      name: 'antd-resizable-header',
      fileName: 'index',
      formats: ['es', 'umd'],
    },
    terserOptions: {
      compress: false,
    },
    cssCodeSplit: false,
    // watch: {},
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'react',
          'react-dom': 'react-dom',
        },
      },
    },
  },
});
