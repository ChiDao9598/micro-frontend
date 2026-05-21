import express, { Request, Response } from 'express';
import http from 'http';
import cors from 'cors';
import { Server } from 'socket.io';
import { registerPlayerHandlers } from './handlers/playerHandlers';
import { registerChatHandlers } from './handlers/chatHandlers';
import { officeRoom } from './rooms/OfficeRoom';

const PORT = Number(process.env.PORT) || 3001;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:9001';

// In development allow all localhost ports (standalone :9001 + host-app shell :9000).
// In production, FRONTEND_URL can be a comma-separated list of allowed origins,
// e.g. "https://host-app.vercel.app,https://virtual-office.vercel.app"
const allowedOrigins = process.env.NODE_ENV === 'production'
  ? FRONTEND_URL.split(',').map((s) => s.trim())
  : /^http:\/\/localhost(:\d+)?$/;

// ─── HTTP server ──────────────────────────────────────────────────────────────
const app = express();
app.use(cors({ origin: allowedOrigins }));
app.use(express.json());

// Health check — Render/Railway ping this to keep the instance alive
app.get('/health', (_: Request, res: Response) => {
  res.json({
    status: 'ok',
    players: officeRoom.playerCount,
    uptime: Math.floor(process.uptime()),
  });
});

// ─── Socket.IO ────────────────────────────────────────────────────────────────
const httpServer = http.createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: allowedOrigins,
    methods: ['GET', 'POST'],
  },
  // pingTimeout/pingInterval tune how quickly the server detects a dead client.
  // Shorter = faster cleanup on mobile/tab-close, but more false disconnects on bad networks.
  pingTimeout: 20000,
  pingInterval: 10000,
});

io.on('connection', (socket) => {
  console.log(`[socket] connected: ${socket.id} | total: ${io.engine.clientsCount}`);

  registerPlayerHandlers(io, socket);
  registerChatHandlers(io, socket);
});

// ─── Start ────────────────────────────────────────────────────────────────────
httpServer.listen(PORT, () => {
  console.log(`\n  Virtual Office Backend`);
  console.log(`  ─────────────────────────────`);
  console.log(`  HTTP:      http://localhost:${PORT}`);
  console.log(`  Health:    http://localhost:${PORT}/health`);
  console.log(`  CORS:      ${FRONTEND_URL}`);
  console.log(`  Max:       ${officeRoom.playerCount} / 50 players\n`);
});