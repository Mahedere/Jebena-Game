import React, { useEffect, useRef, useState } from 'react';
import './Jebena.css';

function JebenaGame() {
  const jebenaRef = useRef(null);
  const ciniRef = useRef(null);

  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isGameStarted, setIsGameStarted] = useState(false);

  const jump = () => {
    if (jebenaRef.current && !jebenaRef.current.classList.contains('jump')) {
      jebenaRef.current.classList.add('jump');
      setTimeout(() => {
        jebenaRef.current.classList.remove('jump');
      }, 300);
    }
  };

  useEffect(() => {
    if (isGameStarted) {
      const isAlive = setInterval(() => {
        const jebenaTop = parseInt(
          getComputedStyle(jebenaRef.current).getPropertyValue('top'),
          10
        );
        const ciniLeft = parseInt(
          getComputedStyle(ciniRef.current).getPropertyValue('left'),
          10
        );

        if (ciniLeft < 40 && ciniLeft > 0 && jebenaTop >= 140) {
          setIsGameOver(true);
          setIsGameStarted(false);
        } else {
          setScore((prevScore) => prevScore + 1);
        }
      }, 10);

      return () => clearInterval(isAlive);
    }
  }, [isGameStarted]);

  useEffect(() => {
    const handleJump = (e) => {
      if (e.code === 'Space' || e.type === 'touchstart') {
        jump();
      }
    };

    if (isGameStarted) {
      document.addEventListener('keydown', handleJump);
      document.addEventListener('touchstart', handleJump);
    }

    return () => {
      document.removeEventListener('keydown', handleJump);
      document.removeEventListener('touchstart', handleJump);
    };
  }, [isGameStarted]);

  const startGame = () => {
    setIsGameStarted(true);
    setIsGameOver(false);
    setScore(0);
  };

  return (
    <div className="game">
      {isGameStarted ? (
        <>
          <div className="score">Score: {score}</div>
          <div id="jebena" ref={jebenaRef}></div>
          <div id="cini" ref={ciniRef}></div>
        </>
      ) : (
        <div className="start-screen">
          {isGameOver ? (
            <>
              <div class="game-over-container">
                <h1 class="game-over-text">Game Over</h1>
                <p class="score-text">Your Score: <span id="score">{score}</span></p>
              </div>
              <button className="restart-button" onClick={startGame}>Restart</button>
            </>
          ) : (
            <button className="start-button" onClick={startGame}>Start Game</button>
          )}
        </div>
      )}
    </div>
  );
}

export default JebenaGame;
