import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// Base path matches the GitHub Pages project-site URL: https://<user>.github.io/AnCore/
export default defineConfig({
  plugins: [react()],
  base: '/AnCore/',
})
