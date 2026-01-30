import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PlayerCreation from "./pages/PlayerCreation";
import PlayerLookup from "./pages/PlayerLookup";
import GameCreation from "./pages/GameCreation";
import { PlayersProvider } from "./context/PlayersContext"

function App() {
  return (
    <PlayersProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/player/create" element={<PlayerCreation />} />
          <Route path="/players" element={<PlayerLookup />} />
          <Route path="/game" element={<GameCreation />} />
        </Routes>
      </Router>
    </PlayersProvider>
  );
}

export default App;
