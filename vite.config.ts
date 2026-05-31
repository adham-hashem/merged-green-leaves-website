import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';

// Programmatically remove static sitemap to ensure the dynamic backend endpoint is served
try {
  const staticSitemap = path.resolve(process.cwd(), 'public/sitemap.xml');
  if (fs.existsSync(staticSitemap)) {
    fs.unlinkSync(staticSitemap);
    console.log('[SEO Build] Programmatically removed static public/sitemap.xml to enable dynamic database sitemap routing.');
  }
} catch (err: any) {
  console.warn('[SEO Build Warning] Failed to clean up static sitemap:', err.message);
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
      '/upload': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      }
    }
  }
});
