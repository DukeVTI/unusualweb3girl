import React, { useState, useEffect, useRef } from 'react';

const WordPuzzleGame = () => {
  const [grid, setGrid] = useState([]);
  const [currentWord, setCurrentWord] = useState('');
  const [selectedCells, setSelectedCells] = useState([]);
  const [foundWords, setFoundWords] = useState(new Set());
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);
  const gridRef = useRef(null);
  
  const levels = {
    1: {
      masterWord: 'MASTER',
      validWords: ['MASTER', 'STEAM', 'TEAM', 'STEM', 'MEAT', 'SEA', 'SAT', 'TAR']
    },
    2: {
      masterWord: 'GARDEN',
      validWords: ['GARDEN', 'RANGE', 'RAGE', 'DEAR', 'READ', 'END', 'EAR']
    }
  };

  // Helper function to get valid neighbor positions
  const getValidNeighbors = (pos, size) => {
    const neighbors = [];
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (i === 0 && j === 0) continue;
        const newRow = pos.row + i;
        const newCol = pos.col + j;
        if (newRow >= 0 && newRow < size && newCol >= 0 && newCol < size) {
          neighbors.push({ row: newRow, col: newCol });
        }
      }
    }
    return neighbors;
  };

  // Helper function to find empty neighbor position
  const findEmptyNeighbor = (pos, grid) => {
    const neighbors = getValidNeighbors(pos, grid.length);
    return neighbors.find(n => grid[n.row][n.col] === '');
  };

  // Helper function to place a word in the grid
  const placeWord = (word, grid, startPos) => {
    let currentPos = startPos;
    const positions = [startPos];
    const letters = word.split('');
    
    for (let i = 1; i < letters.length; i++) {
      const nextPos = findEmptyNeighbor(currentPos, grid);
      if (!nextPos) return null;
      
      positions.push(nextPos);
      currentPos = nextPos;
    }
    
    // If we successfully found positions for all letters, place them
    letters.forEach((letter, i) => {
      grid[positions[i].row][positions[i].col] = letter;
    });
    
    return positions;
  };

  const initializeGrid = () => {
    const { masterWord, validWords } = levels[level];
    const size = Math.max(4, Math.ceil(Math.sqrt(masterWord.length + 4)));
    const letters = Array(size).fill().map(() => Array(size).fill(''));
    
    // Sort words by length (longest first)
    const sortedWords = [...validWords].sort((a, b) => b.length - a.length);
    
    // Try to place each word
    sortedWords.forEach(word => {
      let placed = false;
      let attempts = 0;
      const maxAttempts = 50;

      while (!placed && attempts < maxAttempts) {
        // Find a random empty position
        const emptyPositions = [];
        letters.forEach((row, i) => {
          row.forEach((cell, j) => {
            if (cell === '') {
              emptyPositions.push({ row: i, col: j });
            }
          });
        });

        if (emptyPositions.length === 0) break;

        const startPos = emptyPositions[Math.floor(Math.random() * emptyPositions.length)];
        const result = placeWord(word, letters, startPos);
        
        if (result) {
          placed = true;
        }
        
        attempts++;
      }
    });
    
    // Fill remaining empty spaces with random letters
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        if (!letters[i][j]) {
          letters[i][j] = alphabet[Math.floor(Math.random() * alphabet.length)];
        }
      }
    }
    
    setGrid(letters);
  };

  useEffect(() => {
    initializeGrid();
  }, [level]);

  // Rest of the component remains the same...
  const getCellFromTouch = (touch) => {
    const grid = gridRef.current;
    if (!grid) return null;

    const rect = grid.getBoundingClientRect();
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;
    
    const padding = 4;
    const size = grid.children.length;
    const cellWidth = rect.width / size;
    const cellHeight = rect.height / size;
    
    const row = Math.floor(y / cellHeight);
    const col = Math.floor(x / cellWidth);
    
    const cellX = x - (col * cellWidth);
    const cellY = y - (row * cellHeight);
    
    if (row >= 0 && row < size && col >= 0 && col < size &&
        cellX >= padding && cellX <= cellWidth - padding &&
        cellY >= padding && cellY <= cellHeight - padding) {
      return { row, col };
    }
    return null;
  };

  const handleTouchStart = (e) => {
    if (isAnimating) return;
    e.preventDefault();
    const touch = e.touches[0];
    const pos = getCellFromTouch(touch);
    
    if (pos) {
      setSelectedCells([pos]);
      setCurrentWord(grid[pos.row][pos.col]);
    }
  };

  const handleTouchMove = (e) => {
    if (isAnimating) return;
    e.preventDefault();
    const touch = e.touches[0];
    const pos = getCellFromTouch(touch);
    
    if (pos && selectedCells.length > 0) {
      const lastCell = selectedCells[selectedCells.length - 1];
      const rowDiff = Math.abs(lastCell.row - pos.row);
      const colDiff = Math.abs(lastCell.col - pos.col);
      
      if (rowDiff <= 1 && colDiff <= 1 && 
          !selectedCells.some(cell => cell.row === pos.row && cell.col === pos.col)) {
        setSelectedCells(prev => [...prev, pos]);
        setCurrentWord(prev => prev + grid[pos.row][pos.col]);
      }
    }
  };

  const handleTouchEnd = () => {
    if (isAnimating) return;
    validateWord();
  };

  const validateWord = async () => {
    const { validWords } = levels[level];
    const isValid = validWords.includes(currentWord) && !foundWords.has(currentWord);

    setIsAnimating(true);

    if (isValid) {
      const cells = selectedCells.map(({ row, col }) => 
        document.querySelector(`[data-position="${row}-${col}"]`)
      );
      
      cells.forEach(cell => {
        if (cell) {
          cell.classList.add('animate-success');
        }
      });

      await new Promise(resolve => setTimeout(resolve, 500));
      
      setFoundWords(prev => new Set([...prev, currentWord]));
      setScore(prev => prev + (currentWord.length * 10));
      
      if (validWords.every(word => foundWords.has(word))) {
        setLevel(prev => prev + 1);
      }
    } else {
      const cells = selectedCells.map(({ row, col }) => 
        document.querySelector(`[data-position="${row}-${col}"]`)
      );
      
      cells.forEach(cell => {
        if (cell) {
          cell.classList.add('animate-failure');
        }
      });

      await new Promise(resolve => setTimeout(resolve, 500));
    }

    const cells = document.querySelectorAll('.animate-success, .animate-failure');
    cells.forEach(cell => {
      cell.classList.remove('animate-success', 'animate-failure');
    });

    setCurrentWord('');
    setSelectedCells([]);
    setIsAnimating(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 p-4">
      <div className="max-w-md mx-auto bg-white/90 rounded-3xl shadow-xl backdrop-blur p-6">
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div className="bg-indigo-50 p-3 rounded-xl">
              <div className="text-sm text-indigo-400 font-medium">SCORE</div>
              <div className="text-2xl font-bold text-indigo-600">{score}</div>
            </div>
            
            <div className="bg-purple-50 p-3 rounded-xl">
              <div className="text-sm text-purple-400 font-medium">LEVEL</div>
              <div className="text-2xl font-bold text-purple-600">{level}</div>
            </div>
          </div>

          <div className="h-12 flex items-center justify-center">
            <span className={`text-2xl font-bold transition-all duration-300 ${
              currentWord ? 'text-pink-600 scale-110' : 'text-transparent'
            }`}>
              {currentWord || 'WORD'}
            </span>
          </div>

          <div 
            ref={gridRef}
            className="aspect-square grid gap-2 touch-none select-none"
            style={{ 
              gridTemplateColumns: `repeat(${grid.length}, minmax(0, 1fr))`
            }}
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
                      rounded-xl flex items-center justify-center
                      text-xl font-bold shadow-lg transition-all duration-150
                      ${isSelected 
                        ? 'bg-pink-500 text-white transform scale-105' 
                        : 'bg-white text-indigo-900 hover:bg-pink-50'
                      }
                    `}
                  >
                    {letter}
                  </div>
                );
              })
            ))}
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-3 text-indigo-900">Find these words:</h3>
            <div className="flex flex-wrap gap-2">
              {levels[level].validWords.map((word) => (
                <span
                  key={word}
                  className={`
                    px-3 py-1 rounded-full text-sm font-medium transition-all duration-300
                    ${foundWords.has(word)
                      ? 'bg-green-100 text-green-800'
                      : word.length === levels[level].masterWord.length
                      ? 'bg-indigo-100 text-indigo-800 border-2 border-indigo-200'
                      : 'bg-gray-100 text-gray-400'
                    }
                  `}
                >
                  {foundWords.has(word) ? word : '•'.repeat(word.length)}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .animate-success {
          animation: success 0.5s ease-out;
        }

        .animate-failure {
          animation: failure 0.5s ease-out;
        }

        @keyframes success {
          0% { transform: scale(1); }
          50% { transform: scale(1.2); background-color: #22c55e; }
          100% { transform: scale(1); }
        }

        @keyframes failure {
          0% { transform: translateX(0); }
          25% { transform: translateX(-8px); }
          75% { transform: translateX(8px); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
};

export default WordPuzzleGame;