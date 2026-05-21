import { createApp } from 'vue';
import App from './App.vue';
import './index.css';

// Standalone entry — only used when running this app directly (npm run dev).
// When loaded by the host via Single-SPA, spa.js is used instead.
createApp(App).mount('#app');
