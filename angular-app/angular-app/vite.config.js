import { defineConfig } from 'vite';
import angular from '@analogjs/vite-plugin-angular';
import vitePluginSingleSpa from 'vite-plugin-single-spa';

export default defineConfig({
  plugins: [
    angular({
      tsconfig: './tsconfig.json',
    }),
    vitePluginSingleSpa({
      type: 'mife',
      serverPort: 9003,
      spaEntryPoints: 'src/spa.ts',
    }),
  ],
  server: {
    port: 9003,
    cors: true,
  },
});
