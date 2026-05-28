# Angular CloudOps Dashboard — Deep-Dive Explanation

## 1. What This App Is

A **CloudOps Dashboard** — an internal tool for monitoring servers, deployments, alerts, and logs. It is built as an Angular 17 **micro-frontend** that runs independently at `http://localhost:9003` but can also be loaded by the Single-SPA host shell alongside other framework apps (React, Vue, Svelte).

---

## 2. Technology Stack

| Layer | Technology |
|---|---|
| Framework | Angular 17 (standalone components — no NgModules) |
| Build Tool | Vite 6 + `@analogjs/vite-plugin-angular` |
| Micro-frontend | `single-spa-angular` + `vite-plugin-single-spa` |
| State Management | NgRx 17 (Store, Effects, Entity Adapter, Store DevTools) |
| Reactivity | Angular Signals (`signal`, `computed`, `toSignal`) |
| Auth | Firebase Auth (email/password) |
| Charts | Chart.js 4.5 |
| Styling | Tailwind CSS 3 + scoped CSS custom properties (`--cdo-*`) |
| Language | TypeScript 5.2 |

---

## 3. Project Structure

```
src/
├── main.ts                        ← Entry: standalone mode (npm run dev)
├── spa.ts                         ← Entry: micro-frontend mode (used by host shell)
├── styles.css                     ← Global: Tailwind + --cdo-* CSS tokens
│
├── environments/
│   └── firebase.config.ts         ← Firebase credentials
│
└── app/
    ├── app.component.ts           ← Root component (renders <router-outlet>)
    ├── app.routes.ts              ← All route definitions (lazy-loaded)
    ├── store/
    │   └── app.state.ts           ← Root AppState interface
    │
    ├── core/                      ← Infrastructure (auth, layout, services)
    │   ├── auth/
    │   │   ├── pages/login/       ← Login form page
    │   │   ├── services/          ← Firebase SDK wrapper (AuthService)
    │   │   ├── guards/            ← authGuard (CanActivateFn)
    │   │   └── store/             ← auth actions/reducer/effects/selectors
    │   ├── layout/
    │   │   ├── shell/             ← Layout wrapper (sidebar + topnav + <router-outlet>)
    │   │   ├── sidebar/           ← Left nav with user info
    │   │   └── topnav/            ← Top bar (search, notifications, user menu)
    │   └── services/
    │       ├── mock-data.service.ts ← All hardcoded data (servers, alerts, logs...)
    │       └── theme.service.ts     ← Applies dark/light CSS tokens to :root
    │
    ├── features/                  ← Business features (each has pages + store)
    │   ├── dashboard/
    │   ├── servers/
    │   ├── deployments/
    │   ├── alerts/
    │   ├── logs/
    │   ├── analytics/
    │   └── settings/
    │
    └── shared/                    ← Reusable UI components and models
        ├── components/
        │   ├── icon/              ← cdo-icon (SVG switcher, 19 icons)
        │   ├── kpi-card/          ← cdo-kpi-card (metric card with trend)
        │   └── status-badge/      ← cdo-status-badge (colored status pill)
        └── models/
            └── index.ts           ← All shared interfaces and type unions
```

Every component follows the **3-file rule**: `.ts` + `.html` + `.css`. No inline templates or styles.

---

## 4. Two Entry Points: Standalone vs Micro-Frontend

The app has two bootstrap entry points. This is the key to how it works in both modes.

### `src/main.ts` — Standalone Mode
Used when you run `npm run dev` directly. Boots the app as a normal SPA in the browser.

```
Browser → index.html → main.ts → bootstrapApplication(AppComponent, { providers: [...] })
```

### `src/spa.ts` — Micro-Frontend Mode
Used when the Single-SPA host shell loads this app. Instead of calling `bootstrapApplication()` immediately, it wraps it in `singleSpaAngular()` and exports **lifecycle hooks**.

```
Host shell → imports spa.ts → calls bootstrap() → mounts app into #single-spa-application
                           → calls mount()
                           → calls unmount() when navigating away
```

