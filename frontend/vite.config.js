import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    open: true,
    ...(mode === 'development' && {
      proxy: {
        '/api': {
          target: 'http://localhost:3002',
          changeOrigin: true,
          secure: false,
        }
      }
    })
  },
}))
