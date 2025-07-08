import React from 'react';
import { MemoryCard } from '@/types/games';
import { DIFFICULTY_CONFIG } from '@/data/games/memoryMatch';

interface MemoryGridProps {
  cards: MemoryCard[];
  difficulty: string;
  onCardClick: (cardId: number) => void;
}

export const MemoryGrid: React.FC<MemoryGridProps> = ({
  cards,
  difficulty,
  onCardClick,
}) => {
  const gridCols =
    DIFFICULTY_CONFIG[difficulty as keyof typeof DIFFICULTY_CONFIG].gridCols;

  return (
    <div className={`grid ${gridCols} gap-4 max-w-2xl mx-auto`}>
      {cards.map((card, index) => (
        <button
          key={index}
          onClick={() => onCardClick(index)}
          disabled={card.isFlipped || card.isMatched}
          className={`aspect-square rounded-xl transition-all duration-500 transform preserve-3d
            ${card.isFlipped || card.isMatched ? 'rotate-y-180' : ''}
            ${card.isMatched ? 'scale-95 opacity-80' : 'hover:scale-105'}
            ${!card.isFlipped && !card.isMatched ? 'cursor-pointer' : ''}`}
          style={{
            transformStyle: 'preserve-3d',
            transform:
              card.isFlipped || card.isMatched
                ? 'rotateY(180deg)'
                : 'rotateY(0deg)',
          }}
        >
          <div
            className={`absolute inset-0 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 
              flex items-center justify-center backface-hidden
              ${
                !card.isFlipped && !card.isMatched
                  ? 'hover:from-purple-500 hover:to-pink-500'
                  : ''
              }`}
            style={{ backfaceVisibility: 'hidden' }}
          >
            <div className="text-4xl">❓</div>
          </div>
          <div
            className={`absolute inset-0 rounded-xl flex flex-col items-center justify-center
              backface-hidden rotate-y-180 ${
                card.isMatched
                  ? 'bg-gradient-to-br from-green-500 to-emerald-500'
                  : 'bg-gradient-to-br from-blue-500 to-cyan-500'
              }`}
            style={{
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
            }}
          >
            <div className="text-4xl mb-2">{card.emoji}</div>
            <div className="text-xs font-semibold px-2 text-center">
              {card.content}
            </div>
            {card.isMatched && (
              <div className="absolute top-2 right-2 text-white">✓</div>
            )}
          </div>
        </button>
      ))}
    </div>
  );
};
