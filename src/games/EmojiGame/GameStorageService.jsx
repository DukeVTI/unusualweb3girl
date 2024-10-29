// Constants for storage keys
const STORAGE_KEYS = {
  HIGH_SCORES: 'emojiMatch_highScores',
  PLAYER_PREFERENCES: 'emojiMatch_preferences',
};

// Structure to store high scores by difficulty
const DEFAULT_HIGH_SCORES = {
  easy: [],
  medium: [],
  high: [],
};

// Structure to store player preferences
const DEFAULT_PREFERENCES = {
  playerName: '',
  lastTheme: 'animals',
  lastDifficulty: 'medium',
};

class GameStorageService {
  static getHighScores() {
    try {
      const scores = localStorage.getItem(STORAGE_KEYS.HIGH_SCORES);
      return scores ? JSON.parse(scores) : DEFAULT_HIGH_SCORES;
    } catch (error) {
      console.error('Error reading high scores:', error);
      return DEFAULT_HIGH_SCORES;
    }
  }

  static saveHighScore(difficulty, score) {
    try {
      const scores = this.getHighScores();
      const difficultyScores = scores[difficulty] || [];
      
      // Add new score
      difficultyScores.push({
        ...score,
        date: new Date().toISOString(),
      });

      // Sort by moves (ascending) and then by time (ascending)
      difficultyScores.sort((a, b) => {
        if (a.moves !== b.moves) {
          return a.moves - b.moves;
        }
        return a.time - b.time;
      });

      // Keep only top 10 scores
      scores[difficulty] = difficultyScores.slice(0, 10);

      localStorage.setItem(STORAGE_KEYS.HIGH_SCORES, JSON.stringify(scores));
      return scores;
    } catch (error) {
      console.error('Error saving high score:', error);
      return this.getHighScores();
    }
  }

  static getPlayerPreferences() {
    try {
      const prefs = localStorage.getItem(STORAGE_KEYS.PLAYER_PREFERENCES);
      return prefs ? JSON.parse(prefs) : DEFAULT_PREFERENCES;
    } catch (error) {
      console.error('Error reading player preferences:', error);
      return DEFAULT_PREFERENCES;
    }
  }

  static savePlayerPreferences(preferences) {
    try {
      const currentPrefs = this.getPlayerPreferences();
      const updatedPrefs = {
        ...currentPrefs,
        ...preferences,
      };
      localStorage.setItem(STORAGE_KEYS.PLAYER_PREFERENCES, JSON.stringify(updatedPrefs));
      return updatedPrefs;
    } catch (error) {
      console.error('Error saving player preferences:', error);
      return this.getPlayerPreferences();
    }
  }

  static clearAllData() {
    try {
      localStorage.removeItem(STORAGE_KEYS.HIGH_SCORES);
      localStorage.removeItem(STORAGE_KEYS.PLAYER_PREFERENCES);
      return true;
    } catch (error) {
      console.error('Error clearing data:', error);
      return false;
    }
  }
}

export default GameStorageService;