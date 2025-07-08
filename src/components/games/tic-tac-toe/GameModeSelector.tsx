import React from 'react';
import { TicTacToeGameMode } from '@/types/games';
import { GAME_MODE_CONFIG } from '@/data/games/ticTacToe';

interface GameModeSelectorProps {
  currentMode: TicTacToeGameMode;
  onModeChange: (mode: TicTacToeGameMode) => void;
}

export const GameModeSelector: React.FC<GameModeSelectorProps> = ({
  currentMode,
  onModeChange,
}) => {
  return (
    <div className="mb-8 p-6 bg-gray-900/50 rounded-xl border border-gray-800">
      <h2 className="text-xl font-bold mb-4 text-center">
        Choose Your Challenge Level
      </h2>
      <div className="grid md:grid-cols-3 gap-4">
        {(Object.keys(GAME_MODE_CONFIG) as TicTacToeGameMode[]).map((mode) => {
          const config = GAME_MODE_CONFIG[mode];
          return (
            <button
              key={mode}
              onClick={() => onModeChange(mode)}
              className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                currentMode === mode
                  ? `bg-gradient-to-r ${config.color} border-transparent text-white`
                  : 'border-gray-700 hover:border-gray-600 bg-gray-800/30'
              }`}
            >
              <div className="text-lg font-bold capitalize mb-2">{mode}</div>
              <div className="text-sm opacity-90">{config.description}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
