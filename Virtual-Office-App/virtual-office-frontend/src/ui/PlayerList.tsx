import { usePlayerStore } from '../store/usePlayerStore';
import { useGameStore } from '../store/useGameStore';

const PlayerList = () => {
  const id = usePlayerStore((s) => s.id);
  const name = usePlayerStore((s) => s.name);
  const color = usePlayerStore((s) => s.color);
  const remotePlayers = useGameStore((s) => s.remotePlayers);

  const allPlayers = [
    { id, name, color, isLocal: true },
    ...Object.values(remotePlayers).map((p) => ({ ...p, isLocal: false })),
  ];

  return (
    <div className="w-44 bg-[#0d0d18]/90 border border-white/[0.07] rounded-xl p-3 backdrop-blur-md">
      <div className="flex items-center justify-between mb-2">
        <span className="text-white/50 text-[10px] uppercase tracking-widest font-semibold">
          Online
        </span>
        <span className="text-[#61DAFB] text-[10px] font-bold">{allPlayers.length}</span>
      </div>

      <ul className="space-y-1.5">
        {allPlayers.map((player) => (
          <li key={player.id} className="flex items-center gap-2">
            {/* Avatar color dot */}
            <span
              className="w-2 h-2 rounded-full flex-shrink-0"
              style={{ background: player.color, boxShadow: `0 0 4px ${player.color}88` }}
            />
            <span className="text-white/80 text-xs truncate flex-1">
              {player.name}
            </span>
            {player.isLocal && (
              <span className="text-white/25 text-[9px]">you</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlayerList;
