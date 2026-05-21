import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import vitePluginSingleSpa from 'vite-plugin-single-spa';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // Tailwind v4: handled as a Vite plugin, not PostCSS
    vitePluginSingleSpa({
      type: 'mife',
      serverPort: 9001,
      spaEntryPoints: 'src/spa.tsx',
    }),
    cssInjectedByJsPlugin(),
  ],
  server: {
    port: 9001,
    cors: true,
  },
});
