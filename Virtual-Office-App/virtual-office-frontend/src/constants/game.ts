// ─── Movement ─────────────────────────────────────────────────────────────────
export const MOVE_SPEED = 5;          // units per second
export const OFFICE_HALF_SIZE = 18;   // floor is 40x40 (±18 keeps player off walls)

// ─── Avatar dimensions ────────────────────────────────────────────────────────
// These match the mesh geometry in Avatar.tsx — keep them in sync
export const AVATAR_BODY_RADIUS = 0.4;
export const AVATAR_BODY_LENGTH = 1.2; // capsule shaft length
export const AVATAR_HEAD_RADIUS = 0.35;
// World-space Y of the avatar group origin (floor level = 0)
export const AVATAR_BODY_Y = 1.0;     // capsule center above floor
export const AVATAR_HEAD_Y = 2.35;    // sphere center above floor

// ─── Camera ───────────────────────────────────────────────────────────────────
export const CAMERA_HEIGHT = 5;       // units above the player
export const CAMERA_DISTANCE = 9;     // units behind the player (along +Z)
export const CAMERA_LERP = 0.06;      // 0 = frozen, 1 = instant snap

// ─── Networking ───────────────────────────────────────────────────────────────
export const EMIT_INTERVAL_MS = 50;   // emit position at ~20 Hz
export const REMOTE_LERP = 0.12;      // remote avatar smoothing per frame

// ─── Avatar colors ────────────────────────────────────────────────────────────
export const AVATAR_COLORS = [
  '#61DAFB', // React blue
  '#FF6B6B', // Coral
  '#4ECDC4', // Teal
  '#FFE66D', // Yellow
  '#A8E6CF', // Mint
  '#FF8B94', // Pink
  '#B4A7D6', // Lavender
  '#FFD700', // Gold
] as const;
