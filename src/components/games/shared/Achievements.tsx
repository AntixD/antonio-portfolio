import React from 'react';
import { Target } from 'lucide-react';
import { Achievement } from '@/types/games';

interface AchievementsProps {
  achievements: Achievement[];
  stats: any;
  gameMode?: string;
}

export const Achievements: React.FC<AchievementsProps> = ({
  achievements,
  stats,
  gameMode,
}) => {
  return (
    <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
      <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
        <Target className="w-5 h-5 text-purple-400" />
        Achievements
      </h3>
      <div className="space-y-3">
        {achievements.map((achievement) => {
          const isUnlocked = achievement.condition(stats);
          return (
            <div
              key={achievement.id}
              className={`flex items-center gap-2 ${
                isUnlocked ? 'text-green-400' : 'text-gray-500'
              }`}
            >
              <span>{isUnlocked ? achievement.icon : '🔒'}</span>
              <span className="text-sm">
                {achievement.title}
                {achievement.description && (
                  <span className="text-xs ml-1">
                    ({achievement.description})
                  </span>
                )}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
