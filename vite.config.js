import { defineConfig } from 'vite';

export default defineConfig({
  // GitHub Pages などサブディレクトリ公開でもパスが壊れないよう相対パスで出力
  base: './',
  css: {
    devSourcemap: true,
  },
  build: {
    outDir: 'dist',
    assetsInlineLimit: 0,
  },
});