Key difference in `spa.ts`:
```typescript
{ provide: APP_BASE_HREF, useValue: '/angular-app' }
```
This tells Angular's router that all routes live under `/angular-app`, so `/angular-app/dashboard` is treated internally as just `/dashboard`.

---

## 5. Application Startup Flow

```
1. AppComponent constructor dispatches initAuth()
        ↓
2. AuthEffects.initAuth$ subscribes to Firebase onAuthStateChanged
        ↓
3. Firebase fires immediately with current user (or null)
        ↓
4. Effect dispatches setUser({ user }) → reducer sets initialized: true
        ↓
5. authGuard unblocks (it was waiting for initialized === true)
        ↓
6. If user present  → navigate to /dashboard → ShellComponent loads
   If user absent   → redirect to /login
        ↓
7. ShellComponent constructor calls ThemeService.init()
        ↓
8. ThemeService reads selectTheme from store → applies --cdo-* CSS tokens to :root
        ↓
9. User sees the dashboard
```

---

## 6. Routing

Defined in `app.routes.ts`. All routes except `/login` are **children of ShellComponent** and protected by `authGuard`.

```
/                   → redirects to /dashboard
/login              → LoginComponent (not guarded)
/dashboard          → DashboardOverviewComponent
/servers            → ServerListComponent
/servers/:id        → ServerDetailComponent
/deployments        → DeploymentListComponent
/deployments/:id    → DeploymentDetailComponent
/alerts             → AlertListComponent
/alerts/:id         → AlertDetailComponent
/logs               → LogsViewComponent
/analytics          → AnalyticsOverviewComponent
/settings           → SettingsPageComponent
```

Every feature route uses `loadComponent()` for **lazy loading** — the code for each page is only downloaded when the user navigates to it.

```typescript
{
  path: 'servers',
  loadComponent: () => import('./features/servers/pages/server-list/server-list.component')
    .then(m => m.ServerListComponent),
}
```

---

## 7. Shell Layout

`ShellComponent` is the persistent wrapper that contains the sidebar, topnav, and the `<router-outlet>` where feature pages are inserted.

```
┌────────────────────────────────────────────────┐
│  TopNavComponent                               │  ← topnav (52px height)
├──────────────┬─────────────────────────────────┤
│              │                                 │
│  Sidebar     │   <router-outlet>               │
│  Component   │   (feature page loads here)     │
│  (200px)     │                                 │
│              │                                 │
└──────────────┴─────────────────────────────────┘
```

`ShellComponent` holds a `mobileOpen` signal. When the hamburger button in `TopNavComponent` is clicked, it emits `(menuClick)` which calls `toggleMobile()` on the shell, which passes `[isOpen]` to the sidebar. On mobile, the sidebar becomes a drawer overlay.

---

## 8. State Management (NgRx)

This is the most important part to understand. All shared state lives in the NgRx store. No component passes data to sibling components directly.

### Global State Shape

```typescript
AppState = {
  auth:        AuthState,        // current user, loading, error, initialized
  servers:     ServerState,      // EntityState<Server> + loading/error
  deployments: DeploymentState,  // EntityState<Deployment> + loading/error
  alerts:      AlertState,       // EntityState<Alert> + loading/error
  logs:        LogState,         // EntityState<LogEntry> + loading/error
  settings:    SettingsState,    // theme, notifications, thresholds
}
```

### NgRx Flow (for every feature)

```
Component dispatches Action
        ↓
Effect intercepts Action
        ↓
Effect calls MockDataService (or AuthService for auth)
        ↓
Effect dispatches Success or Failure Action
        ↓
Reducer updates state
        ↓
Selectors recompute derived values
        ↓
Components re-render via toSignal() / async pipe
```

### Example: Loading Servers

