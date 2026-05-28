import { defineConfig } from "vite";
import coffee from "vite-plugin-coffee";
import react from "@vitejs/plugin-react";
import singleSpaPlugin from "vite-plugin-single-spa";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";

export default defineConfig({
  plugins: [
    coffee({ jsx: true }),
    react(),
    singleSpaPlugin({ type: "mife" }),
    cssInjectedByJsPlugin(),
  ],
  server: {
    port: 9005,
  },
});
