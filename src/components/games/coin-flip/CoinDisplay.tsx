import React from 'react';
import { CoinType, CoinSide } from '@/types/games';
import { COIN_TYPES } from '@/data/games/coinFlip';

interface CoinDisplayProps {
  coinType: CoinType;
  isFlipping: boolean;
  lastResult: CoinSide | null;
}

export const CoinDisplay: React.FC<CoinDisplayProps> = ({
  coinType,
  isFlipping,
  lastResult,
}) => {
  const coin = COIN_TYPES[coinType];

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div
        className={`relative w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br ${
          coin.color
        } 
          flex items-center justify-center text-6xl md:text-7xl transform transition-all duration-500
          ${isFlipping ? 'animate-spin' : ''} 
          ${!isFlipping && lastResult ? 'animate-bounce' : ''}`}
        style={{
          animationDuration: isFlipping ? '0.5s' : '1s',
          animationIterationCount: isFlipping ? 'infinite' : '1',
        }}
      >
        <div className="absolute inset-0 rounded-full bg-white/20 blur-xl"></div>
        <span className="relative z-10">{coin.icon}</span>
      </div>

      {lastResult && !isFlipping && (
        <div className="mt-6 text-center">
          <div className="text-2xl font-bold text-white">
            {lastResult === 'heads' ? coin.heads : coin.tails}!
          </div>
        </div>
      )}
    </div>
  );
};
