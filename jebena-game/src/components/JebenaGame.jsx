import React, { useEffect, useRef, useState } from 'react';
import './Jebena.css';

function JebenaGame() {
  const jebenaRef = useRef(null);
  const ciniRef = useRef(null);
  const [score, setScore] = useState(0);

  const jump = () => {
    if (jebenaRef.current && !jebenaRef.current.classList.contains('jump')) {
      jebenaRef.current.classList.add('jump');
      setTimeout(() => {
        jebenaRef.current.classList.remove('jump');
      }, 300);
    }
  };

  useEffect(() => {
    const isAlive = setInterval(() => {
      // get current jebena Y position
      const jebenaTop = parseInt(
        getComputedStyle(jebenaRef.current).getPropertyValue('top'),
        10
      );

      // get current cini X position
      const ciniLeft = parseInt(
        getComputedStyle(ciniRef.current).getPropertyValue('left'),
        10
      );

      // detect collision
      if (ciniLeft < 40 && ciniLeft > 0 && jebenaTop >= 140) {
        // collision
        alert(`Game Over! Your Score: ${score}`);
        setScore(0);
      } else {
        setScore((prevScore) => prevScore + 1);
      }
    }, 10);

    return () => clearInterval(isAlive);
  }, [score]);

  useEffect(() => {
    document.addEventListener('keydown', jump);
    return () => document.removeEventListener('keydown', jump);
  }, []);

  return (
    <div className="game">
      Score: {score}
      <div id="jebena" ref={jebenaRef}></div>
      <div id="cini" ref={ciniRef}></div>
    </div>
  );
}

export default JebenaGame;
