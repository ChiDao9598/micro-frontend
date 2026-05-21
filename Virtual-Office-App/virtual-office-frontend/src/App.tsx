import { usePlayerStore } from './store/usePlayerStore';
import GameCanvas from './game/canvas/GameCanvas';
import Hud from './ui/Hud';
import LoginScreen from './ui/LoginScreen';

// App is the root of the Virtual Office application.
// It gates rendering behind the login screen — until the user has a name,
// there's nothing to render in the 3D world.
const App = () => {
  const hasJoined = usePlayerStore((s) => s.hasJoined);

  if (!hasJoined) {
    // fixed inset-0 = viewport-filling regardless of the host shell's layout constraints
    return (
      <div className="fixed inset-0 overflow-hidden">
        <LoginScreen />
      </div>
    );
  }

  return (
    // fixed inset-0 breaks out of the host shell's padding/max-width constraints.
    // The sidebar navbar gets z-index: 10 in the host app so it floats above the canvas.
    <div className="fixed inset-0 overflow-hidden bg-[#0a0a0f]">
      <GameCanvas />
      <Hud />
    </div>
  );
};

export default App;
