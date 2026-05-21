import { RefObject } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { MOVE_SPEED, OFFICE_HALF_SIZE } from '../../constants/game';
import { localPlayerPosition, localPlayerRotation } from '../../store/refs';
import { useKeyboardInput } from './useKeyboardInput';

// Allocated once outside useFrame — new THREE.Vector3() inside useFrame causes GC pressure at 60fps
const _move = new THREE.Vector3();

export const useMovement = (meshRef: RefObject<THREE.Group | null>): void => {
  const keysRef = useKeyboardInput();

  useFrame((_, delta) => {
    if (!meshRef.current) return;

    const keys = keysRef.current;

    // Build a raw direction vector from current key state
    let dx = 0;
    let dz = 0;
    if (keys['KeyW'] || keys['ArrowUp'])    dz -= 1;
    if (keys['KeyS'] || keys['ArrowDown'])  dz += 1;
    if (keys['KeyA'] || keys['ArrowLeft'])  dx -= 1;
    if (keys['KeyD'] || keys['ArrowRight']) dx += 1;

    const isMoving = dx !== 0 || dz !== 0;

    if (isMoving) {
      // Normalize so diagonal movement isn't √2× faster than cardinal
      const len = Math.sqrt(dx * dx + dz * dz);
      _move.set(dx / len, 0, dz / len);

      localPlayerPosition.x += _move.x * MOVE_SPEED * delta;
      localPlayerPosition.z += _move.z * MOVE_SPEED * delta;

      localPlayerPosition.x = Math.max(-OFFICE_HALF_SIZE, Math.min(OFFICE_HALF_SIZE, localPlayerPosition.x));
      localPlayerPosition.z = Math.max(-OFFICE_HALF_SIZE, Math.min(OFFICE_HALF_SIZE, localPlayerPosition.z));

      // atan2(dx, dz): when moving in -Z (W key), avatar faces away from camera — correct Three.js orientation
      localPlayerRotation.y = Math.atan2(dx, dz);

      meshRef.current.position.copy(localPlayerPosition);
      meshRef.current.rotation.y = localPlayerRotation.y;
    }
  });
};
