import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import vitePluginSingleSpa from 'vite-plugin-single-spa';

export default defineConfig({
  plugins: [
    svelte(),
    vitePluginSingleSpa({
      type: 'mife',
      serverPort: 9004,
      spaEntryPoints: 'src/spa.js',
    }),
  ],
  server: {
    port: 9004,
    cors: true,
  },
});
