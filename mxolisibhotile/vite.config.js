// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  root: '.', // use project root
  base: './', // ensure relative paths (important for GitHub Pages/Vercel)
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
  server: {
    open: true, // opens browser on dev server start
  }
});
