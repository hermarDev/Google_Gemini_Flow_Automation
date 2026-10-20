import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import fs from 'fs';

function chromeExtensionPlugin() {
  return {
    name: 'chrome-extension-manifest-copy',
    closeBundle() {
      const manifestPath = resolve(__dirname, 'manifest.json');
      const distManifestPath = resolve(__dirname, 'dist/manifest.json');
      if (fs.existsSync(manifestPath)) {
        const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
        // Ensure manifest in dist references built JS files
        if (manifest.background?.service_worker) {
          manifest.background.service_worker = 'src/background/index.js';
        }
        if (Array.isArray(manifest.content_scripts)) {
          manifest.content_scripts.forEach((cs: { js: string[] }) => {
            cs.js = cs.js.map((f: string) => f.replace(/\.ts$/, '.js'));
          });
        }
        fs.mkdirSync(resolve(__dirname, 'dist'), { recursive: true });
        fs.writeFileSync(distManifestPath, JSON.stringify(manifest, null, 2));
      }
    },
  };
}

export default defineConfig({
  plugins: [react(), chromeExtensionPlugin()],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: false,
    rollupOptions: {
      input: {
        sidepanel: resolve(__dirname, 'src/sidepanel/index.html'),
        workspace: resolve(__dirname, 'src/workspace/index.html'),
        background: resolve(__dirname, 'src/background/index.ts'),
        content_flow: resolve(__dirname, 'src/content/flow.ts'),
        content_gemini: resolve(__dirname, 'src/content/gemini.ts'),
      },
      output: {
        entryFileNames: (chunkInfo) => {
          if (chunkInfo.name === 'background') {
            return 'src/background/index.js';
          }
          if (chunkInfo.name === 'content_flow') {
            return 'src/content/flow.js';
          }
          if (chunkInfo.name === 'content_gemini') {
            return 'src/content/gemini.js';
          }
          return 'assets/[name]-[hash].js';
        },
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
      },
    },
  },
});
