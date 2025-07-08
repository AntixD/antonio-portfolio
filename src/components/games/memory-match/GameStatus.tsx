import React from 'react';
import { Timer, Move, RotateCcw } from 'lucide-react';

interface GameStatusProps {
  moves: number;
  timeElapsed: number;
  isComplete: boolean;
  onNewGame: () => void;
}

export const GameStatus: React.FC<GameStatusProps> = ({
  moves,
  timeElapsed,
  isComplete,
  onNewGame,
}) => {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
      {isComplete ? (
        <div className="text-center space-y-4">
          <div className="text-3xl">🎉</div>
          <div className="text-2xl font-bold text-green-400">
            Congratulations!
          </div>
          <div className="text-gray-300">
            You found all matches in {moves} moves and {formatTime(timeElapsed)}
            !
          </div>
          <button
            onClick={onNewGame}
            className="flex items-center gap-2 mx-auto bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-full font-semibold hover:scale-105 transition-transform duration-300"
          >
            <RotateCcw className="w-4 h-4" />
            Play Again
          </button>
        </div>
      ) : (
        <div className="flex justify-around">
          <div className="text-center">
            <div className="flex items-center gap-2 text-gray-400 mb-2">
              <Move className="w-4 h-4" />
              <span className="text-sm">Moves</span>
            </div>
            <div className="text-2xl font-bold text-cyan-400">{moves}</div>
          </div>
          <div className="text-center">
            <div className="flex items-center gap-2 text-gray-400 mb-2">
              <Timer className="w-4 h-4" />
              <span className="text-sm">Time</span>
            </div>
            <div className="text-2xl font-bold text-pink-400">
              {formatTime(timeElapsed)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
