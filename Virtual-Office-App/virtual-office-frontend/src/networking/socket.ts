import { io, Socket } from 'socket.io-client';
import { SOCKET_URL } from '../constants/socket';

// Singleton socket instance — created once, reused everywhere.
// We do NOT connect on import. Call socket.connect() explicitly after the
// user has entered their name (Phase 2 — usePlayerSync hook).
let socket: Socket | null = null;

export const getSocket = (): Socket => {
  if (!socket) {
    socket = io(SOCKET_URL, {
      autoConnect: false,  // controlled connect: we call socket.connect() ourselves
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionAttempts: 5,
    });
  }
  return socket;
};
