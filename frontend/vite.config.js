import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5175,
  },
  build: {
    outDir: 'build/',
    manifest: "asset-manifest.json",
    assetsDir: "static",
    base: './',
    rollupOptions: {
      input: "src/main.jsx",

      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'axios', 'framer-motion', '@mui/material', '@chakra-ui/react'],
        },
      },
      sourcemap: true,
    },
  },
});
