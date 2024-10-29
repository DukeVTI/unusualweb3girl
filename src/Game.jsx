import React, { useState } from 'react';

// Import all game states as an enum
const GameState = {
  SPLASH: 'splash',
  LOBBY: 'lobby',
  PLAYING: 'playing'
};

const Game = () => {
  const [gameState, setGameState] = useState(GameState.SPLASH);
  const [gameSettings, setGameSettings] = useState(null);

  // Handler for when splash screen completes
  const handleSplashComplete = () => {
    setGameState(GameState.LOBBY);
  };

  // Handler for when game starts from lobby
  const handleGameStart = (settings) => {
    setGameSettings(settings);
    setGameState(GameState.PLAYING);
  };

  // Handler for returning to lobby
  const handleReturnToLobby = () => {
    setGameState(GameState.LOBBY);
  };

  // Render different screens based on game state
  const renderScreen = () => {
    switch (gameState) {
      case GameState.SPLASH:
        return (
          <SplashScreen onComplete={handleSplashComplete} />
        );
      case GameState.LOBBY:
        return (
          <LobbyScreen onStartGame={handleGameStart} />
        );
      case GameState.PLAYING:
        return (
          <EmojiMatchingGame
            settings={gameSettings}
            onReturnToLobby={handleReturnToLobby}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen">
      {renderScreen()}
    </div>
  );
};

// Updated EmojiMatchingGame component to work with settings
const EmojiMatchingGame = ({ settings, onReturnToLobby }) => {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [moves, setMoves] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  // Get grid dimensions based on difficulty
  const getGridDimensions = () => {
    switch (settings.difficulty) {
      case 'easy': return 'grid-cols-3'; // 3x4
      case 'hard': return 'grid-cols-5'; // 5x4
      default: return 'grid-cols-4'; // 4x4 (medium)
    }
  };

  // Initialize game with settings
  useEffect(() => {
    const pairs = settings.difficulty === 'easy' ? 6 : 
                 settings.difficulty === 'hard' ? 10 : 8;
    const emojiSet = settings.emojiSet.slice(0, pairs);
    const emojiPairs = [...emojiSet, ...emojiSet];
    const shuffled = emojiPairs
      .map(value => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);

    setCards(shuffled);
    setFlipped([]);
    setMatched([]);
    setMoves(0);
    setGameOver(false);
  }, [settings]);

  const handleCardClick = (index) => {
    if (flipped.length === 2) return;
    if (matched.includes(index) || flipped.includes(index)) return;

    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(moves + 1);
      
      if (cards[newFlipped[0]] === cards[newFlipped[1]]) {
        setMatched([...matched, ...newFlipped]);
        setFlipped([]);
        
        if (matched.length + 2 === cards.length) {
          setGameOver(true);
        }
      } else {
        setTimeout(() => setFlipped([]), 1000);
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">Emoji Match</h2>
          <p className="text-sm text-gray-600">Player: {settings.playerName}</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-600">Moves: {moves}</p>
          <button 
            onClick={onReturnToLobby}
            className="text-blue-500 hover:text-blue-600 text-sm"
          >
            Return to Lobby
          </button>
        </div>
      </div>
      
      {/* Game Grid */}
      <div className={`grid ${getGridDimensions()} gap-2 mb-4`}>
        {cards.map((emoji, index) => (
          <button
            key={index}
            onClick={() => handleCardClick(index)}
            className={`
              h-16 text-2xl flex items-center justify-center rounded-lg
              transition-all duration-300 
              ${flipped.includes(index) || matched.includes(index)
                ? 'bg-white border-2 border-blue-500'
                : 'bg-blue-500 hover:bg-blue-600'
              }
              ${gameOver ? 'cursor-not-allowed' : 'cursor-pointer'}
            `}
            disabled={gameOver}
          >
            {(flipped.includes(index) || matched.includes(index)) ? emoji : ''}
          </button>
        ))}
      </div>

      {/* Game Over Message */}
      {gameOver && (
        <div className="text-center mt-6">
          <p className="text-lg font-bold mb-2">Congratulations! 🎉</p>
          <p>You completed the game in {moves} moves!</p>
          <button 
            onClick={onReturnToLobby}
            className="mt-4 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200"
          >
            Play Again
          </button>
        </div>
      )}
    </div>
  );
};

export default Game;