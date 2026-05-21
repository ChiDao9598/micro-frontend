export interface Position {
  x: number;
  y: number;
  z: number;
}

// A player as the server and store know them
export interface Player {
  id: string;
  name: string;
  color: string;
  position: Position;
  rotation: number; // Y-axis rotation in radians
}

// What the server sends when you first join (initial game state)
export interface GameStatePayload {
  localPlayer: Player;
  players: Player[]; // all other players already in the room
}

// What the server sends when a remote player moves
export interface PlayerMovedPayload {
  id: string;
  position: Position;
  rotation: number;
}
