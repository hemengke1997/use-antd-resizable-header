import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import typescript2 from 'rollup-plugin-typescript2';
import path from 'path';

const env = process.env.NODE_ENV;

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
            allowJs: false
          },
          include: ['src/**/*'],
        },
      }),
      enforce: 'pre',
      apply: 'build',
    },
  ],
  define: {
    'process.env.NODE_ENV': JSON.stringify(env || 'development')
  },
  build: {
    outDir: 'dist',
    minify: false,
    lib: {
      entry: path.resolve(__dirname, 'src/index.tsx'),
      name: 'use-antd-resizable-header',
      fileName: 'index',
      formats: ['es', 'umd'],
    },
    terserOptions: {
      compress: {
        keep_infinity: true,
        // Used to delete console in production environment
        drop_console: true,
      },
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
