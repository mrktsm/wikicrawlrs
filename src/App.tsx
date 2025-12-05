import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { useEffect, useState } from "react";
import MainMenu from "./pages/MainMenu";
import Game from "./pages/Game";
import "./App.css";

function AppRoutes() {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransitionStage] = useState("idle");
  const [prevLocation, setPrevLocation] = useState(location);

  useEffect(() => {
    if (location !== displayLocation) {
      setTransitionStage("exiting");
      setPrevLocation(displayLocation);
    }
  }, [location, displayLocation]);

  useEffect(() => {
    if (transitionStage === "exiting") {
      const timer = setTimeout(() => {
        setDisplayLocation(location);
        setTransitionStage("entering");
      }, 400);
      return () => clearTimeout(timer);
    } else if (transitionStage === "entering") {
      // Clear animation class after it completes to restore fixed positioning
      const timer = setTimeout(() => {
        setTransitionStage("idle");
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [transitionStage, location]);

  return (
    <div className="page-transition-container">
      {transitionStage === "exiting" && (
        <div className="page-transition exiting">
          <Routes location={prevLocation}>
            <Route path="/" element={<MainMenu />} />
            <Route path="/game" element={<Game />} />
          </Routes>
        </div>
      )}
      <div
        className={`page-transition ${
          transitionStage === "entering" ? "entering" : ""
        }`}
      >
        <Routes location={displayLocation}>
          <Route path="/" element={<MainMenu />} />
          <Route path="/game" element={<Game />} />
        </Routes>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;