```typescript
// 1. Component dispatches on init
ngOnInit() { this.store.dispatch(loadServers()); }

// 2. Effect catches loadServers, calls service, dispatches result
loadServers$ = createEffect(() =>
  this.actions$.pipe(
    ofType(loadServers),
    switchMap(() => of(this.svc.getServers()).pipe(
      map(servers => loadServersSuccess({ servers })),
      catchError(e => of(loadServersFailure({ error: String(e) })))
    ))
  )
);

// 3. Reducer updates entity state
on(loadServersSuccess, (state, { servers }) =>
  serverAdapter.setAll(servers, { ...state, loading: false })
)

// 4. Component reads via signal
servers = toSignal(this.store.select(selectAllServers), { initialValue: [] });
```

### Entity Adapter

Features that manage lists (servers, deployments, alerts, logs) use `NgRx Entity`. The adapter normalizes data into a lookup map + ordered IDs:

```typescript
// What EntityState looks like internally:
{
  ids: ['srv-001', 'srv-002', ...],
  entities: {
    'srv-001': { id: 'srv-001', name: 'prod-us-east-1', ... },
    'srv-002': { id: 'srv-002', name: 'prod-us-east-2', ... },
  },
  loading: false,
  error: null
}
```

The `selectAll` selector extracts the array in the correct order. `selectById(id)` does an O(1) lookup.

### Settings Store (Special Case)

Settings also **persist to `localStorage`**. A side-effect-only NgRx Effect watches for any settings action and writes the entire state to `localStorage`:

```typescript
persistSettings$ = createEffect(() =>
  this.actions$.pipe(
    ofType(setTheme, updateNotifications, updateThresholds, resetSettings),
    withLatestFrom(this.store.select(selectSettingsState)),
    tap(([, state]) => localStorage.setItem('cdo-settings', JSON.stringify(state)))
  ),
  { dispatch: false }  // ← does not dispatch a follow-up action
);
```

On app init, the reducer reads from `localStorage` to pre-populate state (so settings survive page refresh).

---

## 9. Signals and Reactivity

Angular 17 introduces Signals — a fine-grained reactivity system that replaces some uses of RxJS in templates.

### `signal()` — Local mutable state
```typescript
query = signal('');                    // user's search input
env = signal<Environment | 'all'>('all');  // filter dropdown
```

### `toSignal()` — Convert NgRx observable to signal
```typescript
servers = toSignal(
  this.store.select(selectAllServers),
  { initialValue: [] }
);
```
This subscribes to the store selector and exposes the current value synchronously in the template.

### `computed()` — Derived state (re-runs automatically when dependencies change)
```typescript
filtered = computed(() => {
  const q = this.query().toLowerCase();
  const e = this.env();
  return this.servers().filter(srv =>
    (!q || srv.name.toLowerCase().includes(q)) &&
    (e === 'all' || srv.environment === e)
  );
});
```
`filtered` re-runs only when `query`, `env`, or `servers` changes — Angular knows this automatically.

### In Templates
Signals are called as functions with `()`:
```html
@for (s of filtered(); track s.id) {
  <tr>{{ s.name }}</tr>
}
```

---

## 10. Authentication Flow

```
LoginComponent (form)
    ↓ submit() dispatches login({ email, password })
    ↓
AuthEffects.login$ → AuthService.login() → Firebase signInWithEmailAndPassword()
    ↓ success
dispatch loginSuccess({ user }) → reducer sets user in state
    ↓
AuthEffects.loginSuccess$ → Router.navigate(['/dashboard'])
    ↓
authGuard on /dashboard → state.initialized && state.user → allows through
    ↓
ShellComponent loads
```

```
TopNavComponent (logout button)
    ↓ doLogout() dispatches logout()
    ↓
AuthEffects.logout$ → AuthService.logout() → Firebase signOut()
    ↓
dispatch logoutSuccess() → reducer clears user
    ↓
AuthEffects.logoutSuccess$ → Router.navigate(['/login'])
```

### Auth Guard Detail

The guard **waits** for initialization before deciding:

