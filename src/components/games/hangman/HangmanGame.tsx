import React from 'react';
import { RotateCcw, Lightbulb } from 'lucide-react';
import { HangmanGameState } from '@/types/games';

interface HangmanGameProps {
  gameState: HangmanGameState;
  onNewGame: () => void;
  onToggleHint: () => void;
}

export const HangmanGame: React.FC<HangmanGameProps> = ({
  gameState,
  onNewGame,
  onToggleHint,
}) => {
  const { gameStatus, currentWord, hint, showHint } = gameState;

  return (
    <div className="text-center bg-gray-900/50 rounded-xl p-6 border border-gray-800">
      {gameStatus === 'won' && (
        <div className="space-y-4">
          <div className="text-3xl">🎉</div>
          <div className="text-2xl font-bold text-green-400">
            Congratulations!
          </div>
          <div className="text-gray-300">You guessed the word correctly!</div>
        </div>
      )}
      {gameStatus === 'lost' && (
        <div className="space-y-4">
          <div className="text-3xl">💀</div>
          <div className="text-2xl font-bold text-red-400">Game Over!</div>
          <div className="text-gray-300">
            The word was:{' '}
            <span className="text-cyan-400 font-bold">{currentWord}</span>
          </div>
        </div>
      )}
      {gameStatus === 'playing' && (
        <div className="space-y-4">
          <div className="text-2xl font-bold text-cyan-400">
            Guess the Programming Term!
          </div>
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={onToggleHint}
              className="flex items-center gap-2 text-yellow-400 hover:text-yellow-300 transition-colors duration-300"
            >
              <Lightbulb className="w-4 h-4" />
              <span>Hint</span>
            </button>
            {showHint && (
              <div className="text-sm text-gray-400 bg-gray-800 px-3 py-1 rounded-full">
                Category: {hint}
              </div>
            )}
          </div>
        </div>
      )}

      {(gameStatus === 'won' || gameStatus === 'lost') && (
        <button
          onClick={onNewGame}
          className="mt-4 flex items-center gap-2 mx-auto bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-full font-semibold hover:scale-105 transition-transform duration-300"
        >
          <RotateCcw className="w-4 h-4" />
          New Game
        </button>
      )}
    </div>
  );
};
