import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import path from 'path';

export default defineConfig({
  plugins: [react(), svgr()],
  resolve: {
    alias: {
      // Set up any path aliases you need
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 9877, // Match the current port
    // Proxy API requests to backend
    proxy: {
      '/api': {
        target: 'http://localhost:9876',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  build: {
    outDir: 'build', // Keep same output directory as CRA
  },
  // Handle environment variables
  define: {
    'process.env': process.env,
  },
});