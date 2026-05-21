// All scene lights in one component.
// Keeping lights together makes it easy to iterate on the office mood.
const Lighting = () => (
  <>
    {/* Ambient base — enough to fill shadows without bleaching colors */}
    <ambientLight intensity={1.2} color="#ffffff" />

    {/* Hemisphere: soft sky from above, warm bounce from floor */}
    <hemisphereLight args={['#b8ccee', '#f0ece4', 1.0]} />

    {/* Primary overhead directional — main ceiling light source */}
    <directionalLight
      position={[2, 14, 6]}
      intensity={1.5}
      color="#F5F5DC"
      castShadow
      shadow-mapSize={[2048, 2048]}
      shadow-camera-near={0.5}
      shadow-camera-far={80}
      shadow-camera-left={-22}
      shadow-camera-right={22}
      shadow-camera-top={22}
      shadow-camera-bottom={-22}
    />

    {/* Secondary fill — softens harsh shadows from the opposite angle */}
    <directionalLight position={[-6, 10, -4]} intensity={0.8} color="#e8f4ff" />

    {/* Accent glow on the back wall */}
    <pointLight position={[0, 3, -17]} intensity={60} color="#4d8eff" distance={18} decay={2} />
  </>
);

export default Lighting;
