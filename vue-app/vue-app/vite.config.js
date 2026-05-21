import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vitePluginSingleSpa from 'vite-plugin-single-spa';

export default defineConfig({
  plugins: [
    vue(),
    vitePluginSingleSpa({
      type: 'mife',
      serverPort: 9002,
      spaEntryPoints: 'src/spa.js',
    }),
  ],
  server: {
    port: 9002,
    cors: true,
  },
});
