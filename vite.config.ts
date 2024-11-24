import { resolve } from 'path';

import react from '@vitejs/plugin-react';
import autoprefixer from 'autoprefixer';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
      },
    },
    postcss: {
      plugins: [autoprefixer],
    },
  },

  resolve: {
    alias: {
      components: resolve(__dirname, './src/components/'),
      contexts: resolve(__dirname, './src/contexts/'),
      fragments: resolve(__dirname, './src/fragments/'),
      hooks: resolve(__dirname, './src/hooks/'),
      layouts: resolve(__dirname, './src/layouts/'),
      routers: resolve(__dirname, './src/routers/'),
      styles: resolve(__dirname, './src/styles/'),
      data: resolve(__dirname, './src/data/'),
      types: resolve(__dirname, './src/types/'),
      utils: resolve(__dirname, './src/utils/'),
    },
    extensions: ['.scss', '.js', '.jsx', '.ts', '.tsx'],
  },
});
