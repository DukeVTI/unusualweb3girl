import { useState, useEffect, useCallback } from "react";
import {
  Timer,
  RotateCcw,
  Trophy,
  Volume2,
  VolumeX,
  Settings,
  HelpCircle,
  Zap,
  Clock,
  Eye,
  Star,
} from "lucide-react";

const PowerUpComponent = ({ type, isActive, onClick, cooldown }) => {
  const getPowerUpDetails = () => {
    switch (type) {
      case "timeFreeze":
        return {
          icon: <Clock className="w-6 h-6" />,
          label: "Freeze Time",
          color: "bg-blue-500",
        };
      case "revealCards":
        return {
          icon: <Eye className="w-6 h-6" />,
          label: "Reveal Cards",
          color: "bg-purple-500",
        };
      case "doublePoints":
        return {
          icon: <Star className="w-6 h-6" />,
          label: "Double Points",
          color: "bg-yellow-500",
        };
      default:
        return {
          icon: <Zap className="w-6 h-6" />,
          label: "Power Up",
          color: "bg-gray-500",
        };
    }
  };

  const { icon, label, color } = getPowerUpDetails();

  return (
    <button
      onClick={onClick}
      disabled={!isActive}
      className={`relative ${color} p-3 rounded-lg transition-all duration-300
          ${isActive ? "hover:scale-105" : "opacity-50"}`}
    >
      {icon}
      <span className="text-xs block mt-1">{label}</span>
      {cooldown > 0 && (
        <div
          className="absolute -top-2 -right-2 bg-red-500 rounded-full w-6 h-6 
            flex items-center justify-center text-xs"
        >
          {cooldown}
        </div>
      )}
    </button>
  );
};

const DIFFICULTY_LEVELS = {
  easy: { time: 45, pairs: 6, bonusTime: 10 },
  medium: { time: 30, pairs: 8, bonusTime: 7 },
  hard: { time: 25, pairs: 10, bonusTime: 5 },
};

const EMOJIS = ["😄", "🤣", "😎", "😍", "🤔", "😴", "😇", "🤓", "👻", "🎃"];

const calculateScore = (matches, timeLeft, difficulty, scoreMultiplier = 1) => {
  const baseScore = matches * 100;
  const timeBonus = timeLeft * 10;
  const difficultyMultiplier = { easy: 1, medium: 1.5, hard: 2 }[difficulty];
  return Math.round(
    (baseScore + timeBonus) * difficultyMultiplier * scoreMultiplier
  );
};

const TutorialContent = () => (
  <div className="space-y-4">
    <div className="mb-6">
      <h2 className="text-2xl font-bold mb-2">How to Play</h2>
      <p className="text-gray-300">
        Match pairs of emojis before time runs out!
      </p>
    </div>

    <div className="space-y-4">
      <div className="bg-gray-700 p-4 rounded-lg">
        <h3 className="font-bold mb-2">🎮 Basic Rules</h3>
        <ul className="list-disc list-inside space-y-2">
          <li>Click cards to flip them over</li>
          <li>Find matching pairs of emojis</li>
          <li>Match all pairs before time runs out</li>
        </ul>
      </div>

      <div className="bg-gray-700 p-4 rounded-lg">
        <h3 className="font-bold mb-2">⏱️ Time & Scoring</h3>
        <ul className="list-disc list-inside space-y-2">
          <li>Each match earns you points</li>
          <li>Bonus points for remaining time</li>
          <li>Get bonus time for each match</li>
        </ul>
      </div>

      <div className="bg-gray-700 p-4 rounded-lg">
        <h3 className="font-bold mb-2">🏆 Features</h3>
        <ul className="list-disc list-inside space-y-2">
          <li>Three difficulty levels</li>
          <li>Unlock achievements</li>
          <li>Track high scores</li>
          <li>Use hints when stuck</li>
        </ul>
      </div>

      <div className="bg-gray-700 p-4 rounded-lg">
        <h3 className="font-bold mb-2">💡 Tips</h3>
        <ul className="list-disc list-inside space-y-2">
          <li>Try to remember card positions</li>
          <li>Use hints wisely</li>
          <li>Start with easy mode to practice</li>
        </ul>
      </div>
    </div>
  </div>
);

