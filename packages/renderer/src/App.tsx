import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { SettingsProvider } from "./contexts/SettingsContext";
import Home from "./pages/Home";
import NewBoard from "./pages/NewBoard";
import BoardDetails from "./pages/BoardDetails";

import Ai from './pages/Ai'

function App() {
  return (
    <SettingsProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/new" element={<NewBoard />} />
          <Route path="/board/:id" element={<BoardDetails />} />
          <Route path="/ai" element={<Ai />} />
        </Routes>
      </Router>
    </SettingsProvider>
  );
}

export default App;
