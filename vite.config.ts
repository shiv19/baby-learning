import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  base: '/baby-learning/',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: [
        'icons/icon-192.png',
        'icons/icon-512.png',
        'icons/icon-maskable-192.png',
        'icons/icon-maskable-512.png'
      ],
      manifest: {
        id: '/baby-learning/',
        name: 'Baby Learning',
        short_name: 'Baby Learn',
        description:
          'Learn letters, numbers, colors, shapes, feelings and more with big animated cards and friendly narration.',
        lang: 'en',
        dir: 'ltr',
        start_url: '/baby-learning/',
        scope: '/baby-learning/',
        display: 'fullscreen',
        orientation: 'portrait',
        theme_color: '#fdf3e3',
        background_color: '#fdf3e3',
        categories: ['education', 'kids', 'games'],
        icons: [
          { src: 'icons/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png' },
          { src: 'icons/icon-maskable-192.png', sizes: '192x192', type: 'image/png', purpose: 'maskable' },
          { src: 'icons/icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' }
        ]
      }
    })
  ]
})
