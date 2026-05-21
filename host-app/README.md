# Host App – Micro Frontend Shell

React + Vite + Single-SPA shell that orchestrates all micro frontends.

## Stack
- **React 18** — shell UI (navbar, layout, home page)
- **Vite** — build tool and dev server
- **Single-SPA** — micro frontend orchestration

## Project Structure

```
src/
├── main.jsx               # Boots React shell + registers all remotes with Single-SPA
├── App.jsx                # Root component (shell layout)
├── index.css              # Shell styles
├── components/
│   ├── Navbar.jsx         # Shared navigation bar
│   └── MountPoint.jsx     # Where the active micro frontend mounts
└── context/
    └── AuthContext.jsx    # Shared auth state (broadcast to remotes via CustomEvents)
```

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server on port 9000
npm run dev

# Build for production
npm run build
```

## Adding a New Micro Frontend

1. Open `src/main.jsx`
2. Add a new `registerApplication()` call:

```js
registerApplication({
  name: '@portfolio/my-new-app',
  app: () => import('http://localhost:9005/src/main.js'),
  activeWhen: ['/my-new-app'],
});
```

3. Add a link in `src/components/Navbar.jsx` (NAV_ITEMS array)
4. Add a card in `src/components/MountPoint.jsx` (framework-grid section)

## Port Convention

| App         | Port |
|-------------|------|
| Host Shell  | 9000 |
| React App   | 9001 |
| Vue App     | 9002 |
| Angular App | 9003 |
| Svelte App  | 9004 |

## Communication Between Shell and Remotes

The shell broadcasts auth state via `CustomEvent`:

```js
// Shell fires this when user logs in:
window.dispatchEvent(new CustomEvent('auth:login', { detail: user }));

// Any remote (React/Vue/Angular/Svelte) listens like this:
window.addEventListener('auth:login', (e) => {
  const user = e.detail;
});
```

## Deployment

Deploy this shell to **Vercel or Netlify**.
Each micro frontend is deployed separately on its own URL.
Update the import URLs in `main.jsx` from `localhost:PORT` to the production URLs after deploying.
