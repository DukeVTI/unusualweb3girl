//Player.jsx
import React from "react";

const Player = ({ position }) => {
  const style = {
    position: "absolute",
    width: "50px",
    height: "50px",
    backgroundColor: "blue",
    left: `${position.x}px`,
    bottom: `${position.y}px`,
  };

  return <div style={style} />;
};

export default Player;