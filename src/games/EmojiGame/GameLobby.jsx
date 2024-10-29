import React, { useState, useEffect } from 'react';
import GameStorageService from './GameStorageService';
import { Trophy, Book, X } from 'lucide-react';

const LobbyScreen = ({ onStartGame }) => {
  const [playerName, setPlayerName] = useState('');
  const [difficulty, setDifficulty] = useState('medium');
  const [theme, setTheme] = useState('animals');
  const [showHowToPlay, setShowHowToPlay] = useState(false);
  const [showHighScores, setShowHighScores] = useState(false);
  const [highScores, setHighScores] = useState({});
  const [selectedScoreDifficulty, setSelectedScoreDifficulty] = useState('medium');
  const [isResettingScores, setIsResettingScores] = useState(false);

  // Load player preferences and high scores on mount
  useEffect(() => {
    const preferences = GameStorageService.getPlayerPreferences();
    setPlayerName(preferences.playerName);
    setTheme(preferences.lastTheme);
    setDifficulty(preferences.lastDifficulty);
    
    const scores = GameStorageService.getHighScores();
    setHighScores(scores);
  }, []);

  // Save preferences when they change
  useEffect(() => {
    if (playerName || theme || difficulty) {
      GameStorageService.savePlayerPreferences({
        playerName,
        lastTheme: theme,
        lastDifficulty: difficulty,
      });
    }
  }, [playerName, theme, difficulty]);

  // Handle ESC key for modals
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        setShowHowToPlay(false);
        setShowHighScores(false);
        setIsResettingScores(false);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  const themes = {
    animals: ['🐶', '🐱', '🐼', '🐨', '🦊', '🦁', '🐯', '🦒', '🦝', '🦘'],
    food: ['🍕', '🍔', '🌮', '🍣', '🍜', '🍎', '🍇', '🥑', '🍦', '🥐'],
    sports: ['⚽', '🏀', '🎾', '🏈', '⚾', '🏸', '🎱', '🏓', '🏹', '🎯'],
    nature: ['🌸', '🌺', '🌻', '🌹', '🌴', '🌈', '⭐', '🌙', '🌞', '🍀']
  };

  const difficultySettings = {
    easy: { grid: '3x4', pairs: 6, label: 'Easy' },
    medium: { grid: '4x4', pairs: 8, label: 'Medium' },
    hard: { grid: '5x4', pairs: 10, label: 'Hard' }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const handleStartGame = (e) => {
    e.preventDefault();
    if (!playerName.trim()) {
      alert('Please enter your name!');
      return;
    }
    
    onStartGame({
      playerName: playerName.trim(),
      difficulty,
      theme,
      emojiSet: themes[theme].slice(0, difficultySettings[difficulty].pairs)
    });
  };

  const handleResetScores = () => {
    GameStorageService.clearAllData();
    setHighScores(GameStorageService.getHighScores());
    setIsResettingScores(false);
  };

  // Modal Component
  const Modal = ({ show, onClose, title, children }) => {
    if (!show) return null;

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 animate-fadeIn">
        <div className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[80vh] animate-slideIn">
          <div className="p-4 border-b border-gray-100">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold text-gray-800">{title}</h3>
              <button
                onClick={onClose}
                className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
          </div>
          <div className="p-4">
            {children}
          </div>
        </div>
      </div>
    );
  };

  // High Scores Content Component
  const HighScoresContent = () => (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
        <div className="flex gap-2">
          {Object.keys(difficultySettings).map((diff) => (
            <button
              key={diff}
              onClick={() => setSelectedScoreDifficulty(diff)}
              className={`px-3 py-1.5 rounded-lg transition-colors text-sm font-medium
                ${selectedScoreDifficulty === diff
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
            >
              {difficultySettings[diff].label}
            </button>
          ))}
        </div>
        <button
          onClick={() => setIsResettingScores(true)}
          className="text-sm text-red-500 hover:text-red-600 transition-colors"
        >
          Reset All Scores
        </button>
      </div>

      {highScores[selectedScoreDifficulty]?.length > 0 ? (
        <div className="overflow-y-auto max-h-96">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr className="text-left">
                <th className="px-4 py-2 text-sm font-medium text-gray-600">#</th>
                <th className="px-4 py-2 text-sm font-medium text-gray-600">Player</th>
                <th className="px-4 py-2 text-sm font-medium text-gray-600">Moves</th>
                <th className="px-4 py-2 text-sm font-medium text-gray-600">Time</th>
                <th className="px-4 py-2 text-sm font-medium text-gray-600">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {highScores[selectedScoreDifficulty].map((score, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-4 py-2 text-sm">
                    {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : index + 1}
                  </td>
                  <td className="px-4 py-2 font-medium">{score.playerName}</td>
                  <td className="px-4 py-2">{score.moves}</td>
                  <td className="px-4 py-2">{score.time}s</td>
                  <td className="px-4 py-2 text-sm text-gray-500">{formatDate(score.date)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-8">
          <Trophy className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-600">
            No scores yet for {difficultySettings[selectedScoreDifficulty].label} difficulty.
            <br />Be the first to play!
          </p>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-500 to-purple-600 px-4 py-6 sm:p-8">
      <form 
        onSubmit={handleStartGame} 
        className="max-w-md mx-auto bg-white rounded-xl shadow-2xl p-6 animate-slideUp"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">
            Emoji Match
          </h1>
          <p className="text-gray-600">
            Test your memory with this fun matching game!
          </p>
        </div>

        <div className="space-y-6">
          {/* Player Name Input */}
          <div>
            <label htmlFor="playerName" className="block text-sm font-medium text-gray-700 mb-2">
              Player Name
            </label>
            <input
              id="playerName"
              type="text"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              placeholder="Enter your name"
              className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Difficulty Selector */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Difficulty
            </label>
            <div className="grid grid-cols-3 gap-2">
              {Object.keys(difficultySettings).map((key) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setDifficulty(key)}
                  className={`px-4 py-2 rounded-lg font-medium text-sm 
                    ${difficulty === key
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}
                >
                  {difficultySettings[key].label}
                </button>
              ))}
            </div>
          </div>

          {/* Theme Selector */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Theme
            </label>
            <div className="grid grid-cols-2 gap-2">
              {Object.keys(themes).map((themeKey) => (
                <button
                  key={themeKey}
                  type="button"
                  onClick={() => setTheme(themeKey)}
                  className={`px-4 py-2 rounded-lg font-medium text-sm
                    ${theme === themeKey
                      ? 'bg-purple-500 text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}
                >
                  {themeKey.charAt(0).toUpperCase() + themeKey.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Start Game Button */}
          <button
            type="submit"
            className="w-full px-4 py-2 bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg transition-colors"
          >
            Start Game
          </button>

          {/* How to Play Button */}
          <button
            type="button"
            onClick={() => setShowHowToPlay(true)}
            className="w-full px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors"
          >
            How to Play
          </button>

          {/* View High Scores Button */}
          <button
            type="button"
            onClick={() => setShowHighScores(true)}
            className="w-full px-4 py-2 bg-gray-700 hover:bg-gray-800 text-white font-medium rounded-lg transition-colors"
          >
            View High Scores
          </button>
        </div>
      </form>

      {/* How to Play Modal */}
      <Modal
        show={showHowToPlay}
        onClose={() => setShowHowToPlay(false)}
        title="How to Play"
      >
        <div className="space-y-4 text-gray-600">
          <p>
            Welcome to Emoji Match! The goal is to match all pairs of emoji cards in the fewest moves
            and shortest time possible.
          </p>
          <ul className="list-disc list-inside">
            <li>Click on a card to flip it over.</li>
            <li>Try to find the matching card by remembering the emoji positions.</li>
            <li>If the cards match, they will remain flipped. If not, they will flip back.</li>
            <li>Your score is based on the number of moves and time taken to complete the game.</li>
          </ul>
          <p>Good luck and have fun!</p>
        </div>
      </Modal>

      {/* High Scores Modal */}
      <Modal
        show={showHighScores}
        onClose={() => setShowHighScores(false)}
        title="High Scores"
      >
        {isResettingScores ? (
          <div className="text-center py-8">
            <p className="text-gray-600 mb-4">Are you sure you want to reset all high scores?</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleResetScores}
                className="px-4 py-2 bg-red-500 text-white rounded-lg"
              >
                Yes, Reset
              </button>
              <button
                onClick={() => setIsResettingScores(false)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <HighScoresContent />
        )}
      </Modal>
    </div>
  );
};

export default LobbyScreen;