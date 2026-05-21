import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Player } from '../../types/player';
import { REMOTE_LERP } from '../../constants/game';
import Avatar from './Avatar';
import PlayerLabel from './PlayerLabel';

interface RemotePlayerProps {
  player: Player;
}

// RemotePlayer renders another user's avatar.
// It receives the latest KNOWN position from the server (via Zustand),
// but does NOT teleport to it — instead it lerps (smoothly moves) toward it
// each frame. This hides network latency: even if the server only sends
// updates every 50ms, the avatar still appears to move smoothly at 60fps.
const RemotePlayer = ({ player }: RemotePlayerProps) => {
  const groupRef = useRef<THREE.Group>(null!);

  // Target: the position the server most recently told us this player is at.
  // We use a ref (not state) so we can update it without triggering re-renders.
  const targetPosition = useRef(new THREE.Vector3(
    player.position.x,
    player.position.y,
    player.position.z,
  ));
  const targetRotation = useRef(player.rotation);

  // Sync target when the store updates (triggered by socket events in Phase 2)
  targetPosition.current.set(player.position.x, player.position.y, player.position.z);
  targetRotation.current = player.rotation;

  useFrame(() => {
    if (!groupRef.current) return;

    // lerp = "linear interpolation": move X% of remaining distance each frame.
    // REMOTE_LERP = 0.12 means "close 12% of the gap each frame".
    // At 60fps: after 1 frame → 88% remains, after 10 frames → 28% remains.
    // This feels natural and masks up to ~100ms of network jitter.
    groupRef.current.position.lerp(targetPosition.current, REMOTE_LERP);

    // Lerp rotation too — prevents snapping to a new facing direction
    groupRef.current.rotation.y +=
      (targetRotation.current - groupRef.current.rotation.y) * REMOTE_LERP;
  });

  return (
    <group ref={groupRef}>
      <Avatar color={player.color} />
      <PlayerLabel name={player.name} color={player.color} />
    </group>
  );
};

export default RemotePlayer;
