import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  base: '/EngTalk/',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icons/icon.svg', 'icons/icon-192.png', 'icons/icon-512.png'],
      manifest: {
        id: '/EngTalk/',
        name: 'EngTalk',
        short_name: 'EngTalk',
        lang: 'ko',
        start_url: '/EngTalk/',
        scope: '/EngTalk/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#047857',
        icons: [
          { src: 'icons/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
          { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
          { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,webmanifest}', 'data/*.json'],
        cleanupOutdatedCaches: true,
        skipWaiting: true,
        clientsClaim: true,
        runtimeCaching: [{
          urlPattern: /\/tts\/[0-9a-f]+\.mp3$/,
          handler: 'CacheFirst',
          options: { cacheName: 'engtalk-tts', rangeRequests: true, expiration: { maxEntries: 1200 } },
        }],
      },
    }),
  ],
});
