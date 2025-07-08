import React from 'react';
import { RotateCcw } from 'lucide-react';
import { TicTacToeBoard, TicTacToeWinner } from '@/types/games';

interface GameBoardProps {
  board: TicTacToeBoard;
  winner: TicTacToeWinner;
  isPlayerTurn: boolean;
  isAiThinking: boolean;
  gameMode: string;
  onCellClick: (index: number) => void;
  onReset: () => void;
}

export const GameBoard: React.FC<GameBoardProps> = ({
  board,
  winner,
  isPlayerTurn,
  isAiThinking,
  gameMode,
  onCellClick,
  onReset,
}) => {
  return (
    <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
      <div className="text-center mb-6">
        {winner ? (
          <div className="space-y-2">
            <div className="text-2xl font-bold">
              {winner === 'X' && (
                <span className="text-green-400">🎉 You Won! Amazing!</span>
              )}
              {winner === 'O' && (
                <span className="text-red-400">🤖 AI Wins! Try Again?</span>
              )}
              {winner === 'draw' && (
                <span className="text-yellow-400">🤝 It's a Draw!</span>
              )}
            </div>
            <button
              onClick={onReset}
              className="flex items-center gap-2 mx-auto bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full font-semibold hover:scale-105 transition-transform duration-300"
            >
              <RotateCcw className="w-4 h-4" />
              Play Again
            </button>
          </div>
        ) : (
          <div className="space-y-2">
            <div className="text-xl font-bold">
              {isAiThinking ? (
                <span className="text-blue-400 animate-pulse">
                  🤖 AI is thinking...
                </span>
              ) : isPlayerTurn ? (
                <span className="text-cyan-400">Your turn! (X)</span>
              ) : (
                <span className="text-orange-400">AI's turn (O)</span>
              )}
            </div>
            <div className="text-sm text-gray-400">
              Mode: <span className="capitalize font-semibold">{gameMode}</span>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-3 gap-2 max-w-xs mx-auto">
        {board.map((cell, index) => (
          <button
            key={index}
            onClick={() => onCellClick(index)}
            disabled={!!cell || !!winner || !isPlayerTurn || isAiThinking}
            className={`aspect-square bg-gray-800 border-2 border-gray-700 rounded-lg text-4xl font-bold transition-all duration-300 transform hover:scale-105 disabled:cursor-not-allowed ${
              !cell && !winner && isPlayerTurn && !isAiThinking
                ? 'hover:bg-gray-700 hover:border-cyan-400'
                : ''
            }`}
          >
            <span
              className={
                cell === 'X'
                  ? 'text-cyan-400'
                  : cell === 'O'
                  ? 'text-orange-400'
                  : ''
              }
            >
              {cell}
            </span>
          </button>
        ))}
      </div>

      <div className="text-center mt-6">
        <button
          onClick={onReset}
          className="flex items-center gap-2 mx-auto text-gray-400 hover:text-white transition-colors duration-300"
        >
          <RotateCcw className="w-4 h-4" />
          Reset Game
        </button>
      </div>
    </div>
  );
};
