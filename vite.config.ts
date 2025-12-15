/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import ui from '@nuxt/ui/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    ui({
      colorMode: false,
      ui: {
        colors: { primary: 'brand-primary', secondary: 'brand-secondary' },
        main: { base: 'bg-neutral-50' }
      }
    })
  ],
  test: {
    environment: 'happy-dom',
    setupFiles: 'test/vitest/setup.ts',
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}']
  }
})
