import { defineConfig } from "vite";
import coffee from "vite-plugin-coffee";
import react from "@vitejs/plugin-react";
import singleSpaPlugin from "vite-plugin-single-spa";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";

export default defineConfig({
  plugins: [
    coffee({ jsx: true }),
    react(),
    // serverPort is required — without it the plugin builds
    // "http://localhost:undefined/..." for every asset URL.
    singleSpaPlugin({ type: "mife", serverPort: 9005, spaEntryPoints: "src/spa.jsx" }),
    cssInjectedByJsPlugin(),
  ],
  server: {
    port: 9005,
  },
});
