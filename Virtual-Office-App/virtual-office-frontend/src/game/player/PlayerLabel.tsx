import { memo } from 'react';
import { Html } from '@react-three/drei';

interface PlayerLabelProps {
  name: string;
  color: string;
  isLocal?: boolean;
}

// Renders a floating DOM div above the avatar using Drei's <Html>.
// <Html> is a portal: it takes a 3D position and renders a DOM element at that
// world-space coordinate, projected onto the screen. It's not actually "in" the scene.
const PlayerLabel = memo(({ name, color, isLocal = false }: PlayerLabelProps) => (
  <Html
    position={[0, 2.9, 0]} // slightly above the head sphere
    center                  // horizontally centered on the position
    distanceFactor={8}      // label scales down when camera moves away
    occlude={false}         // always visible (don't hide behind geometry)
  >
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '5px',
        padding: '3px 10px',
        background: 'rgba(10,10,15,0.85)',
        border: `1px solid ${color}55`,
        borderRadius: '999px',
        backdropFilter: 'blur(6px)',
        whiteSpace: 'nowrap',
        pointerEvents: 'none',
        userSelect: 'none',
      }}
    >
      {/* Color dot */}
      <span
        style={{
          width: 8,
          height: 8,
          borderRadius: '50%',
          background: color,
          flexShrink: 0,
        }}
      />
      <span style={{ color: 'white', fontSize: 12, fontWeight: 600, fontFamily: 'system-ui, sans-serif' }}>
        {name}
        {isLocal && (
          <span style={{ color, marginLeft: 4, fontSize: 10, fontWeight: 400 }}>
            (you)
          </span>
        )}
      </span>
    </div>
  </Html>
));

PlayerLabel.displayName = 'PlayerLabel';
export default PlayerLabel;
