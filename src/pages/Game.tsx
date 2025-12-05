import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import SpeedrunWidget from "../components/SpeedrunWidget";
import WikipediaViewer from "../components/WikipediaViewer";
import Scoreboard from "../components/Scoreboard";
import "../App.css";
import "./Game.css";

const Game = () => {
  const [searchParams] = useSearchParams();
  const [hudVisible, setHudVisible] = useState(false);
  const startArticle =
    searchParams.get("start") || "React_(JavaScript_library)";

  // Show HUD after initial page transition completes (only on first mount)
  useEffect(() => {
    const timer = setTimeout(() => {
      setHudVisible(true);
    }, 500); // Wait for page transition + article to start loading
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="game-page">
      <div className="game-article-container">
        <WikipediaViewer 
          initialTitle={startArticle} 
          hideControls={true}
        />
      </div>
      <div className={`game-hud ${hudVisible ? "visible" : ""}`}>
        <Scoreboard />
        <SpeedrunWidget />
      </div>
    </div>
  );
};

export default Game;
