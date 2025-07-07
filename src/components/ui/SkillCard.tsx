import React, { memo } from 'react';
import { Skill } from '../../types/portfolio';

interface SkillCardProps {
  skill: Skill;
  index: number;
  isVisible: boolean;
}

const SkillCard: React.FC<SkillCardProps> = memo(
  ({ skill, index, isVisible }) => {
    return (
      <div
        className={`p-4 rounded-xl bg-gray-900/30 backdrop-blur-sm transform transition-all duration-700 hover:scale-105 hover:shadow-2xl border border-gray-800/50 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}
        style={{
          animationDelay: `${index * 100}ms`,
          transitionDelay: `${index * 100}ms`,
        }}
      >
        <div className="flex items-center space-x-3 mb-3">
          <span className="text-2xl">{skill.icon}</span>
          <h3 className="text-sm font-semibold">{skill.name}</h3>
        </div>

        <div className="w-full rounded-full h-2 bg-gray-800">
          <div
            className={`bg-gradient-to-r ${skill.color} h-2 rounded-full transition-all duration-1000 ease-out`}
            style={{
              width: isVisible ? `${skill.level}%` : '0%',
              transitionDelay: `${index * 100 + 200}ms`,
            }}
          />
        </div>

        <p className="text-sm mt-2 text-gray-400">{skill.level}% Proficiency</p>
      </div>
    );
  }
);

SkillCard.displayName = 'SkillCard';

export default SkillCard;
