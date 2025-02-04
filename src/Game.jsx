import { useState } from "react";

const colors = ["red", "blue", "green", "yellow", "purple", "orange"];

export default function Game() {
  const [targetColor, setTargetColor] = useState(colors[Math.floor(Math.random() * colors.length)]);
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState("Guess the correct color!");

  const checkColor = (color) => {
    if (color === targetColor) {
      setMessage("✅ Correct!");
      setScore(score + 1);
    } else {
      setMessage("❌ Wrong! Try again.");
    }
  };

  const resetGame = () => {
    setTargetColor(colors[Math.floor(Math.random() * colors.length)]);
    setMessage("Guess the correct color!");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center">
      <h1 className="text-3xl font-bold mb-4">Color Guessing Game</h1>
      <div data-testid="colorBox" className="w-24 h-24 mb-4 rounded-lg" style={{ backgroundColor: targetColor }}></div>
      <p data-testid="gameInstructions">{message}</p>
      <div className="flex gap-4 my-4">
        {colors.map((color, index) => (
          <button
            key={index}
            data-testid="colorOption"
            className="w-16 h-16 rounded-lg border-2"
            style={{ backgroundColor: color }}
            onClick={() => checkColor(color)}
          ></button>
        ))}
      </div>
      <p data-testid="score">Score: {score}</p>
      <button
        data-testid="newGameButton"
        className="px-4 py-2 bg-blue-500 text-white rounded-lg mt-4"
        onClick={resetGame}
      >
        New Game
      </button>
    </div>
  );
}