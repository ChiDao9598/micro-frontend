import React from 'react';
import ReactDOM from 'react-dom/client';
import { registerApplication, start } from 'single-spa';

import App from './App.jsx';
import './index.css';

// ─────────────────────────────────────────────
// 1. Boot the React shell (navbar, layout, etc.)
// ─────────────────────────────────────────────
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// ─────────────────────────────────────────────
// 2. Register each micro frontend
//    URLs come from .env.development or .env.production
// ─────────────────────────────────────────────

registerApplication({
  name: '@portfolio/virtual-office-3d',
  // app: () => import(/* @vite-ignore */ `${import.meta.env.VITE_REACT_APP_URL}/spa.js`),
  app: () => import(/* @vite-ignore */ `${import.meta.env.VITE_REACT_APP_URL}${import.meta.env.DEV ? '/src/spa.tsx' : '/spa.js'}`),
  activeWhen: ['/virtual-office-3d'],
});

registerApplication({
  name: '@portfolio/vue-app',
  app: () => import(/* @vite-ignore */ `${import.meta.env.VITE_VUE_APP_URL}${import.meta.env.DEV ? '/src/spa.js' : '/spa.js'}`),
  activeWhen: ['/vue-app'],
});

registerApplication({
  name: '@portfolio/angular-app',
  app: () => import(/* @vite-ignore */ `${import.meta.env.VITE_ANGULAR_APP_URL}${import.meta.env.DEV ? '/src/spa.ts' : '/spa.js'}`),
  activeWhen: ['/angular-app'],
});

registerApplication({
  name: '@portfolio/svelte-app',
  app: () => import(/* @vite-ignore */ `${import.meta.env.VITE_SVELTE_APP_URL}${import.meta.env.DEV ? '/src/spa.js' : '/spa.js'}`),
  activeWhen: ['/svelte-app'],
});

// ─────────────────────────────────────────────
// 3. Start Single-SPA
// ─────────────────────────────────────────────
start({
  urlRerouteOnly: true,
});