export default function EmojiMatchingGame() {
  // Game state
  const [cards, setCards] = useState([]);
  const [powerUps, setPowerUps] = useState({
    timeFreeze: { active: true, cooldown: 0 },
    revealCards: { active: true, cooldown: 0 },
    doublePoints: { active: true, cooldown: 0 },
  });
  const [scoreMultiplier, setScoreMultiplier] = useState(1);
  const [timeFrozen, setTimeFrozen] = useState(false);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matches, setMatches] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameOver, setGameOver] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [difficulty, setDifficulty] = useState("medium");
  const [score, setScore] = useState(0);
  const [isProcessingMatch, setIsProcessingMatch] = useState(false);

  // Settings state
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showSettings, setShowSettings] = useState(false);

  // Tutorial state
  const [showTutorial, setShowTutorial] = useState(() => {
    return !localStorage.getItem("tutorialSeen");
  });

  // Memoize audio context creation
  const audioContext = useCallback(() => {
    return new (window.AudioContext || window.webkitAudioContext)();
  }, []);

  const handlePowerUp = useCallback((type) => {
    if (!powerUps[type].active || gameOver) return;

    switch (type) {
      case "timeFreeze":
        setTimeFrozen(true);
        setTimeout(() => setTimeFrozen(false), 5000);
        break;
      case "revealCards":
        setCards((prevCards) => prevCards.map((card) => ({ ...card, isFlipped: true })));
        setTimeout(() => {
          setCards((prevCards) =>
            prevCards.map((card) =>
              card.isMatched ? card : { ...card, isFlipped: false }
            )
          );
        }, 2000);
        break;
      case "doublePoints":
        setScoreMultiplier(2);
        setTimeout(() => setScoreMultiplier(1), 10000);
        break;
    }

    setPowerUps((prev) => ({
      ...prev,
      [type]: { active: false, cooldown: 30 },
    }));
  }, [gameOver, powerUps]);

  const [highScore, setHighScore] = useState(() => {
    try {
      const saved = localStorage.getItem("highScore");
      return saved ? JSON.parse(saved) : { easy: 0, medium: 0, hard: 0 };
    } catch {
      return { easy: 0, medium: 0, hard: 0 };
    }
  });

  const [achievements, setAchievements] = useState(() => {
    try {
      const saved = localStorage.getItem("achievements");
      return saved
        ? JSON.parse(saved)
        : {
            firstWin: false,
            speedMaster: false,
            perfectGame: false,
            hardModeWin: false,
          };
    } catch {
      return {
        firstWin: false,
        speedMaster: false,
        perfectGame: false,
        hardModeWin: false,
      };
    }
  });

  const createGameBoard = useCallback(() => {
    const numPairs = DIFFICULTY_LEVELS[difficulty].pairs;
    const selectedEmojis = EMOJIS.slice(0, numPairs);
    const pairs = [...selectedEmojis, ...selectedEmojis];
    return pairs
      .sort(() => Math.random() - 0.5)
      .map((emoji, index) => ({
        id: index,
        emoji,
        isFlipped: false,
        isMatched: false,
      }));
  }, [difficulty]);

  const playSound = useCallback((type) => {
    if (!soundEnabled) return;

    const sounds = {
      flip: [500, 100],
      match: [800, 200],
      win: [1000, 300],
      gameOver: [200, 300],
    };

    const [freq, duration] = sounds[type];
    const context = audioContext();
    const oscillator = context.createOscillator();
    const gainNode = context.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(context.destination);
    oscillator.frequency.value = freq;
    gainNode.gain.setValueAtTime(0.1, context.currentTime);
    oscillator.start();

    setTimeout(() => {
      oscillator.stop();
      context.close();
    }, duration);
  }, [soundEnabled, audioContext]);

  const checkAchievements = useCallback((finalScore, timeRemaining) => {
    const newAchievements = { ...achievements };

    if (!achievements.firstWin) newAchievements.firstWin = true;
    if (timeRemaining > DIFFICULTY_LEVELS[difficulty].time / 2)
      newAchievements.speedMaster = true;
    if (finalScore > highScore[difficulty]) newAchievements.perfectGame = true;
    if (difficulty === "hard" && finalScore > 0)
      newAchievements.hardModeWin = true;

    setAchievements(newAchievements);
    try {
      localStorage.setItem("achievements", JSON.stringify(newAchievements));
    } catch (error) {
      console.error("Failed to save achievements:", error);
    }
  }, [achievements, difficulty, highScore]);

  const startNewGame = useCallback(() => {
    setCards(createGameBoard());
    setFlippedCards([]);
    setMatches(0);
    setTimeLeft(DIFFICULTY_LEVELS[difficulty].time);
    setGameOver(false);
    setShowHint(false);
    setScore(0);
    setScoreMultiplier(1);
    setTimeFrozen(false);
    setIsProcessingMatch(false);
    setPowerUps({
      timeFreeze: { active: true, cooldown: 0 },
      revealCards: { active: true, cooldown: 0 },
      doublePoints: { active: true, cooldown: 0 },
    });
  }, [difficulty, createGameBoard]);

  const endGame = useCallback(() => {
    setGameOver(true);
    const finalScore = calculateScore(matches, timeLeft, difficulty, scoreMultiplier);
    setScore(finalScore);

    if (finalScore > highScore[difficulty]) {
      const newHighScore = { ...highScore, [difficulty]: finalScore };
      setHighScore(newHighScore);
      try {
        localStorage.setItem("highScore", JSON.stringify(newHighScore));
      } catch (error) {
        console.error("Failed to save high score:", error);
      }
    }

    checkAchievements(finalScore, timeLeft);
    playSound("gameOver");
  }, [matches, timeLeft, difficulty, scoreMultiplier, highScore, checkAchievements, playSound]);

  const handleCardClick = useCallback((cardId) => {
    if (gameOver || flippedCards.length === 2 || isProcessingMatch) return;

    const clickedCard = cards.find((card) => card.id === cardId);
    if (clickedCard.isMatched || flippedCards.includes(cardId)) return;

    playSound("flip");

    setCards((prev) =>
      prev.map((card) =>
        card.id === cardId ? { ...card, isFlipped: true } : card
      )
    );

    setFlippedCards((prev) => [...prev, cardId]);

    if (flippedCards.length === 1) {
      setIsProcessingMatch(true);
      const firstCard = cards.find((card) => card.id === flippedCards[0]);
      const secondCard = clickedCard;

      if (firstCard.emoji === secondCard.emoji) {
        setTimeout(() => {
          playSound("match");
          setCards((prev) =>
            prev.map((card) =>
              card.id === firstCard.id || card.id === secondCard.id
                ? { ...card, isMatched: true }
                : card
            )
          );
          setMatches((prev) => {
            const newMatches = prev + 1;
            if (newMatches === DIFFICULTY_LEVELS[difficulty].pairs) {
              playSound("win");
              endGame();
            }
            return newMatches;
          });
          setTimeLeft((prev) =>
            Math.min(
              prev + DIFFICULTY_LEVELS[difficulty].bonusTime,
              DIFFICULTY_LEVELS[difficulty].time
            )
          );
          setFlippedCards([]);
          setIsProcessingMatch(false);
        }, 500);
      } else {
        setTimeout(() => {
          setCards((prev) =>
            prev.map((card) =>
              card.id === firstCard.id || card.id === secondCard.id
                ? { ...card, isFlipped: false }
                : card
            )
          );
          setFlippedCards([]);
          setIsProcessingMatch(false);
        }, 1000);
      }
    }
  }, [gameOver, flippedCards, isProcessingMatch, cards, difficulty, playSound, endGame]);

  useEffect(() => {
    startNewGame();
  }, [difficulty, startNewGame]);

  useEffect(() => {
    if (!gameOver && !timeFrozen) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          const newTime = prev > 0 ? prev - 1 : 0;
          if (newTime === 0) {
            endGame();
          }
          return newTime;
        });

        setPowerUps((prev) => {
          const updated = { ...prev };
          Object.keys(updated).forEach((key) => {
            if (updated[key].cooldown > 0) {
              updated[key].cooldown -= 1;
              if (updated[key].cooldown === 0) {
                updated[key].active = true;
              }
            }
          });
          return updated;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
}, [gameOver, timeFrozen, endGame]);

