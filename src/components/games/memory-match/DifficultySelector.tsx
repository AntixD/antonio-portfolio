import React from 'react';
import { MemoryDifficulty } from '@/types/games';
import { DIFFICULTY_CONFIG } from '@/data/games/memoryMatch';

interface DifficultySelectorProps {
  currentDifficulty: MemoryDifficulty;
  onDifficultyChange: (difficulty: MemoryDifficulty) => void;
}

export const DifficultySelector: React.FC<DifficultySelectorProps> = ({
  currentDifficulty,
  onDifficultyChange,
}) => {
  return (
    <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
      <h3 className="text-xl font-bold mb-4 text-center">Choose Difficulty</h3>
      <div className="space-y-3">
        {(Object.keys(DIFFICULTY_CONFIG) as MemoryDifficulty[]).map(
          (difficulty) => {
            const config = DIFFICULTY_CONFIG[difficulty];
            return (
              <button
                key={difficulty}
                onClick={() => onDifficultyChange(difficulty)}
                className={`w-full p-4 rounded-xl border-2 transition-all duration-300 ${
                  currentDifficulty === difficulty
                    ? `bg-gradient-to-r ${config.color} border-transparent text-white`
                    : 'border-gray-700 hover:border-gray-600 bg-gray-800/30'
                }`}
              >
                <div className="text-lg font-bold capitalize mb-1">
                  {difficulty}
                </div>
                <div className="text-sm opacity-90">{config.description}</div>
              </button>
            );
          }
        )}
      </div>
    </div>
  );
};
