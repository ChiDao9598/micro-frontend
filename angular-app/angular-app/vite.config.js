import { defineConfig } from 'vite';
import angular from '@analogjs/vite-plugin-angular';
import vitePluginSingleSpa from 'vite-plugin-single-spa';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';

export default defineConfig({
  plugins: [
    angular({ tsconfig: './tsconfig.json' }),
    vitePluginSingleSpa({
      type: 'mife',
      serverPort: 9003,
      spaEntryPoints: 'src/spa.ts',
    }),
    cssInjectedByJsPlugin(),
  ],
  server: {
    port: 9003,
    cors: true,
  },
});
