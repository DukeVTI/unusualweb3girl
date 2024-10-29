import React, { useState, useEffect } from 'react';

const SplashScreen = ({ onComplete }) => {
  const [loading, setLoading] = useState(0);
  const [showPressKey, setShowPressKey] = useState(false);
  const emojis = ['🎮', '🎲', '🎯', '🎪'];
  const [currentEmoji, setCurrentEmoji] = useState(0);

  // Handle loading progress
  useEffect(() => {
    const timer = setInterval(() => {
      setLoading(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setShowPressKey(true);
          return 100;
        }
        return prev + 5;
      });
    }, 150);

    return () => clearInterval(timer);
  }, []);

  // Rotating emojis effect
  useEffect(() => {
    const emojiTimer = setInterval(() => {
      setCurrentEmoji(prev => (prev + 1) % emojis.length);
    }, 600);

    return () => clearInterval(emojiTimer);
  }, []);

  // Handle key press to continue
  useEffect(() => {
    if (showPressKey) {
      const handleKeyPress = () => {
        onComplete();
      };
      window.addEventListener('keydown', handleKeyPress);
      return () => window.removeEventListener('keydown', handleKeyPress);
    }
  }, [showPressKey, onComplete]);

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-500 to-purple-600">
      {/* Title and Emoji */}
      <div className="text-center mb-12">
        <div className="text-6xl mb-4 animate-bounce">
          {emojis[currentEmoji]}
        </div>
        <h1 className="text-4xl font-bold text-white mb-2">
          Emoji Match
        </h1>
        <p className="text-lg text-white opacity-80">
          Test your memory!
        </p>
      </div>

      {/* Loading Bar */}
      <div className="w-64 h-4 bg-white/20 rounded-full overflow-hidden mb-8">
        <div 
          className="h-full bg-white rounded-full transition-all duration-300 ease-out"
          style={{ width: `${loading}%` }}
        />
      </div>

      {/* Loading Text */}
      <div className="text-white text-lg mb-8">
        {loading < 100 ? (
          <span>Loading... {loading}%</span>
        ) : (
          <span className={`animate-pulse ${showPressKey ? 'opacity-100' : 'opacity-0'}`}>
            Press Any Key to Start
          </span>
        )}
      </div>

      {/* Click to Start (mobile support) */}
      {showPressKey && (
        <button
          onClick={onComplete}
          className="mt-4 text-sm text-white/60 hover:text-white/80 transition-colors"
        >
          Tap here on mobile devices
        </button>
      )}
    </div>
  );
};

export default SplashScreen;