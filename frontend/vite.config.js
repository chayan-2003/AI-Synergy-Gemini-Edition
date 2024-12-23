import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5175,
  },
  build: {
    outDir: 'dist',  // Build output directory
    chunkSizeWarningLimit: 1000, // Increase chunk size warning limit (e.g., 1000 kB or 1 MB)
    rollupOptions: {
      output: {
        // Manual chunking of large dependencies to reduce the size of the main bundle
        manualChunks: {
          vendor: ['react', 'react-dom', 'axios', 'framer-motion', '@mui/material', '@chakra-ui/react'],
          // Add any other large dependencies you want to separate here
        },
      },
    },
  },
});
