import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  resolve: {
    alias: {
    }
  },
  optimizeDeps: {
  },
  ssr: {
  },
  plugins: [
  ],
  build: {
    outDir: 'dist', // Build output directory
    emptyOutDir: false,
    sourcemap: 'inline',
    chunkSizeWarningLimit: 2000,
    rollupOptions: {
      input: {
        ximalaya_cs: resolve(__dirname, './ext/content/ximalaya.js'),
      },
      output: {
        entryFileNames: 'assets/[name].js', // Adjust filenames for assets
        chunkFileNames: 'assets/[name].js',
        assetFileNames: 'assets/[name].[ext]',
      },
      external: []
    }
  }
})
