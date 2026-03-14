import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(),],
  resolve: {
    // ensure only one React copy is used, avoid invalid hook call errors when
    // dependencies (like material-tailwind) bring their own.
    dedupe: ['react', 'react-dom'],
  },
  build: {
    outDir: 'docs'
  }
})
