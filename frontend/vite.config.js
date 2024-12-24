import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5175,
  },
  build: {
    outDir: 'frontend/dist',
    chunkSizeWarningLimit: 1000,
    base: './',  
    rollupOptions: {
      input: path.resolve(__dirname, 'index.html'),
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'axios', 'framer-motion', '@mui/material', '@chakra-ui/react'],
        },
      },
    },
  },
});
