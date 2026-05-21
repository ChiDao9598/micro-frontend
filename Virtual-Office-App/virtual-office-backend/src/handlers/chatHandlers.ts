import { Server, Socket } from 'socket.io';
import { officeRoom } from '../rooms/OfficeRoom';
import { SOCKET_EVENTS, ChatPayload } from '../types/events';

const MAX_MESSAGE_LENGTH = 200;

export const registerChatHandlers = (io: Server, socket: Socket): void => {

  // ── chat:message ──────────────────────────────────────────────────────────────
  // Payload: { text }
  socket.on(SOCKET_EVENTS.CHAT_MESSAGE, (payload: ChatPayload) => {
    const player = officeRoom.getPlayer(socket.id);
    if (!player) return; // must have joined first

    const text = payload.text?.trim().slice(0, MAX_MESSAGE_LENGTH);
    if (!text) return;

    // Broadcast to ALL players (including sender so they see their own message confirmed)
    io.emit(SOCKET_EVENTS.CHAT_RECEIVED, {
      id: crypto.randomUUID(),
      playerId: socket.id,
      playerName: player.name,
      playerColor: player.color,
      text,
      timestamp: Date.now(),
    });
  });
};