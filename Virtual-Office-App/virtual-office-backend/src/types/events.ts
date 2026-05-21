// Mirror of react-app/src/networking/events.ts
// Keep both files in sync. In a monorepo these would be a shared package.
export const SOCKET_EVENTS = {
  PLAYER_JOIN: 'player:join',
  PLAYER_MOVE: 'player:move',
  CHAT_MESSAGE: 'chat:message',

  GAME_STATE: 'game:state',
  PLAYER_JOINED: 'player:joined',
  PLAYER_MOVED: 'player:moved',
  PLAYER_LEFT: 'player:left',
  CHAT_RECEIVED: 'chat:received',
  ERROR: 'error',
} as const;

// ─── Inbound payload types (client → server) ──────────────────────────────────
export interface JoinPayload {
  name: string;
  color: string;
}

export interface MovePayload {
  position: { x: number; y: number; z: number };
  rotation: number;
}

export interface ChatPayload {
  text: string;
}