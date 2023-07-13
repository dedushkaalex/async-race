import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import { resolve } from 'node:path';
import { fileURLToPath, URL } from "url";

export default defineConfig({
  plugins: [
    tsconfigPaths()
  ],
  css: {
    devSourcemap: true,
  },
  resolve: {
    alias: [
      { find: '@', replacement: fileURLToPath(new URL('./src', import.meta.url)) },
      { find: '@components', replacement: fileURLToPath(new URL('./src/components/', import.meta.url)) },
      { find: '@core', replacement: fileURLToPath(new URL('./src/core/', import.meta.url)) },
      { find: '@styles', replacement: fileURLToPath(new URL('./src/styles/', import.meta.url)) },
      { find: '@layout', replacement: fileURLToPath(new URL('./src/layout/', import.meta.url)) },
      { find: '@screens', replacement: fileURLToPath(new URL('./src/screens/', import.meta.url)) },
      // { find: '@assets', replacement: fileURLToPath(new URL('./src/shared/assets', import.meta.url)) },
      // { find: '@cmp', replacement: fileURLToPath(new URL('./src/shared/cmp', import.meta.url)) },
      // { find: '@stores', replacement: fileURLToPath(new URL('./src/shared/stores', import.meta.url)) },
      // { find: '@use', replacement: fileURLToPath(new URL('./src/shared/use', import.meta.url)) },
    ],
  },
})