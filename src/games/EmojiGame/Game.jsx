import React, { useState, useEffect } from 'react';
import { Trophy, Timer, Pause, Play, RotateCcw, Home } from 'lucide-react';

const GameState = {
  INITIAL: 'INITIAL',
  COUNTDOWN: 'COUNTDOWN',
  PLAYING: 'PLAYING',
  PAUSED: 'PAUSED',
  COMPLETED: 'COMPLETED'
};

const GameScreen = ({ gameSettings, onGameEnd, onReturnToLobby }) => {
  const [gameState, setGameState] = useState(GameState.INITIAL);
  const [countdown, setCountdown] = useState(3);
  const [cards, setCards] = useState([]);
  const [flippedIndices, setFlippedIndices] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [moves, setMoves] = useState(0);
  const [gameStartTime, setGameStartTime] = useState(null);
  const [gameEndTime, setGameEndTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [showExitConfirmation, setShowExitConfirmation] = useState(false);
  const [touchStartTime, setTouchStartTime] = useState(null);
  const [isProcessingMove, setIsProcessingMove] = useState(false);

  useEffect(() => {
    initializeGame();
    startCountdown();
  }, [gameSettings]);

  useEffect(() => {
    if (gameState !== GameState.COUNTDOWN) return;

    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setGameState(GameState.PLAYING);
      setGameStartTime(Date.now());
    }
  }, [countdown, gameState]);

  useEffect(() => {
    if (gameState !== GameState.PLAYING) return;

    const timer = setInterval(() => {
      setElapsedTime(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState]);

  const initializeGame = () => {
    const { emojiSet, difficulty } = gameSettings;
    const numPairs = {
      easy: 6,
      medium: 8,
      hard: 10
    }[difficulty];

    const selectedEmojis = emojiSet.slice(0, numPairs);
    const pairs = [...selectedEmojis, ...selectedEmojis];
    
    const shuffledPairs = pairs
      .sort(() => Math.random() - 0.5)
      .map((emoji, index) => ({
        id: index,
        emoji,
        isFlipped: false,
        isMatched: false
      }));

    setCards(shuffledPairs);
    setMoves(0);
    setElapsedTime(0);
    setMatchedPairs([]);
    setFlippedIndices([]);
    setIsProcessingMove(false);
  };

  const startCountdown = () => {
    setCountdown(3);
    setGameState(GameState.COUNTDOWN);
  };

  const handleCardClick = (index) => {
    if (
      gameState !== GameState.PLAYING || 
      isProcessingMove ||
      flippedIndices.length === 2 || 
      cards[index].isMatched || 
      flippedIndices.includes(index)
    ) {
      return;
    }

    const newFlippedIndices = [...flippedIndices, index];
    setFlippedIndices(newFlippedIndices);

    if (newFlippedIndices.length === 2) {
      setIsProcessingMove(true);
      setMoves(moves + 1);
      const [firstIndex, secondIndex] = newFlippedIndices;
      
      if (cards[firstIndex].emoji === cards[secondIndex].emoji) {
        const newMatchedPairs = [...matchedPairs, cards[firstIndex].emoji];
        setMatchedPairs(newMatchedPairs);
        
        if (newMatchedPairs.length === cards.length / 2) {
          setGameState(GameState.COMPLETED);
          setGameEndTime(Date.now());
        }

        setCards(cards.map((card, i) => 
          i === firstIndex || i === secondIndex
            ? { ...card, isMatched: true }
            : card
        ));
      }

      setTimeout(() => {
        setFlippedIndices([]);
        setIsProcessingMove(false);
      }, 1000);
    }
  };

  const handleTouchStart = (index) => {
    setTouchStartTime(Date.now());
  };

  const handleTouchEnd = (index) => {
    const touchDuration = Date.now() - touchStartTime;
    if (touchDuration < 500) {
      handleCardClick(index);
    }
    setTouchStartTime(null);
  };

  const handlePauseResume = () => {
    if (gameState === GameState.PLAYING) {
      setGameState(GameState.PAUSED);
    } else if (gameState === GameState.PAUSED) {
      setGameState(GameState.PLAYING);
    }
  };

  const handleRestart = () => {
    initializeGame();
    startCountdown();
  };

  const handleExit = () => {
    if (gameState === GameState.PLAYING) {
      setShowExitConfirmation(true);
    } else {
      onReturnToLobby();
    }
  };

  const getGridLayout = () => {
    const baseClasses = 'grid auto-rows-fr gap-3 mx-auto';
    const layouts = {
      easy: {
        containerWidth: 'max-w-2xl',
        grid: 'grid-cols-3 sm:grid-cols-3'
      },
      medium: {
        containerWidth: 'max-w-3xl',
        grid: 'grid-cols-4 sm:grid-cols-4'
      },
      hard: {
        containerWidth: 'max-w-4xl',
        grid: 'grid-cols-4 sm:grid-cols-5'
      }
    }[gameSettings.difficulty];

    return `${baseClasses} ${layouts.grid} ${layouts.containerWidth}`;
  };

  const renderHeader = () => (
    <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-4 mb-6">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-xl font-bold text-gray-800">
          {gameSettings.playerName}'s Game
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-yellow-50 px-3 py-2 rounded-lg">
              <Trophy className="w-5 h-5 text-yellow-500" />
              <span className="text-gray-600 font-medium">{moves}</span>
            </div>
            <div className="flex items-center gap-2 bg-blue-50 px-3 py-2 rounded-lg">
              <Timer className="w-5 h-5 text-blue-500" />
              <span className="text-gray-600 font-medium">{elapsedTime}s</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={handlePauseResume}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              disabled={gameState === GameState.COMPLETED}
            >
              {gameState === GameState.PLAYING ? (
                <Pause className="w-5 h-5 text-gray-600" />
              ) : (
                <Play className="w-5 h-5 text-gray-600" />
              )}
            </button>
            <button 
              onClick={handleRestart}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <RotateCcw className="w-5 h-5 text-gray-600" />
            </button>
            <button 
              onClick={handleExit}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Home className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCard = (card, index) => (
    <div
      key={card.id}
      onTouchStart={() => handleTouchStart(index)}
      onTouchEnd={() => handleTouchEnd(index)}
      onClick={() => handleCardClick(index)}
      className="aspect-square w-full touch-manipulation"
    >
      <div 
        className={`relative w-full h-full transition-transform duration-500 transform-style-preserve-3d cursor-pointer
          ${(flippedIndices.includes(index) || card.isMatched) ? 'rotate-y-180' : ''}`}
      >
        <div className="absolute w-full h-full backface-hidden">
          <div className="w-full h-full bg-white rounded-xl shadow-lg flex items-center justify-center text-3xl sm:text-4xl border-2 border-gray-100 hover:border-blue-300 transition-colors">
            ❓
          </div>
        </div>
        <div className="absolute w-full h-full backface-hidden rotate-y-180">
          <div className={`w-full h-full rounded-xl shadow-lg flex items-center justify-center text-3xl sm:text-4xl
            ${card.isMatched ? 'bg-green-100' : 'bg-white'}`}>
            {card.emoji}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-500 to-purple-600 p-4 sm:p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {renderHeader()}
        
        <div className={`${getGridLayout()} ${gameState === GameState.PAUSED ? 'opacity-50' : ''}`}>
          {cards.map((card, index) => renderCard(card, index))}
        </div>

        {gameState === GameState.COUNTDOWN && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-full w-24 h-24 sm:w-32 sm:h-32 flex items-center justify-center shadow-lg">
              <div className="text-4xl sm:text-6xl font-bold text-blue-500">
                {countdown}
              </div>
            </div>
          </div>
        )}

        {(gameState === GameState.PAUSED || gameState === GameState.COMPLETED || showExitConfirmation) && (
          <div className="fixed inset-0 z-40 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-xl p-6 max-w-md w-full shadow-xl">
              {gameState === GameState.PAUSED && (
                <>
                  <h2 className="text-2xl font-bold text-center mb-6">Game Paused</h2>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      onClick={handlePauseResume}
                      className="flex-1 px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                    >
                      Resume Game
                    </button>
                    <button
                      onClick={handleRestart}
                      className="flex-1 px-4 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors"
                    >
                      Restart Game
                    </button>
                  </div>
                </>
              )}

              {gameState === GameState.COMPLETED && (
                <>
                  <h2 className="text-2xl font-bold text-center mb-4">🎉 Congratulations! 🎉</h2>
                  <div className="space-y-4 text-center mb-6">
                    <p className="text-gray-600">You completed the game in:</p>
                    <div className="flex justify-center gap-4">
                      <div className="bg-yellow-50 px-4 py-2 rounded-lg">
                        <p className="text-xl font-semibold text-yellow-600">{moves} moves</p>
                      </div>
                      <div className="bg-blue-50 px-4 py-2 rounded-lg">
                        <p className="text-xl font-semibold text-blue-600">{elapsedTime}s</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      onClick={() => onGameEnd({ moves, time: elapsedTime })}
                      className="flex-1 px-4 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors"
                    >
                      Back to Lobby
                    </button>
                    <button
                      onClick={handleRestart}
                      className="flex-1 px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                    >
                      Play Again
                    </button>
                  </div>
                </>
              )}

              {showExitConfirmation && (
                <>
                  <h2 className="text-xl font-bold text-center mb-4">Leave Game?</h2>
                  <p className="text-gray-600 text-center mb-6">
                    Your progress will be lost. Are you sure you want to exit?
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      onClick={() => setShowExitConfirmation(false)}
                      className="flex-1 px-4 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={onReturnToLobby}
                      className="flex-1 px-4 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
                    >
                      Exit Game
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GameScreen;