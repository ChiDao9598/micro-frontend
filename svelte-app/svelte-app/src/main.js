import App from './App.svelte';
import './index.css';

// Standalone entry — only used when running this app directly (npm run dev).
// When loaded by the host via Single-SPA, spa.js is used instead.
const app = new App({
  target: document.getElementById('app'),
});

export default app;
