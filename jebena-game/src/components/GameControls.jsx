import React from 'react';

const GameControls = ({ onReset, onPause }) => {
  return (
    <div className="flex space-x-4 mt-4">
      <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={onReset}>Reset</button>
      <button className="bg-yellow-500 text-white px-4 py-2 rounded" onClick={onPause}>Pause</button>
    </div>
  );
};

export default GameControls;
