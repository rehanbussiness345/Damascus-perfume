
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/Damascus-perfume/',   // ← Your exact repo name
  plugins: [react()],
  build: {
    outDir: 'dist',             // ← Output folder for build
  },
})