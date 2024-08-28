"use client";

import { useState } from "react";
import Confetti from "react-confetti";

export default function Home() {
  // Game state
  const [guess, setGuess] = useState("");
  const [message, setMessage] = useState("");
  const [attempts, setAttempts] = useState(100); // Example: 100 attempts
  const [isDay, setIsDay] = useState(true); // Day mode initially
  const [correctNumber, setCorrectNumber] = useState(generateRandomNumber()); // Random correct number
  const [showConfetti, setShowConfetti] = useState(false);

  function generateRandomNumber() {
    return Math.floor(Math.random() * 10) + 1; // Random number between 1 and 10
  }

  const handleGuess = () => {
    const parsedGuess = parseInt(guess, 10);
    if (isNaN(parsedGuess)) {
      setMessage("Please enter a valid number.");
      return;
    }

    if (parsedGuess < 1 || parsedGuess > 10) {
      setMessage("Please enter a number between 1 and 10.");
      return;
    }

    if (attempts > 0) {
      if (parsedGuess === correctNumber) {
        setMessage("Congratulations! You guessed the correct number!");
        setShowConfetti(true); // Show confetti on correct guess
        setAttempts(0); // End game
      } else {
        setMessage("Incorrect guess, try again!");
        setAttempts(attempts - 1);
      }
    } else {
      setMessage("No attempts left :(");
    }
  };

  const handleRandomize = () => {
    setGuess(generateRandomNumber().toString());
  };

  const handleModeChange = () => {
    setIsDay(!isDay);
    setCorrectNumber(generateRandomNumber()); // Randomize correct number when switching modes
  };

  const handleNewGame = () => {
    setShowConfetti(false); // Hide confetti when starting a new game
    setGuess("");
    setMessage("");
    setAttempts(100); // Reset attempts
    setCorrectNumber(generateRandomNumber()); // Randomize correct number for new game
  };

  return (
    <main className={`flex min-h-screen flex-col items-center justify-center p-24 ${isDay ? 'bg-[#f7ede8]' : 'bg-[#200052]'}`}>
      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          colors={['#836ef9', '#5feddf', '#a0055d', '#61004f']}
        />
      )}
      
      <div className="flex flex-col items-center">
        <h1 className={`text-4xl font-bold mb-8 ${isDay ? 'text-[#200052]' : 'text-[#f7ede8]'}`}>
          Giveaway Game
        </h1>
        
        <div className="flex flex-col items-center mb-8">
          <div className="flex items-center space-x-2">
            <input
              type="number"
              value={guess}
              onChange={(e) => setGuess(e.target.value)}
              placeholder="#"
              min="1"
              max="10"
              className={`p-2 border rounded ${isDay ? 'border-[#5feddf] text-[#200052]' : 'border-[#f7ede8] text-[#200052]'}`}
            />
            <button
              onClick={handleRandomize}
              className="px-4 py-2 bg-[#5feddf] text-white rounded hover:bg-[#836ef9]"
            >
              Randomize
            </button>
          </div>
          <button
            onClick={handleGuess}
            className="mt-4 px-4 py-2 bg-[#836ef9] text-white rounded hover:bg-[#5feddf]"
          >
            Guess
          </button>
          <p className="mt-4 text-lg text-[#a0055d]">{message}</p>
          <p className="mt-2 text-sm text-[#61004f]">
            Attempts left: {attempts}
          </p>
        </div>
        
        <button
          onClick={handleModeChange}
          className="fixed bottom-8 right-8 px-4 py-2 bg-[#836ef9] text-white rounded hover:bg-[#5feddf]"
        >
          {isDay ? 'Night' : 'Day'}
        </button>
      </div>
    </main>
  );
}
