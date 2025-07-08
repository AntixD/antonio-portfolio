import React from 'react';
import { Brain } from 'lucide-react';
import { FUN_FACTS } from '@/data/games/ticTacToe';

export const TicTacToeStats: React.FC = () => {
  return (
    <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
      <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
        <Brain className="w-5 h-5 text-cyan-400" />
        Fun Facts
      </h3>
      <div className="space-y-2 text-sm text-gray-400">
        {FUN_FACTS.map((fact, index) => (
          <p key={index}>• {fact}</p>
        ))}
      </div>
    </div>
  );
};
