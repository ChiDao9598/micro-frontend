import { OFFICE_HALF_SIZE } from '../../constants/game';

const WALL_THICKNESS = 0.4;
const WALL_HEIGHT = 4;
const FLOOR_SIZE = OFFICE_HALF_SIZE * 2; // 36 units total

// A simple office environment built entirely from primitive geometries.
// No asset loading required — great for Phase 1 where we want to focus
// on movement and networking, not asset pipelines.
const World = () => (
  <group>
    {/* ── Floor ─────────────────────────────────────────────────────── */}
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
      <planeGeometry args={[FLOOR_SIZE, FLOOR_SIZE]} />
      <meshStandardMaterial color="#808080" roughness={0.8} metalness={0.0} />
    </mesh>

    <gridHelper
      args={[FLOOR_SIZE, FLOOR_SIZE / 2, '#b8bcd0', '#cdd0de']}
      position={[0, 0.01, 0]}
    />

    {/* ── Boundary walls ────────────────────────────────────────────── */}
    {[
      // [posX, posZ, scaleX, scaleZ, label]
      [0,                      OFFICE_HALF_SIZE,  FLOOR_SIZE,      WALL_THICKNESS], // north
      [0,                     -OFFICE_HALF_SIZE,  FLOOR_SIZE,      WALL_THICKNESS], // south
      [OFFICE_HALF_SIZE,       0,                 WALL_THICKNESS,  FLOOR_SIZE],     // east
      [-OFFICE_HALF_SIZE,      0,                 WALL_THICKNESS,  FLOOR_SIZE],     // west
    ].map(([x, z, sx, sz], i) => (
      <mesh key={i} position={[x, WALL_HEIGHT / 2, z]} castShadow receiveShadow>
        <boxGeometry args={[sx, WALL_HEIGHT, sz]} />
        <meshStandardMaterial color="#F5F5DC" roughness={0.9} />
      </mesh>
    ))}

    {/* Brand accent strip on the north wall */}
    <mesh position={[0, 2, -OFFICE_HALF_SIZE + 0.25]}>
      <boxGeometry args={[FLOOR_SIZE * 0.6, 0.08, 0.05]} />
      <meshStandardMaterial color="#4d8eff" emissive="#4d8eff" emissiveIntensity={1.5} />
    </mesh>

    {/* ── Desks (simple box placeholders) ──────────────────────────── */}
    <Desk position={[-6, 0, -6]} />
    <Desk position={[6, 0, -6]} />
    <Desk position={[-6, 0, 4]} />
    <Desk position={[6, 0, 4]} />
    <Desk position={[0, 0, -10]} />
    <Desk position={[-12, 0, 0]} />
    <Desk position={[12, 0, 0]} />

    {/* ── Meeting area — a ring of chairs around a round table ─────── */}
    <mesh position={[0, 0.45, 8]} castShadow>
      <cylinderGeometry args={[1.2, 1.2, 0.1, 16]} />
      <meshStandardMaterial color="#e0dcd4" roughness={0.6} />
    </mesh>
    {[0, 60, 120, 180, 240, 300].map((deg) => {
      const rad = (deg * Math.PI) / 180;
      return (
        <mesh
          key={deg}
          position={[Math.sin(rad) * 2.4, 0.4, 8 + Math.cos(rad) * 2.4]}
          castShadow
        >
          <boxGeometry args={[0.5, 0.08, 0.5]} />
          <meshStandardMaterial color="#d8d4cc" roughness={0.75} />
        </mesh>
      );
    })}
  </group>
);

// A single desk unit — reusable primitive
const Desk = ({ position }: { position: [number, number, number] }) => (
  <group position={position}>
    {/* Tabletop */}
    <mesh position={[0, 0.75, 0]} castShadow receiveShadow>
      <boxGeometry args={[2, 0.08, 1]} />
      <meshStandardMaterial color="#1a1a1a" roughness={0.4} metalness={0.1} />
    </mesh>
    {/* Legs */}
    {([-0.8, 0.8] as const).map((lx) =>
      ([-0.35, 0.35] as const).map((lz) => (
        <mesh key={`${lx},${lz}`} position={[lx, 0.35, lz]} castShadow>
          <boxGeometry args={[0.06, 0.7, 0.06]} />
          <meshStandardMaterial color="#909ab0" metalness={0.6} roughness={0.4} />
        </mesh>
      )),
    )}
    {/* Monitor */}
    <mesh position={[0, 1.1, -0.3]} castShadow>
      <boxGeometry args={[0.9, 0.55, 0.04]} />
      <meshStandardMaterial color="#2a2a38" />
    </mesh>
    <mesh position={[0, 1.1, -0.3]}>
      <boxGeometry args={[0.84, 0.49, 0.01]} />
      <meshStandardMaterial color="#1a2a4a" emissive="#1a3060" emissiveIntensity={0.8} />
    </mesh>
  </group>
);

export default World;