```typescript
export const authGuard: CanActivateFn = () => {
  const store  = inject(Store);
  const router = inject(Router);

  return store.select(selectAuthState).pipe(
    filter(state => state.initialized),   // wait for Firebase to respond
    take(1),                              // unsubscribe after first value
    map(state => state.user
      ? true
      : router.createUrlTree(['/login'])  // redirect if not logged in
    )
  );
};
```

Without `filter(state => state.initialized)`, the guard would decide on the initial `null` user state before Firebase has even responded.

---

## 11. Component Interaction Patterns

### Parent → Child: `@Input()`
```typescript
// Shell passes mobileOpen to sidebar
<app-sidebar [isOpen]="mobileOpen()" (closeSidebar)="mobileOpen.set(false)" />
```

### Child → Parent: `@Output()` + `EventEmitter`
```typescript
// Sidebar emits when backdrop is clicked
@Output() closeSidebar = new EventEmitter<void>();
```

### Any component → Store: `store.dispatch()`
```typescript
// TopNav dispatches logout, no need to talk to parent
this.store.dispatch(logout());
```

### Store → Any component: selectors + `toSignal()`
```typescript
// Sidebar reads user info from auth store
private user = toSignal(inject(Store).select(selectUser));
displayName = computed(() => this.user()?.displayName ?? 'User');
```

### Cross-page navigation: `RouterLink`
```html
<!-- Use absolute paths; APP_BASE_HREF handles the prefix -->
<a [routerLink]="['/alerts', a.id]">View alert</a>
```

---

## 12. Shared Components

These are **dumb components** (no store access) that receive data via `@Input()`.

### `cdo-icon`
Renders one of 19 hardcoded SVGs based on the `name` input.
```html
<cdo-icon name="server" [size]="20" />
```

### `cdo-kpi-card`
Displays a metric card with value, label, subtitle, and optional trend arrow.
```html
<cdo-kpi-card [kpi]="{ label: 'Total Servers', value: '12', subtitle: '...' }" />
```

### `cdo-status-badge`
Renders a colored pill for any domain status string.
```html
<cdo-status-badge status="healthy" />   <!-- green "Healthy" pill -->
<cdo-status-badge status="critical" />  <!-- red "Critical" pill -->
```

All valid statuses: `healthy | warning | critical | offline | success | failed | in-progress | pending | rolled-back | high | medium | low | info | active | acknowledged | resolved`

---

## 13. Shared Models

All domain types live in `src/app/shared/models/index.ts`.

| Interface | Key Fields |
|---|---|
| `Server` | id, name, environment, status, cpu, memory, uptime, region |
| `Deployment` | id, service, version, environment, status, deployedBy, startTime |
| `Alert` | id, title, severity, status, source, timestamp |
| `LogEntry` | id, timestamp, level (ERROR/WARN/INFO/DEBUG), service, message |
| `KpiCard` | label, value, subtitle, trend (±number), iconColor |
| `NavItem` | label, path, icon, badge? |

---

## 14. MockDataService

Since there is no real backend, `MockDataService` provides hardcoded arrays for all features. It is `@Injectable({ providedIn: 'root' })` and used exclusively by NgRx Effects.

```
Effect calls svc.getServers()
→ returns Server[]
→ effect wraps it: of(svc.getServers())
→ maps to loadServersSuccess({ servers })
```

The `of()` wrapper makes the synchronous call look asynchronous (returns `Observable<T>`), which is the correct pattern for Effects even when the data source is not async.

---

## 15. ThemeService

Manages dark/light theme by writing CSS custom properties to `:root`:

```typescript
init(): void {
  this.store.select(selectTheme).subscribe(theme => {
    const tokens = theme === 'light' ? LIGHT_TOKENS : DARK_TOKENS;
    for (const [prop, value] of Object.entries(tokens)) {
      document.documentElement.style.setProperty(prop, value);
    }
  });
}
```

Called once from `ShellComponent` constructor. Whenever the user changes theme in Settings, `selectTheme` emits → `ThemeService` writes new values → all CSS `var(--cdo-*)` references update instantly.

---

## 16. Styling Architecture

