import { defineConfig } from 'vite'

export default defineConfig({
  publicDir: false,
  build: {
    emptyOutDir: true,
    lib: {
      entry: 'src/worker.js',
      formats: ['es'],
      fileName: () => 'index.js',
    },
    outDir: 'dist/server',
    rollupOptions: {
      external: [],
    },
  },
})
