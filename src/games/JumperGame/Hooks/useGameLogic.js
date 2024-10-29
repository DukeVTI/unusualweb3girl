//Hooks/useGameLogic.js
import { useState, useEffect } from "react";

const GRAVITY = -0.5;
const JUMP_FORCE = 15;

const useGameLogic = () => {
  const [playerPosition, setPlayerPosition] = useState({ x: 100, y: 300 });
  const [velocity, setVelocity] = useState({ x: 0, y: 0 });
  const [isJumping, setIsJumping] = useState(false);

  const handleJump = () => {
    if (!isJumping) {
      setVelocity({ ...velocity, y: JUMP_FORCE });
      setIsJumping(true);
    }
  };

  useEffect(() => {
    const gameLoop = setInterval(() => {
      setVelocity((vel) => ({ x: vel.x, y: vel.y + GRAVITY }));

      setPlayerPosition((pos) => {
        const newY = pos.y + velocity.y;
        if (newY <= 0) {
          setIsJumping(false);
          return { ...pos, y: 0 };
        }
        return { x: pos.x, y: newY };
      });
    }, 16);

    return () => clearInterval(gameLoop);
  }, [velocity]);

  return {
    playerPosition,
    handleJump,
  };
};

export default useGameLogic;