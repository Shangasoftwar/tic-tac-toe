
import "./index.css";
import { useState } from "react";

function App() {
  const [board, setboard] = useState(Array(9).fill(null)); //create 9 empty index
  const [IsXturn, setIsXturn] = useState(true); // set x is first turn
  const winningsquare = [
    [0, 1, 2], //top base
    [3, 4, 5], //middle base
    [6, 7, 8], //bottom base

    [0, 3, 6], //left side
    [1, 4, 7], //middle side
    [2, 5, 8], //right side

    [0, 4, 8], //left_diagonal
    [2, 4, 6], //right_diagonal
  ];
  function getWinner(board) {
    for (let square of winningsquare) {
      const [a, b, c] = square;
      if (board[a] && board[a] === board[b] && board[a] === board[c])
        return board[a];
    }
    return null;
  }
  function handleSquareClick(index) {
    if (board[index] || getWinner(board)) return;
    const updatedBoard = [...board];
    updatedBoard[index] = IsXturn ? "X" : "O";
    setboard(updatedBoard);
    setIsXturn(!IsXturn);
  }
  function getGameStutus() {
    const winner = getWinner(board);
    if (winner) return `Winner ${winner}`;
    if (board.every((square) => square !== null)) {
      return "game over";
    }
    return `Next Player : ${IsXturn ? "X" : "O"}`;
  }
  function resetGame() {
    setboard(Array(9).fill(null));
    setIsXturn(true);
  }

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">
      <div className="w-full max-w-[400px] mx-5">
        <h1 className="text-5xl font-semibold text-white mb-8 text-center">
          Tic Tac toe
        </h1>
        <div
          className={`text-center mb-6 ${
            getWinner(board)
              ? "text-2xl font-bold text-green-400 animate-bounce"
              : "text-xl font-semibold text-white"
          }`}
        >
          {getGameStutus()}
        </div>
        <div className="grid grid-cols-3 gap-1 rounded-xl overflow-hidden mb-6">
          {board.map((square, index) => (
            <button
              key={index}
              onClick={() => handleSquareClick(index)}
              className={`h-32 w-full bg-gray-800 rounded-md text-6xl font-light transition-colors duration-200 hover:bg-gray-700 ${
                square === "X" ? "text-white" : "text-slate-400"
              }`}
            >
              {square}
            </button>
          ))}
        </div>
        <button
          className="w-full py-3 text-lg text-white border rounded-xl hover:bg-gray-50 hover:text-gray-800 transition-colors duration-200"
          onClick={resetGame}
        >
          NEW GAME
        </button>
      </div>
    </div>
  );
}
export default App;
