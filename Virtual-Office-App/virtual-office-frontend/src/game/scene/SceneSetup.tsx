// SceneSetup configures the environment-level properties of the Three.js scene:
// background color and fog. These are attached to the scene object itself
// (not rendered as meshes), which is why we use the `attach` prop.
const SceneSetup = () => (
  <>
    {/* Scene background color */}
    <color attach="background" args={['#b8c8e0']} />
    <fogExp2 attach="fog" args={['#b8c8e0', 0.006]} />
  </>
);

export default SceneSetup;
