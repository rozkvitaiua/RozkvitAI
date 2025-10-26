// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],

  // ВАЖЛИВО для GitHub Pages: назва репозиторію у форматі /RepoName/
  // Якщо репозиторій перейменуєш — онови цей рядок.
  base: '/RozkvitAI/',

  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
  },

  build: {
    target: 'esnext',
    outDir: 'dist', // Actions заливає саме dist
    sourcemap: false,
  },

  server: {
    port: 3000,
    open: true,
  },
})
