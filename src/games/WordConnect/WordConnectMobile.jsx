import React, { useState, useEffect, useRef } from 'react';

const WordConnectMobile = () => {
  const [grid, setGrid] = useState([]);
  const [currentWord, setCurrentWord] = useState('');
  const [selectedCells, setSelectedCells] = useState([]);
  const [foundWords, setFoundWords] = useState([]);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [streak, setStreak] = useState(0);
  const [touchStartPos, setTouchStartPos] = useState(null);
  const gridRef = useRef(null);
  
  const validWords = {
    3: new Set(['CAT', 'HAT', 'RAT']),
    4: new Set(['BATH', 'CHAT', 'THAT']),
    5: new Set(['CHART', 'HEART'])
  };

  useEffect(() => {
    initializeGrid();
  }, [level]);

  const initializeGrid = () => {
    const letters = [
      ['C', 'A', 'T', 'B'],
      ['H', 'R', 'S', 'M'],
      ['A', 'T', 'A', 'T'],
      ['T', 'B', 'T', 'S']
    ];
    setGrid(letters);
  };

  const getCellFromTouch = (touch) => {
    const grid = gridRef.current;
    if (!grid) return null;

    const rect = grid.getBoundingClientRect();
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;
    
    // Add padding to cell detection area
    const padding = 4; // pixels
    const cellWidth = rect.width / 4;
    const cellHeight = rect.height / 4;
    
    const row = Math.floor(y / cellHeight);
    const col = Math.floor(x / cellWidth);
    
    // Check if touch is within the cell's active area (excluding padding)
    const cellX = x - (col * cellWidth);
    const cellY = y - (row * cellHeight);
    
    if (row >= 0 && row < 4 && col >= 0 && col < 4 &&
        cellX >= padding && cellX <= cellWidth - padding &&
        cellY >= padding && cellY <= cellHeight - padding) {
      return { row, col };
    }
    return null;
  };

  const isAdjacent = (newPos, prevPos) => {
    if (!prevPos) return true;
    
    const rowDiff = Math.abs(prevPos.row - newPos.row);
    const colDiff = Math.abs(prevPos.col - newPos.col);
    
    return rowDiff <= 1 && colDiff <= 1 && 
           !selectedCells.some(cell => cell.row === newPos.row && cell.col === newPos.col);
  };

  const handleTouchStart = (e) => {
    e.preventDefault();
    const touch = e.touches[0];
    const pos = getCellFromTouch(touch);
    
    if (pos) {
      setTouchStartPos(pos);
      setSelectedCells([pos]);
      setCurrentWord(grid[pos.row][pos.col]);
    }
  };

  const handleTouchMove = (e) => {
    e.preventDefault();
    const touch = e.touches[0];
    const pos = getCellFromTouch(touch);
    
    if (pos && touchStartPos) {
      // Only add new cell if it's adjacent to the last selected cell
      const lastCell = selectedCells[selectedCells.length - 1];
      if (isAdjacent(pos, lastCell) && 
          (pos.row !== lastCell.row || pos.col !== lastCell.col)) {
        setSelectedCells(prev => [...prev, pos]);
        setCurrentWord(prev => prev + grid[pos.row][pos.col]);
      }
    }
  };

  const handleTouchEnd = () => {
    validateWord();
    setTouchStartPos(null);
  };

  const validateWord = () => {
    const isValid = Object.values(validWords).some(wordSet => 
      wordSet.has(currentWord) && !foundWords.includes(currentWord)
    );

    if (isValid) {
      const points = currentWord.length * 10;
      setScore(prev => prev + points);
      setFoundWords(prev => [...prev, currentWord]);
      setStreak(prev => prev + 1);
      
      // Animate valid word
      selectedCells.forEach(({ row, col }) => {
        const cell = document.querySelector(`[data-position="${row}-${col}"]`);
        if (cell) {
          cell.classList.add('animate-bounce', 'bg-green-500');
          setTimeout(() => {
            cell.classList.remove('animate-bounce', 'bg-green-500');
          }, 500);
        }
      });
    }
    
    setCurrentWord('');
    setSelectedCells([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 to-purple-100 p-4">
      <div className="max-w-md mx-auto bg-white/90 rounded-2xl shadow-xl backdrop-blur p-6">
        <div className="space-y-6">
          {/* Game Header */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2 bg-pink-50 p-3 rounded-xl">
              <svg 
                className="w-6 h-6 text-pink-500"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
                <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
                <path d="M4 22h16" />
                <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
                <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
                <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
              </svg>
              <span className="text-2xl font-bold text-pink-700">{score}</span>
            </div>
            
            <div className="flex items-center gap-2 bg-purple-50 p-3 rounded-xl">
              <svg
                className="w-6 h-6 text-purple-500"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
              <span className="text-xl text-purple-700">Level {level}</span>
            </div>
          </div>

          {/* Current Word Display */}
          <div className="h-8 text-center">
            <span className="text-xl font-bold text-pink-600">
              {currentWord}
            </span>
          </div>

          {/* Game Grid */}
          <div 
            ref={gridRef}
            className="grid grid-cols-4 gap-3 touch-none select-none"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {grid.map((row, rowIndex) => (
              row.map((letter, colIndex) => {
                const isSelected = selectedCells.some(
                  cell => cell.row === rowIndex && cell.col === colIndex
                );
                return (
                  <div
                    key={`${rowIndex}-${colIndex}`}
                    data-position={`${rowIndex}-${colIndex}`}
                    className={`
                      w-14 h-14 rounded-2xl flex items-center justify-center
                      text-2xl font-bold shadow-lg transition-all duration-150
                      ${isSelected 
                        ? 'bg-pink-500 text-white transform scale-105' 
                        : 'bg-white hover:bg-pink-50'
                      }
                    `}
                  >
                    {letter}
                  </div>
                );
              })
            ))}
          </div>

          {/* Found Words */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-3 text-purple-800">Found Words:</h3>
            <div className="flex flex-wrap gap-3">
              {Object.entries(validWords).map(([length, words]) => (
                <div key={length} className="w-full">
                  <div className="text-sm text-pink-600 mb-2">{length} Letters</div>
                  <div className="flex flex-wrap gap-2">
                    {Array.from(words).map((word) => (
                      <span
                        key={word}
                        className={`
                          px-3 py-1 rounded-full text-sm font-medium
                          ${foundWords.includes(word)
                            ? 'bg-purple-100 text-purple-800'
                            : 'bg-gray-100 text-gray-400'
                          }
                        `}
                      >
                        {word}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WordConnectMobile;