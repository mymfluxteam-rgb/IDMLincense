/**
 * GitHub Pages build config
 * ─────────────────────────────────────────────────────────────
 * Usage:
 *   GITHUB_REPO_NAME=my-repo pnpm --filter @workspace/software-store run build:github
 *
 * If your repo is hosted at  https://<user>.github.io/<repo-name>/
 * set GITHUB_REPO_NAME to your repo name, e.g. "software-store".
 *
 * If it's at the apex  https://<user>.github.io/  (a User/Org pages site),
 * leave GITHUB_REPO_NAME empty or unset.
 *
 * Output is written to:  artifacts/software-store/dist-github/
 * Push the contents of that folder to your `gh-pages` branch.
 */

import path from 'path';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

const repoName = process.env.GITHUB_REPO_NAME ?? '';
const base = repoName ? `/${repoName}/` : '/';

export default defineConfig({
  base,

  // Tell the app to use hash routing so GitHub Pages serves every route
  define: {
    'import.meta.env.VITE_USE_HASH_ROUTER': JSON.stringify('true'),
  },

  plugins: [react(), tailwindcss()],

  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, 'src'),
      '@assets': path.resolve(import.meta.dirname, '..', '..', 'attached_assets'),
    },
    dedupe: ['react', 'react-dom'],
  },

  root: path.resolve(import.meta.dirname),

  build: {
    outDir: path.resolve(import.meta.dirname, 'dist-github'),
    emptyOutDir: true,
    // Slightly more aggressive minification for a static host
    minify: 'esbuild',
    sourcemap: false,
    rollupOptions: {
      output: {
        // Cache-bust asset filenames
        assetFileNames: 'assets/[name]-[hash][extname]',
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        // Separate vendor chunk keeps the main bundle small
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['wouter', 'lucide-react'],
        },
      },
    },
  },
});
