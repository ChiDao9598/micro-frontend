# Virtual Office — 3D Metaverse Web App

A browser-based 3D virtual office where users join a shared space, move their avatars in real-time, and communicate. Built as a portfolio-quality project demonstrating modern web 3D, real-time multiplayer, and micro-frontend architecture.

---

## Features

- **3D Virtual Office** — Immersive dark-themed office environment with desks, meeting area, and dynamic lighting
- **Avatar System** — Capsule + sphere avatars with unique colors and floating name tags
- **WASD Movement** — Frame-rate independent movement with collision bounds
- **Third-Person Camera** — Smooth follow camera with spring-lerp
- **Real-time Multiplayer** — Live avatar positions synced via Socket.IO *(Phase 2)*
- **Chat System** — In-office text chat with player color coding
- **Micro-Frontend Ready** — Runs standalone or inside a Single-SPA shell

---

## Tech Stack

### Frontend — `Virtual-Office-Frontend/`
| Technology | Version | Purpose |
|---|---|---|
| React | 18 | UI framework |
| TypeScript | 5 | Type safety |
| Vite | 5 | Dev server + bundler |
| React Three Fiber | 8 | React renderer for Three.js |
| Drei | 9 | R3F helper components (Html, etc.) |
| Three.js | 0.184 | 3D engine |
| Zustand | 5 | Global state management |
| Tailwind CSS | 4 | Utility-first styling |
| Socket.IO Client | 4 | Real-time networking |
| single-spa-react | 6 | Micro-frontend lifecycle |

### Backend — `Virtual-Office-Backend/`
| Technology | Version | Purpose |
|---|---|---|
| Node.js | 22 | Runtime |
| TypeScript | 6 | Type safety |
| Express | 5 | HTTP server |
| Socket.IO | 4 | Real-time WebSocket server |
| ts-node-dev | 2 | Dev server with hot reload |

---

## Project Structure

```
Virtual-Office-App/
├── Virtual-Office-Frontend/     React app (port 9001)
│   └── src/
│       ├── game/                3D scene, player, camera, controls
│       ├── networking/          Socket.IO client + event handlers
│       ├── store/               Zustand stores + per-frame refs
│       ├── ui/                  HUD, Login, Chat, Player list
│       ├── types/               Shared TypeScript types
│       └── constants/           Game constants, socket URL
│
└── Virtual-Office-Backend/      Node.js server (port 3001)
    └── src/
        ├── rooms/               OfficeRoom — in-memory game state
        ├── handlers/            Player + chat Socket.IO handlers
        ├── types/               Player and event types
        └── index.ts             Server entry point
```

---

## Getting Started

### Prerequisites
- Node.js 18+
- npm 9+

### 1. Frontend Setup

```bash
cd Virtual-Office-Frontend
npm install
npm run dev
# Open http://localhost:9001
```

### 2. Backend Setup

```bash
cd Virtual-Office-Backend
npm install
npm run dev
# Server running at http://localhost:3001
# Health check: http://localhost:3001/health
```

### 3. Environment Variables

Create `Virtual-Office-Frontend/.env.development`:
```env
VITE_SOCKET_URL=http://localhost:3001
```

Create `Virtual-Office-Backend/.env`:
```env
PORT=3001
FRONTEND_URL=http://localhost:9001
```

### 4. Running inside the Micro-Frontend Shell *(optional)*

```bash
# In the host-app directory (../host-app from this folder)
cd ../../host-app
npm run dev
# Navigate to http://localhost:9000/react-app
```

---

## Architecture Overview

```
Browser
├── R3F Canvas (Three.js scene)         — 3D world, runs at 60fps
│   ├── World (floor, desks, walls)
│   ├── LocalPlayer (WASD controlled)
│   ├── RemotePlayers (socket-driven)
│   └── CameraRig (third-person follow)
│
├── HUD (DOM overlay)                   — React components above canvas
│   ├── PlayerList
│   └── ChatPanel
│
└── Socket.IO Client                    — connects to backend
    ├── emit: player:join, player:move, chat:message
    └── on:   game:state, player:joined, player:moved, player:left, chat:received

Node.js Server
├── OfficeRoom (in-memory state)        — Map<socketId, PlayerState>
├── playerHandlers                      — join, move, disconnect
└── chatHandlers                        — broadcast messages
```

### Key Design Decisions

**Per-frame positions stay in refs, not state.** Avatar position updates 60× per second. Storing them in React state or Zustand would cause 60 re-renders/sec, destroying performance. Module-level `THREE.Vector3` refs are mutated directly in `useFrame`.

**Client-side prediction.** Your own avatar moves instantly from keyboard input — no waiting for server round-trip. The server receives your position and broadcasts it to others.

**Interpolation on remote players.** When a remote player's position arrives from the server (every ~50ms), we don't teleport — we `lerp` toward the new position each frame. This hides network latency and produces smooth movement.

---

## Roadmap

### Phase 1 — Foundation ✅
- 3D office scene with lighting and furniture
- WASD avatar movement (frame-rate independent)
- Third-person camera system
- Login screen, HUD, local chat

### Phase 2 — Multiplayer *(in progress)*
- Socket.IO player sync (join, move, leave)
- Live remote player avatars with interpolation
- Real-time chat broadcast

### Phase 3 — Polish
- Avatar customization
- Multiple rooms
- Proximity-based chat
- WebRTC voice chat (Agora.io)
- Interactive objects

---

## Scripts

### Frontend
| Command | Description |
|---|---|
| `npm run dev` | Start dev server on port 9001 |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |

### Backend
| Command | Description |
|---|---|
| `npm run dev` | Start dev server with hot reload |
| `npm run build` | Compile TypeScript to `dist/` |
| `npm start` | Run compiled production server |

---

## Deployment

- **Frontend** → Vercel (set `VITE_SOCKET_URL` to your backend URL)
- **Backend** → Render or Railway (supports persistent WebSocket connections)

> Vercel does **not** support WebSockets — the backend must be on a platform that does (Render, Railway, Fly.io).

---

## License

MIT
