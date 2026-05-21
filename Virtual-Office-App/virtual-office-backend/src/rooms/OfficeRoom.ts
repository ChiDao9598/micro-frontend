import { PlayerState, Position } from '../types/player';
import { MAX_PLAYERS, SPAWN_RADIUS } from '../constants/game';

// OfficeRoom is the authoritative in-memory state for the virtual office.
// It's a simple class — no database, no framework. Data lives in a Map
// keyed by socket.id, so lookups are O(1).
//
// In Phase 3 we'd replace this with a Redis hash or a Colyseus Room.
class OfficeRoom {
  private players: Map<string, PlayerState> = new Map();

  get isFull(): boolean {
    return this.players.size >= MAX_PLAYERS;
  }

  get playerCount(): number {
    return this.players.size;
  }

  addPlayer(id: string, name: string, color: string): PlayerState {
    // Scatter new players within a small radius so they don't overlap
    const angle = Math.random() * Math.PI * 2;
    const radius = Math.random() * SPAWN_RADIUS;

    const player: PlayerState = {
      id,
      name,
      color,
      position: {
        x: Math.cos(angle) * radius,
        y: 0,
        z: Math.sin(angle) * radius,
      },
      rotation: 0,
      joinedAt: Date.now(),
    };

    this.players.set(id, player);
    return player;
  }

  removePlayer(id: string): PlayerState | undefined {
    const player = this.players.get(id);
    this.players.delete(id);
    return player;
  }

  updatePosition(id: string, position: Position, rotation: number): void {
    const player = this.players.get(id);
    if (!player) return;
    player.position = position;
    player.rotation = rotation;
  }

  getPlayer(id: string): PlayerState | undefined {
    return this.players.get(id);
  }

  // Returns all players EXCEPT the one with the given id
  getOtherPlayers(excludeId: string): PlayerState[] {
    return Array.from(this.players.values()).filter((p) => p.id !== excludeId);
  }

  getAllPlayers(): PlayerState[] {
    return Array.from(this.players.values());
  }
}

// Export as a singleton — the entire server shares one office room
export const officeRoom = new OfficeRoom();