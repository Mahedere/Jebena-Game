import React from 'react';
import GameBoard from './components/GameBoard';
import GameControls from './components/GameControls';
import GameHeader from './components/GameHeader';
import './App.css';

const App = () => {
  const resetGame = () => {
    // Reset game logic
  };

  const pauseGame = () => {
    // Pause game logic
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      <GameHeader title="Jebena Game" />
      <GameBoard />
      <GameControls onReset={resetGame} onPause={pauseGame} />
    </div>
  );
};

export default App;
