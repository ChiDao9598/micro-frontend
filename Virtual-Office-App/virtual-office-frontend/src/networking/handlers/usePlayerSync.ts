import { useEffect } from 'react';
import { useSocket } from '../useSocket';
import { SOCKET_EVENTS } from '../events';
import { usePlayerStore } from '../../store/usePlayerStore';
import { useGameStore } from '../../store/useGameStore';
import { localPlayerPosition, localPlayerRotation } from '../../store/refs';
import { EMIT_INTERVAL_MS } from '../../constants/game';
import type { GameStatePayload, Player, PlayerMovedPayload } from '../../types/player';

export const usePlayerSync = (): void => {
  const socket = useSocket();

  useEffect(() => {
    const { name, color, setId } = usePlayerStore.getState();
    const { setRemotePlayers, addRemotePlayer, updateRemotePlayer, removeRemotePlayer } =
      useGameStore.getState();

    socket.connect();
    socket.emit(SOCKET_EVENTS.PLAYER_JOIN, { name, color });

    socket.on(SOCKET_EVENTS.GAME_STATE, ({ localPlayer, players }: GameStatePayload) => {
      setId(localPlayer.id);
      setRemotePlayers(players);
    });

    socket.on(SOCKET_EVENTS.PLAYER_JOINED, (player: Player) => {
      addRemotePlayer(player);
    });

    socket.on(SOCKET_EVENTS.PLAYER_MOVED, (update: PlayerMovedPayload) => {
      updateRemotePlayer(update);
    });

    socket.on(SOCKET_EVENTS.PLAYER_LEFT, ({ id }: { id: string }) => {
      removeRemotePlayer(id);
    });

    // Throttled position emit — reads module-level refs directly, no React involved
    let lastX = 0, lastZ = 0;
    const interval = setInterval(() => {
      const { x, y, z } = localPlayerPosition;
      if (x === lastX && z === lastZ) return;
      lastX = x; lastZ = z;
      socket.emit(SOCKET_EVENTS.PLAYER_MOVE, {
        position: { x, y, z },
        rotation: localPlayerRotation.y,
      });
    }, EMIT_INTERVAL_MS);

    return () => {
      clearInterval(interval);
      socket.off(SOCKET_EVENTS.GAME_STATE);
      socket.off(SOCKET_EVENTS.PLAYER_JOINED);
      socket.off(SOCKET_EVENTS.PLAYER_MOVED);
      socket.off(SOCKET_EVENTS.PLAYER_LEFT);
      socket.disconnect();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps — intentionally runs once on mount
};
