import SpeedrunWidget from "../components/SpeedrunWidget";
import WikipediaViewer from "../components/WikipediaViewer";
import Scoreboard from "../components/Scoreboard";
import "../App.css";
import "./Game.css";

const Game = () => {
  return (
    <div className="game-page">
      <Scoreboard />
      <SpeedrunWidget />
      <WikipediaViewer />
    </div>
  );
};

export default Game;
