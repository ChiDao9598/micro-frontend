import { useGameStore } from '../../store/useGameStore';
import RemotePlayer from './RemotePlayer';

// Renders one RemotePlayer per entry in the Zustand remotePlayers map.
// When a player joins/leaves, Zustand updates, this component re-renders,
// and React reconciles the list — adding or removing the corresponding avatar.
const RemotePlayers = () => {
  // Selector: subscribe only to remotePlayers, not the entire store.
  // This component re-renders ONLY when the remotePlayers object reference changes
  // (i.e., a player joins or leaves), NOT when a player's position updates
  // (position updates only mutate the object's internals via updateRemotePlayer).
  const remotePlayers = useGameStore((state) => state.remotePlayers);

  return (
    <>
      {Object.values(remotePlayers).map((player) => (
        <RemotePlayer key={player.id} player={player} />
      ))}
    </>
  );
};

export default RemotePlayers;
