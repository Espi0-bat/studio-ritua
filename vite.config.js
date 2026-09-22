import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/studio-ritua/',
  plugins: [react()],
  assetsInclude: ['**/*.JPG', '**/*.HEIC'],
})
