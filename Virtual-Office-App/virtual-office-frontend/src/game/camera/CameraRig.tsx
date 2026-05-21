import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { localPlayerPosition } from '../../store/refs';
import { CAMERA_HEIGHT, CAMERA_DISTANCE, CAMERA_LERP } from '../../constants/game';

// Pre-allocated vectors — never create new THREE.Vector3() inside useFrame
const _cameraTarget = new THREE.Vector3();
const _lookAtTarget = new THREE.Vector3();

// CameraRig doesn't render any geometry — it just manipulates the scene camera.
// It returns null. Its only job is the useFrame callback.
//
// Why not use Drei's <OrbitControls>?
// OrbitControls lets the user rotate the camera freely, which FIGHTS with
// keyboard movement (the movement direction would change relative to the camera).
// A fixed follow-cam is simpler and more comfortable for this use case.
const CameraRig = () => {
  const { camera } = useThree();

  // Track whether this is the first frame so we can snap the camera
  // immediately instead of lerping from the world origin.
  const initialized = useRef(false);

  useFrame(() => {
    const px = localPlayerPosition.x;
    const py = localPlayerPosition.y;
    const pz = localPlayerPosition.z;

    // Desired camera position: behind (+Z) and above (+Y) the player
    _cameraTarget.set(px, py + CAMERA_HEIGHT, pz + CAMERA_DISTANCE);

    if (!initialized.current) {
      // First frame: snap instantly so the player doesn't see a dramatic zoom-in
      camera.position.copy(_cameraTarget);
      initialized.current = true;
    } else {
      // Every other frame: lazily follow.
      // CAMERA_LERP = 0.06 means "close 6% of remaining gap per frame".
      // At 60fps this results in smooth, camera-on-a-spring feel.
      camera.position.lerp(_cameraTarget, CAMERA_LERP);
    }

    // Always look at a point slightly above the player's feet (their "chest")
    _lookAtTarget.set(px, py + 1.2, pz);
    camera.lookAt(_lookAtTarget);
  });

  return null;
};

export default CameraRig;
