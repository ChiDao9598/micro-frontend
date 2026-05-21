import PlayerList from './PlayerList';
import ChatPanel from './ChatPanel';

// HUD (Heads-Up Display) — DOM elements rendered over the 3D canvas.
//
// Key layout rule: `pointer-events-none` on the container so the canvas
// still receives mouse events (for future click interactions).
// Individual UI panels re-enable pointer events as needed.
const Hud = () => (
  <div className="absolute inset-0 z-10 pointer-events-none select-none">
    {/* Top-left: branding */}
    <div className="absolute top-4 left-4 pointer-events-auto">
      <div className="flex items-center gap-2 px-3 py-1.5 bg-[#0d0d18]/80 border border-white/[0.07] rounded-lg backdrop-blur-md">
        <span className="w-2 h-2 rounded-full bg-[#61DAFB] animate-pulse" />
        <span className="text-white/60 text-xs font-medium">Virtual Office</span>
      </div>
    </div>

    {/* Top-right: player list */}
    <div className="absolute top-4 right-4 pointer-events-auto">
      <PlayerList />
    </div>

    {/* Bottom-right: chat */}
    <div className="absolute bottom-4 right-4 pointer-events-auto flex flex-col items-end">
      <ChatPanel />
    </div>

    {/* Bottom-center: movement hint (fades after first move) */}
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 pointer-events-none">
      <div className="flex gap-1">
        {['W', 'A', 'S', 'D'].map((key) => (
          <kbd
            key={key}
            className="w-6 h-6 flex items-center justify-center text-[10px] font-bold
              bg-white/[0.06] border border-white/[0.12] rounded text-white/30"
          >
            {key}
          </kbd>
        ))}
      </div>
    </div>
  </div>
);

export default Hud;
