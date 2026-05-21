import * as THREE from 'three';

// ─── Per-frame mutable values ──────────────────────────────────────────────────
// These are module-level refs (not React state) so they can be written in one
// component (LocalPlayer) and read in another (CameraRig) every frame WITHOUT
// triggering any React re-renders.
//
// Rule: anything that changes at 60fps lives here, never in Zustand.

export const localPlayerPosition = new THREE.Vector3(0, 0, 0);
export const localPlayerRotation = { y: 0 };
