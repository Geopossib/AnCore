import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// Root-relative base — correct for Vercel (serves from the domain root).
// Only override this back to '/<repo-name>/' if you deploy to a GitHub Pages
// project site instead.
export default defineConfig({
  plugins: [react()],
  base: '/',
})
