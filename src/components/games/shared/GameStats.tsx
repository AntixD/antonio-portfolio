import React from 'react';
import { Trophy } from 'lucide-react';

interface GameStatsProps {
  title?: string;
  stats: Array<{
    label: string;
    value: number | string;
    color?: string;
  }>;
  onReset?: () => void;
}

export const GameStats: React.FC<GameStatsProps> = ({
  title = 'Game Statistics',
  stats,
  onReset,
}) => {
  return (
    <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
      <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
        <Trophy className="w-5 h-5 text-yellow-400" />
        {title}
      </h3>
      <div className="space-y-3">
        {stats.map((stat, index) => (
          <div key={index} className="flex justify-between">
            <span>{stat.label}:</span>
            <span className={`font-bold ${stat.color || 'text-cyan-400'}`}>
              {stat.value}
            </span>
          </div>
        ))}
      </div>
      {onReset && (
        <button
          onClick={onReset}
          className="w-full mt-4 text-sm text-gray-400 hover:text-white transition-colors duration-300"
        >
          Reset Statistics
        </button>
      )}
    </div>
  );
};
