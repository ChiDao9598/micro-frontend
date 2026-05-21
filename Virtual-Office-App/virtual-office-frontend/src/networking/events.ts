// Single source of truth for all Socket.IO event names.
// Both client handlers and the backend use these exact strings.
// Changing a name here catches every usage immediately — no magic strings.

export const SOCKET_EVENTS = {
  // Client → Server
  PLAYER_JOIN: 'player:join',
  PLAYER_MOVE: 'player:move',
  CHAT_MESSAGE: 'chat:message',

  // Server → Client
  GAME_STATE: 'game:state',
  PLAYER_JOINED: 'player:joined',
  PLAYER_MOVED: 'player:moved',
  PLAYER_LEFT: 'player:left',
  CHAT_RECEIVED: 'chat:received',
  ERROR: 'error',
} as const;

export type SocketEventKey = keyof typeof SOCKET_EVENTS;
export type SocketEventValue = (typeof SOCKET_EVENTS)[SocketEventKey];
