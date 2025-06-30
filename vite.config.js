import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  base: "Project-FF",
  resolve: {
    alias: {
      'src': path.resolve(__dirname, 'src'),
      'components': path.resolve(__dirname, 'src/components'),
      'assets': path.resolve(__dirname, 'src/assets'),
      'contexts':path.resolve(__dirname, 'src/contexts'),
      'constants':path.resolve(__dirname, 'src/constants'),
      'games':path.resolve(__dirname, 'src/games'),
      'models': path.resolve(__dirname, 'src/models'),
    }
  },
  assetsInclude: ['**/*.glb']
})
