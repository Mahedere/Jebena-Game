import React, { useEffect, useRef, useState } from 'react';
import './Jebena.css';

function JebenaGame() {
  // Create references for the jebena and cini elements
  const jebenaRef = useRef(null);
  const ciniRef = useRef(null);

  // Initialize the score state
  const [score, setScore] = useState(0);

  // Function to handle the jump action
  const jump = () => {
    // Check if the jebena element exists and doesn't already have the 'jump' class
    if (jebenaRef.current && !jebenaRef.current.classList.contains('jump')) {
      // Add the 'jump' class to the jebena element to trigger the jump animation
      jebenaRef.current.classList.add('jump');
      // Remove the 'jump' class after 300 milliseconds to complete the jump animation
      setTimeout(() => {
        jebenaRef.current.classList.remove('jump');
      }, 300);
    }
  };

  useEffect(() => {
    // Set up an interval to check the game state every 10 milliseconds
    const isAlive = setInterval(() => {
      // Get the current top position of the jebena element
      const jebenaTop = parseInt(
        getComputedStyle(jebenaRef.current).getPropertyValue('top'),
        10
      );

      // Get the current left position of the cini element
      const ciniLeft = parseInt(
        getComputedStyle(ciniRef.current).getPropertyValue('left'),
        10
      );

      // Detect collision between jebena and cini
      if (ciniLeft < 40 && ciniLeft > 0 && jebenaTop >= 140) {
        // If collision is detected, show an alert with the current score and reset the score
        alert(`Game Over! Your Score: ${score}`);
        setScore(0);
      } else {
        // If no collision, increment the score
        setScore((prevScore) => prevScore + 1);
      }
    }, 10); // Interval runs every 10 milliseconds

    // Cleanup function to clear the interval when the component is unmounted
    return () => clearInterval(isAlive);
  }, [score]); // Dependency array includes score to re-run the effect when score changes

  useEffect(() => {
    // Add event listener for 'keydown' event to trigger jump
    document.addEventListener('keydown', jump);
    // Cleanup function to remove the event listener when the component is unmounted
    return () => document.removeEventListener('keydown', jump);
  }, []); // Empty dependency array means this effect runs only once after initial render

  return (
    <div className="game">
      {/* Display the current score */}
      Score: {score}
      {/* Render the jebena and cini elements */}
      <div id="jebena" ref={jebenaRef}></div>
      <div id="cini" ref={ciniRef}></div>
    </div>
  );
}

export default JebenaGame;
