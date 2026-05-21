import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { CAMERA_HEIGHT, CAMERA_DISTANCE } from '../../constants/game';
import SceneSetup from '../scene/SceneSetup';
import Lighting from '../scene/Lighting';
import World from '../scene/World';
import LocalPlayer from '../player/LocalPlayer';
import RemotePlayers from '../player/RemotePlayers';
import CameraRig from '../camera/CameraRig';

const GameCanvas = () => (
  <Canvas
    className="absolute inset-0"
    camera={{ position: [0, CAMERA_HEIGHT, CAMERA_DISTANCE], fov: 60, near: 0.1, far: 200 }}
    shadows
    gl={{
      antialias: true,
      toneMapping: 1, // THREE.ReinhardToneMapping — preserves bright whites without blowing out
      toneMappingExposure: 1.2,
    }}
    // dpr clamps the device pixel ratio so the scene isn't rendered
    // at 3× resolution on Retina displays (hurts performance on mobile)
    dpr={[1, 2]}
  >
    <Suspense fallback={null}>
      <SceneSetup />
      <Lighting />
      <World />
      <LocalPlayer />
      <RemotePlayers />
      <CameraRig />
    </Suspense>
  </Canvas>
);

export default GameCanvas;
