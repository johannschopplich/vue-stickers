import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'

const currentDir = new URL('.', import.meta.url).pathname

export default defineConfig({
  resolve: {
    alias: {
      '~/': `${resolve(currentDir, 'src')}/`,
      'vue-stickers': resolve(currentDir, '../src/index.ts'),
    },
  },

  plugins: [
    Vue(),
    UnoCSS(),
  ],

  optimizeDeps: {
    exclude: [
      'vue-stickers',
    ],
  },
})