### Global tokens (`styles.css`)
```css
:root {
  --cdo-bg-primary:   #0d1117;
  --cdo-bg-secondary: #161b22;
  --cdo-text:         #e6edf3;
  --cdo-accent:       #58a6ff;
  --cdo-success:      #3fb950;
  --cdo-danger:       #f85149;
  /* ... */
}
```

All tokens are prefixed `--cdo-` to avoid collision with the host app or other micro-frontends.

### Component CSS
Each component's `.css` file uses `var(--cdo-*)` tokens and class names prefixed `cdo-` or feature-specific short prefixes.

### Tailwind
Utility classes (`flex`, `gap-4`, `text-sm`, etc.) are used alongside the custom properties. Tailwind does not use `--cdo-*` variables — they are applied manually.

### CSS isolation in micro-frontend mode
`vite-plugin-css-injected-by-js@3` injects all CSS directly into the JS bundle. When the host shell imports this app's JS module, the styles come with it — no separate `.css` file that would fail to load cross-origin.

---

## 17. Analytics Feature (Chart.js)

`AnalyticsOverviewComponent` uses Chart.js for data visualization.

```typescript
@ViewChild('cpuMemCanvas') private cpuMemRef!: ElementRef<HTMLCanvasElement>;

ngAfterViewInit(): void {
  // Register only the chart types we use (tree-shaking)
  ChartJS.register(CategoryScale, LinearScale, LineElement, ...);

  this.cpuMemChart = new ChartJS(this.cpuMemRef.nativeElement, {
    type: 'line',
    data: { labels: [...], datasets: [...] },
    options: { ... }
  });
}

ngOnDestroy(): void {
  this.cpuMemChart?.destroy();  // prevent memory leak
}
```

Charts use `@ViewChild` to get a reference to the `<canvas>` element. They are initialized in `ngAfterViewInit()` (after the DOM is ready) and destroyed in `ngOnDestroy()`.

---

## 18. Settings Feature

`SettingsPageComponent` allows the user to configure:
- **Theme**: dark / light
- **Notifications**: email on/off, in-app on/off, minimum severity
- **Thresholds**: CPU %, memory %, disk %, response time (ms)

All changes dispatch NgRx actions → reducer updates state → `SettingsEffects.persistSettings$` writes to `localStorage` → `ThemeService` reacts to theme changes immediately.

---

## 19. Data Flow Summary

```
User interacts with UI
        │
        ▼
Component dispatches Action (via this.store.dispatch)
        │
        ▼
NgRx Effect intercepts the Action
        │
        ├─── calls MockDataService / AuthService / localStorage
        │
        ▼
Effect dispatches Success or Failure Action
        │
        ▼
Reducer produces new immutable state
        │
        ▼
Selectors compute derived values
        │
        ▼
toSignal() / async pipe pushes new value to component
        │
        ▼
computed() re-runs if dependencies changed
        │
        ▼
Angular template re-renders changed nodes only
```

---

## 20. Key Development Rules

1. **3-file rule**: every `@Component` must use `templateUrl:` and `styleUrl:`. Never inline `template:` or `styles:`.
2. **CSS prefix**: all class names and custom properties use `--cdo-` / `cdo-` to prevent host app conflicts.
3. **No NgModules**: all components are standalone — use `imports: [...]` in `@Component` to declare dependencies.
4. **`inject()` over constructor params**: prefer `private store = inject(Store)` over constructor injection.
5. **Angular 17 control flow**: use `@if`, `@for`, `@switch` — not `*ngIf`, `*ngFor`.
6. **RouterLink with absolute paths**: always `/alerts`, `/servers/:id` — Angular prepends `APP_BASE_HREF` automatically.
7. **`loadComponent` for feature routes**: keeps initial bundle small.
8. **Entity adapter for lists**: normalized state, O(1) lookups by ID.
9. **Signals for local UI state**: `signal()` for filters, toggles; `computed()` for derived data.
10. **Effects are the only place that call services**: components never call `MockDataService` or `AuthService` directly.
