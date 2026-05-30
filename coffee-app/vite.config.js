import { defineConfig } from "vite";
import coffee from "vite-plugin-coffee";
import react from "@vitejs/plugin-react";
import singleSpaPlugin from "vite-plugin-single-spa";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";

export default defineConfig(({ command }) => {
  // In production, assets must use absolute URLs so the host-app shell can
  // load them cross-origin from the coffee-app Vercel deployment.
  // VERCEL_URL is automatically injected by Vercel during every build.
  // VITE_BASE_URL can be set in Vercel env vars to override (e.g. custom domain).
  let base;
  if (command === "build") {
    if (process.env.VITE_BASE_URL) {
      base = process.env.VITE_BASE_URL;
    } else if (process.env.VERCEL_URL) {
      base = `https://${process.env.VERCEL_URL}/`;
    }
  }

  return {
    base,
    plugins: [
      coffee({ jsx: true }),
      react(),
      // serverPort is required — without it the plugin builds
      // "http://localhost:undefined/..." for every asset URL in dev.
      singleSpaPlugin({ type: "mife", serverPort: 9005, spaEntryPoints: "src/spa.jsx" }),
      cssInjectedByJsPlugin(),
    ],
    server: {
      port: 9005,
    },
  };
});
