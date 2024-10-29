// src/App.jsx
import React from 'react';
import Player from './games/JumperGame/Components/Player';
import useGameLogic from './games/JumperGame/Hooks/useGameLogic';

const Apps = () => {
  const { playerPosition, handleJump } = useGameLogic();

  return (
    <div
      className="game-container"
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        backgroundColor: '#e0f7fa',
        overflow: 'hidden',
      }}
      onClick={handleJump}
    >
      <Player position={playerPosition} />
    </div>
  );
};

export default Apps;
