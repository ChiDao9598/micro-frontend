import { memo } from 'react';
import {
  AVATAR_BODY_RADIUS,
  AVATAR_BODY_LENGTH,
  AVATAR_HEAD_RADIUS,
  AVATAR_BODY_Y,
  AVATAR_HEAD_Y,
} from '../../constants/game';

interface AvatarProps {
  color: string;
}

// Shared avatar mesh used by BOTH LocalPlayer and RemotePlayer.
// Kept as a pure presentational component — no hooks, no state.
// memo() prevents re-renders when parent state changes but color hasn't.
const Avatar = memo(({ color }: AvatarProps) => (
  <group>
    {/* Body — CapsuleGeometry(radius, length, capSegments, radialSegments) */}
    <mesh position={[0, AVATAR_BODY_Y, 0]} castShadow>
      <capsuleGeometry args={[AVATAR_BODY_RADIUS, AVATAR_BODY_LENGTH, 4, 10]} />
      <meshStandardMaterial color={color} roughness={0.4} metalness={0.1} />
    </mesh>

    {/* Head */}
    <mesh position={[0, AVATAR_HEAD_Y, 0]} castShadow>
      <sphereGeometry args={[AVATAR_HEAD_RADIUS, 16, 12]} />
      <meshStandardMaterial color={color} roughness={0.4} metalness={0.1} />
    </mesh>

    {/* Eyes — two small white spheres so you can tell which way the avatar faces */}
    <mesh position={[-0.14, AVATAR_HEAD_Y, -(AVATAR_HEAD_RADIUS * 0.85)]}>
      <sphereGeometry args={[0.06, 8, 8]} />
      <meshStandardMaterial color="white" emissive="white" emissiveIntensity={0.5} />
    </mesh>
    <mesh position={[0.14, AVATAR_HEAD_Y, -(AVATAR_HEAD_RADIUS * 0.85)]}>
      <sphereGeometry args={[0.06, 8, 8]} />
      <meshStandardMaterial color="white" emissive="white" emissiveIntensity={0.5} />
    </mesh>
  </group>
));

Avatar.displayName = 'Avatar';
export default Avatar;
