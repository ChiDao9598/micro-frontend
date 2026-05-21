import { create } from 'zustand';
import { AVATAR_COLORS } from '../constants/game';

interface PlayerStore {
  id: string;           // set to socket.id after connection (Phase 2)
  name: string;
  color: string;
  hasJoined: boolean;
  join: (name: string) => void;
  setId: (id: string) => void;
}

const randomColor = (): string =>
  AVATAR_COLORS[Math.floor(Math.random() * AVATAR_COLORS.length)];

export const usePlayerStore = create<PlayerStore>((set) => ({
  id: `local_${crypto.randomUUID().slice(0, 8)}`, // temp ID until socket connects
  name: '',
  color: randomColor(),
  hasJoined: false,

  join: (name) => set({ name, hasJoined: true }),
  setId: (id) => set({ id }),
}));
