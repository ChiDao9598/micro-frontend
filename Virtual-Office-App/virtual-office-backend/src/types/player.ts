export interface Position {
  x: number;
  y: number;
  z: number;
}

export interface PlayerState {
  id: string;       // socket.id — unique per connection
  name: string;
  color: string;
  position: Position;
  rotation: number; // Y-axis in radians
  joinedAt: number; // Date.now() — useful for future session tracking
}