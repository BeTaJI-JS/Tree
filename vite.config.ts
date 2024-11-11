import { resolve } from 'path';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      assets: resolve(__dirname, './src/assets/'),
      components: resolve(__dirname, './src/components/'),
      // consts: resolve(__dirname, './src/consts/'),
      // contexts: resolve(__dirname, './src/contexts/'),
      // fragments: resolve(__dirname, './src/fragments/'),
      helpers: resolve(__dirname, './src/helpers/'),
      hooks: resolve(__dirname, './src/hooks/'),
      layouts: resolve(__dirname, './src/layouts/'),
      pages: resolve(__dirname, './src/pages/'),
      router: resolve(__dirname, './src/routers/'),
      store: resolve(__dirname, './src/store/'),
      styles: resolve(__dirname, './src/styles/'),
      // '~fonts': resolve(__dirname, './src/assets/fonts'),
      // '~styles': resolve(__dirname, './src/styles/'),
    },
    extensions: ['.scss', '.js', '.jsx', '.ts', '.tsx'],
  },
});