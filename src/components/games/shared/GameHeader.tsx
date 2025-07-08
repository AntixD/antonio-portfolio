import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

interface GameHeaderProps {
  title: string;
  gradientColors: string;
}

export const GameHeader: React.FC<GameHeaderProps> = ({
  title,
  gradientColors,
}) => {
  return (
    <div className="flex items-center justify-between mb-8">
      <Link
        href="/games"
        className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-all duration-300 transform hover:scale-105"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Back to Games</span>
      </Link>
      <h1
        className={`text-4xl font-bold bg-gradient-to-r ${gradientColors} bg-clip-text text-transparent`}
      >
        {title}
      </h1>
    </div>
  );
};
