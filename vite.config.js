import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { resolve } from 'path'

// https://vitejs.dev/config/
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
    react(), 
    {
      name: "vite-postbuild",
      closeBundle: async () => {
        const distDir = resolve(__dirname, "dist");
        const srcDir = resolve(__dirname, "dist", "src");
      },
    },
  ],
  build: {
    outDir: 'dist', // Build output directory
    emptyOutDir: false,
    sourcemap: 'inline',
    chunkSizeWarningLimit: 2000,
    rollupOptions: {
      input: {
        ximalaya: resolve(__dirname, './index.html'),
      },
      output: {
        entryFileNames: 'assets/[name].js', // Adjust filenames for assets
        chunkFileNames: 'assets/[name].js',
        assetFileNames: 'assets/[name].[ext]',
      },
      external: []
    }
  },
})
