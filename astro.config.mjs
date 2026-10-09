// @ts-check
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

const astroPrerenderEntrypoint = fileURLToPath(
  new URL('./node_modules/astro/dist/entrypoints/prerender.js', import.meta.url),
);

// https://astro.build/config
export default defineConfig({
  build: {
    assetsPrefix: '.',
    format: 'file',
  },
  vite: {
    plugins: [tailwindcss()],
    build: {
      rollupOptions: {
        output: {
          assetFileNames: '_astro/[name][extname]',
        },
      },
    },
    resolve: {
      alias: {
        'astro/entrypoints/prerender': astroPrerenderEntrypoint,
      },
    },
  },
});
