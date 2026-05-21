// Type-safe Socket.IO event payloads for the client side.
// Keep these in sync with the backend's src/types/events.ts.

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
