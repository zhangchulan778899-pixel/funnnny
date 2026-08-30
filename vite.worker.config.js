import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    emptyOutDir: false,
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
