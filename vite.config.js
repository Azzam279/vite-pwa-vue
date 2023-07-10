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
      injectRegister: 'auto',
      injectManifest: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}']
      },
      base: '/',
      srcDir: 'src',
      filename: 'sw.js',
      strategies: 'injectManifest',
      devOptions: {
        enabled: true,
        navigateFallback: 'index.html'
      },
      // includeAssets: ['img/icons/favicon-16x16.png', 'img/icons/apple-touch-icon.png'],
      manifest: {
        name: "PWA Vue3",
        short_name: "PWA-Vue3",
        theme_color: "#40B883",
        start_url: "/",
        display: "standalone",
        background_color: "#ffffff",
        description: "PWA Vue3 + Vite",
        icons: [
          {
            src: "img/icons/android-chrome-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "img/icons/android-chrome-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "img/icons/android-chrome-maskable-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "img/icons/android-chrome-maskable-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
