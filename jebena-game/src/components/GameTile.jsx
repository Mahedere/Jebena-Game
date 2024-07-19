import React from 'react';

const GameTile = ({ tile, onClick }) => {
  return (
    <div className="bg-gray-300 border border-black flex items-center justify-center h-24 w-24" onClick={onClick}>
      {tile.value}
    </div>
  );
};

export default GameTile;
