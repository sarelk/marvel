import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  build: {
    // Optimization for production builds
    rollupOptions: {
      output: {
        manualChunks: {
          // Split vendor packages for better caching
          'vue-vendor': ['vue', 'vue-router', 'pinia'],
          'ui-vendor': ['tailwindcss'],
          'utils': ['axios', 'crypto-js']
        }
      }
    },
    // Enable gzip compression
    minify: 'terser',
    terserOptions: {
      compress: {
        // Remove console.* in production
        drop_console: true,
        drop_debugger: true,
      }
    }
  },
})
