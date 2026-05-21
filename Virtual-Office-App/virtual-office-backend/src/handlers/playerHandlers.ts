import { Server, Socket } from 'socket.io';
import { officeRoom } from '../rooms/OfficeRoom';
import { SOCKET_EVENTS, JoinPayload, MovePayload } from '../types/events';

export const registerPlayerHandlers = (io: Server, socket: Socket): void => {

  // ── player:join ──────────────────────────────────────────────────────────────
  // Fired once by the client after the socket connects.
  // Payload: { name, color }
  socket.on(SOCKET_EVENTS.PLAYER_JOIN, (payload: JoinPayload) => {
    if (officeRoom.isFull) {
      socket.emit(SOCKET_EVENTS.ERROR, { message: 'Office is full. Try again later.' });
      return;
    }

    const player = officeRoom.addPlayer(socket.id, payload.name, payload.color);
    console.log(`[+] ${payload.name} joined (${socket.id}) — ${officeRoom.playerCount} online`);

    // Send the joining player their own info + the current state of everyone else.
    // This is the "initial snapshot" — they now know where all other players are.
    socket.emit(SOCKET_EVENTS.GAME_STATE, {
      localPlayer: player,
      players: officeRoom.getOtherPlayers(socket.id),
    });

    // Tell everyone else a new player arrived
    socket.broadcast.emit(SOCKET_EVENTS.PLAYER_JOINED, player);
  });

  // ── player:move ──────────────────────────────────────────────────────────────
  // Fired ~20x/sec by the client while the player is moving.
  // Payload: { position: { x, y, z }, rotation }
  socket.on(SOCKET_EVENTS.PLAYER_MOVE, (payload: MovePayload) => {
    officeRoom.updatePosition(socket.id, payload.position, payload.rotation);

    // Broadcast to everyone EXCEPT the sender — they already have their own position
    socket.broadcast.emit(SOCKET_EVENTS.PLAYER_MOVED, {
      id: socket.id,
      position: payload.position,
      rotation: payload.rotation,
    });
  });

  // ── disconnect ────────────────────────────────────────────────────────────────
  // Socket.IO fires this automatically; no client-side event needed
  socket.on('disconnect', (reason: string) => {
    const player = officeRoom.removePlayer(socket.id);
    if (!player) return;

    console.log(`[-] ${player.name} left (${socket.id}) — reason: ${reason} — ${officeRoom.playerCount} online`);

    // Tell everyone else to remove this player's avatar
    io.emit(SOCKET_EVENTS.PLAYER_LEFT, { id: socket.id });
  });
};