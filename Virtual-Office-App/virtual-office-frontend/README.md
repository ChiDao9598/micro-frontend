# React App – Micro Frontend Remote

A React 18 app that works both as a **standalone app** and as a **micro frontend** loaded by the host shell.

## Stack
- **React 18** — UI framework
- **Vite** — build tool
- **single-spa-react** — exports lifecycle functions for the host
- **vite-plugin-single-spa** — configures Vite as a Single-SPA micro frontend

## Key Files

| File | Purpose |
|---|---|
| `src/main.jsx` | Standalone entry (used when running this app directly) |
| `src/spa.jsx` | Single-SPA entry (used when loaded by host app) |
| `src/App.jsx` | Your actual app — build here |

## Running

```bash
npm install
npm run dev   # runs on http://localhost:9001
```

### Standalone mode
Visit `http://localhost:9001` directly — the app runs on its own.

### Inside the host
Start the host app on port 9000, then visit `http://localhost:9000/virtual-office-3d`.
The host will load this app from `http://localhost:9001`.

## How it connects to the Host

In the host app's `src/main.jsx`, this app is already registered:

```js
registerApplication({
  name: '@portfolio/virtual-office-3d',
  app: () => import('http://localhost:9001/src/spa.jsx'),
  activeWhen: ['/virtual-office-3d'],
});
```

When you deploy, replace `http://localhost:9001` with your production URL.
