import { usePlayers } from "../context/PlayersContext";

function PlayerLookup() {
  const { players } = usePlayers();

  return (
    <div>
          <div>
            <input
              type="text"           
              placeholder="Search Players"
            />
          </div>
          <div>
            {players.map((player) => (
              <button key={player.id}>
                <p>Player</p>
                <p>
                  {player.first_name} {player.last_name}
                </p>
              </button>
            ))}
          </div>
        </div>
  )
}

export default PlayerLookup;