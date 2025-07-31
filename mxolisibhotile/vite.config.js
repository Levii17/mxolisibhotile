// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  root: '.', // use project root
  base: './', // ensure relative paths (important for GitHub Pages/Vercel)
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: 'index.html',
        terms: 'terms-of-use.html',
        privacy: 'privacy-policy.html'
      }
    }
  },
  server: {
    open: true, // opens browser on dev server start
  }
});
