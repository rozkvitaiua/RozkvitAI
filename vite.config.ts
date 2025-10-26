// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  base: '/RozkvitAI/',

  resolve: {
    alias: [
      // 1) Глобально знімаємо суфікс версії наприкінці імпорту:
      //    "@scope/pkg@1.2.3" → "@scope/pkg"
      { find: /(@?[^/]+(?:\/[^@/]+)?)@\d+\.\d+\.\d+$/i, replacement: '$1' },

      // 2) Зручний псевдонім на src
      { find: '@', replacement: resolve(__dirname, 'src') },
    ],
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
  },

  build: {
    target: 'esnext',
    outDir: 'dist',
    sourcemap: false,
  },

  server: {
    port: 3000,
    open: true,
  },
})
