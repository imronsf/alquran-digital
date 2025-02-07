import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: 'https://github.com/imronsf/alquran-digital.git', // Replace with your repository name
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});