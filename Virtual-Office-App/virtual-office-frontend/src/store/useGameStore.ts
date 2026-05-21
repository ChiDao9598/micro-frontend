import { create } from 'zustand';
import { Player, PlayerMovedPayload } from '../types/player';

// Holds only REMOTE players. Local player identity lives in usePlayerStore;
// local player position lives in store/refs.ts (per-frame, no re-renders).
interface GameStore {
  remotePlayers: Record<string, Player>;

  setRemotePlayers: (players: Player[]) => void;
  addRemotePlayer: (player: Player) => void;
  removeRemotePlayer: (id: string) => void;
  updateRemotePlayer: (update: PlayerMovedPayload) => void;
}

export const useGameStore = create<GameStore>((set) => ({
  remotePlayers: {},

  setRemotePlayers: (players) =>
    set({
      remotePlayers: Object.fromEntries(players.map((p) => [p.id, p])),
    }),

  addRemotePlayer: (player) =>
    set((state) => ({
      remotePlayers: { ...state.remotePlayers, [player.id]: player },
    })),

  removeRemotePlayer: (id) =>
    set((state) => {
      const next = { ...state.remotePlayers };
      delete next[id];
      return { remotePlayers: next };
    }),

  // Only updates position + rotation — other fields (name, color) stay the same
  updateRemotePlayer: ({ id, position, rotation }) =>
    set((state) => {
      const player = state.remotePlayers[id];
      if (!player) return state;
      return {
        remotePlayers: {
          ...state.remotePlayers,
          [id]: { ...player, position, rotation },
        },
      };
    }),
}));
