import { useRef } from 'react';
import * as THREE from 'three';
import { usePlayerStore } from '../../store/usePlayerStore';
import { useMovement } from '../controls/useMovement';
import { usePlayerSync } from '../../networking/handlers/usePlayerSync';
import Avatar from './Avatar';
import PlayerLabel from './PlayerLabel';

// LocalPlayer is the avatar controlled by the current user.
// It is separate from RemotePlayer so that each can have different logic:
//   - LocalPlayer: reads keyboard input, updates shared position ref
//   - RemotePlayer: reads socket events, interpolates toward server position
const LocalPlayer = () => {
  const { name, color } = usePlayerStore();

  // The mesh ref is passed to useMovement which mutates it directly in useFrame.
  // Using a ref (not state) means Three.js moves the mesh without React re-rendering.
  const groupRef = useRef<THREE.Group>(null!);

  usePlayerSync();
  useMovement(groupRef);

  return (
    <group ref={groupRef}>
      <Avatar color={color} />
      <PlayerLabel name={name} color={color} isLocal />
    </group>
  );
};

export default LocalPlayer;