const closeTutorial = useCallback(() => {
  setShowTutorial(false);
  try {
    localStorage.setItem("tutorialSeen", "true");
  } catch (error) {
    console.error("Failed to save tutorial state:", error);
  }
}, []);

return (
  <div className="w-full max-w-2xl mx-auto p-4">
    {/* Header */}
    <div className="flex justify-between items-center mb-6">
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <Timer className="w-6 h-6" />
          <span className="text-2xl font-bold">{timeLeft}s</span>
        </div>
        <div className="text-xl">
          Score: {score}
          {scoreMultiplier > 1 && (
            <span className="ml-2 text-yellow-500">x{scoreMultiplier}</span>
          )}
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <button
          onClick={() => setShowTutorial(true)}
          className="p-2 rounded-lg hover:bg-gray-700 transition-colors"
          title="How to Play"
        >
          <HelpCircle />
        </button>
        <button
          onClick={() => setSoundEnabled(!soundEnabled)}
          className="p-2 rounded-lg hover:bg-gray-700 transition-colors"
          title={soundEnabled ? "Mute Sound" : "Enable Sound"}
        >
          {soundEnabled ? <Volume2 /> : <VolumeX />}
        </button>
        <button
          onClick={() => setShowSettings(!showSettings)}
          className="p-2 rounded-lg hover:bg-gray-700 transition-colors"
          title="Settings"
        >
          <Settings />
        </button>
      </div>
    </div>

    {/* Game Board */}
    <div
      className={`grid gap-4 ${
        difficulty === "easy"
          ? "grid-cols-3"
          : difficulty === "medium"
          ? "grid-cols-4"
          : "grid-cols-5"
      } mb-4`}
      role="grid"
      aria-label="Memory Game Board"
    >
      {cards.map((card) => (
        <button
          key={card.id}
          onClick={() => handleCardClick(card.id)}
          className={`aspect-square text-4xl flex items-center justify-center rounded-lg transition-all duration-300 transform 
            ${
              card.isFlipped || card.isMatched
                ? "bg-blue-500 rotate-0"
                : "bg-gray-700 rotate-180"
            } 
            ${card.isMatched ? "bg-green-500" : ""}
            ${!gameOver && !card.isMatched ? "hover:bg-opacity-90" : ""}`}
          disabled={gameOver || card.isMatched}
          aria-label={`Card ${card.id + 1}${
            card.isFlipped || card.isMatched ? `: ${card.emoji}` : ""
          }`}
          aria-pressed={card.isFlipped}
        >
          {(card.isFlipped || card.isMatched) && (
            <span role="img" aria-label={`Emoji: ${card.emoji}`}>
              {card.emoji}
            </span>
          )}
        </button>
      ))}
    </div>

    {/* Power-ups */}
    <div className="mt-4 flex justify-center space-x-4">
      {Object.entries(powerUps).map(([type, { active, cooldown }]) => (
        <PowerUpComponent
          key={type}
          type={type}
          isActive={active}
          cooldown={cooldown}
          onClick={() => handlePowerUp(type)}
        />
      ))}
    </div>

    {/* Hint Button */}
    {!gameOver && timeLeft <= DIFFICULTY_LEVELS[difficulty].time - 5 && (
      <div className="flex justify-center mt-4">
        <button
          onClick={() => setShowHint(true)}
          className="bg-yellow-500 px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={showHint}
        >
          {showHint ? "Hint Used!" : "Show Hint"}
        </button>
      </div>
    )}

    {/* Tutorial Modal */}
    {showTutorial && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-gray-800 p-8 rounded-lg max-w-lg max-h-[80vh] overflow-y-auto">
          <TutorialContent />
          <button
            onClick={closeTutorial}
            className="mt-6 bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors w-full"
          >
            Got it!
          </button>
        </div>
      </div>
    )}

    {/* Settings Modal */}
    {showSettings && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-gray-800 p-8 rounded-lg">
          <h3 className="text-xl mb-4">Difficulty</h3>
          <div className="flex space-x-4 mb-4">
            {Object.keys(DIFFICULTY_LEVELS).map((level) => (
              <button
                key={level}
                onClick={() => {
                  setDifficulty(level);
                  setShowSettings(false);
                  startNewGame();
                }}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  difficulty === level
                    ? "bg-blue-500"
                    : "bg-gray-600 hover:bg-gray-500"
                }`}
              >
                {level.charAt(0).toUpperCase() + level.slice(1)}
              </button>
            ))}
          </div>
          <div className="mb-4">
            <h3 className="text-xl mb-2">High Scores</h3>
            {Object.entries(highScore).map(([level, score]) => (
              <div key={level} className="flex justify-between">
                <span>{level.charAt(0).toUpperCase() + level.slice(1)}:</span>
                <span>{score}</span>
              </div>
            ))}
          </div>
          <div>
            <h3 className="text-xl mb-2">Achievements</h3>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(achievements).map(([achievement, unlocked]) => (
                <div
                  key={achievement}
                  className={`p-2 rounded-lg transition-colors ${
                    unlocked ? "bg-green-600" : "bg-gray-600"
                  }`}
                  title={unlocked ? "Achieved!" : "Not yet achieved"}
                >
                  <Trophy className="inline-block w-4 h-4 mr-2" />
                  {achievement.replace(/([A-Z])/g, " $1").trim()}
                </div>
              ))}
            </div>
          </div>
          <button
            onClick={() => setShowSettings(false)}
            className="mt-4 bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors w-full"
          >
            Close
          </button>
        </div>
      </div>
    )}

    {/* Game Over Modal */}
    {gameOver && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-gray-800 p-8 rounded-lg text-center">
          <h2 className="text-2xl mb-4">Game Over!</h2>
          <p className="mb-2">Score: {score}</p>
          <p className="mb-4">High Score: {highScore[difficulty]}</p>
          <button
            onClick={startNewGame}
            className="flex items-center justify-center space-x-2 bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            <RotateCcw className="w-5 h-5" />
            <span>Play Again</span>
          </button>
        </div>
      </div>
    )}
  </div>
);
}