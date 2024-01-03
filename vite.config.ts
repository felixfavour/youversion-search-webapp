import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: [''],
      manifest: {
        name: 'Youversion Search',
        short_name: 'YouversionSearch',
        description: 'Youversion Search enable you to elevate your Bible study experience. Discover a new level of engagement with the scriptures by filtering past notes and bookmarks on the app',
        theme_color: '#ffab2d',
        icons: [
          {
            src: 'youversion-search-192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'youversion-search-512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
