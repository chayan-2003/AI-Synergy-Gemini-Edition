import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5175,
  },
  build: {
    outDir: 'dist',

    base: './',  
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'axios', 'framer-motion', '@mui/material', '@chakra-ui/react'],
        },
      },
    },
  },
});
