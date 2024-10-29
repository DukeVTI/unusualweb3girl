import React, { useState } from "react";
import SplashScreen from "./games/EmojiGame/Loading";
import LobbyScreen from "./games/EmojiGame/GameLobby";
import GameScreen from "./games/EmojiGame/Game";

const App = () => {
  // Game states: 'splash', 'lobby', 'game'
  const [currentScreen, setCurrentScreen] = useState("splash");
  const [gameSettings, setGameSettings] = useState(null);
  const [highScores, setHighScores] = useState([]);

  const handleSplashComplete = () => {
    setCurrentScreen("lobby");
  };

  const handleReturnToLobby = () => {
    setCurrentScreen("lobby");
  };

  const handleStartGame = (settings) => {
    setGameSettings(settings);
    setCurrentScreen("game");
  };

  const handleGameEnd = (results) => {
    // Add score to high scores
    const newScore = {
      playerName: gameSettings.playerName,
      difficulty: gameSettings.difficulty,
      moves: results.moves,
      time: results.time,
      date: new Date().toISOString(),
    };

    setHighScores((prevScores) => {
      const newScores = [...prevScores, newScore]
        .sort((a, b) => a.moves - b.moves)
        .slice(0, 10); // Keep only top 10 scores
      return newScores;
    });

    setCurrentScreen("lobby");
  };

  // Render current screen based on game state
  const renderScreen = () => {
    switch (currentScreen) {
      case "splash":
        return <SplashScreen onComplete={handleSplashComplete} />;
      case "lobby":
        return (
          <LobbyScreen onStartGame={handleStartGame} highScores={highScores} />
        );
      case "game":
        return (
          <GameScreen
            gameSettings={gameSettings}
            onGameEnd={handleGameEnd}
            onReturnToLobby={handleReturnToLobby}
          />
        );
      default:
        return <SplashScreen onComplete={handleSplashComplete} />;
    }
  };

  return <div className="min-h-screen">{renderScreen()}</div>;
};

export default App;
