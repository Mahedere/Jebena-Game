import React from 'react';

const GameHeader = ({ title }) => {
  return (
    <header className="bg-gray-800 text-white py-4">
      <h1 className="text-2xl font-bold text-center">{title}</h1>
    </header>
  );
};

export default GameHeader;
