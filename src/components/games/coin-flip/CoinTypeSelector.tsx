import React from 'react';
import { CoinType } from '@/types/games';
import { COIN_TYPES } from '@/data/games/coinFlip';

interface CoinTypeSelectorProps {
  currentType: CoinType;
  onTypeChange: (type: CoinType) => void;
  isFlipping: boolean;
}

export const CoinTypeSelector: React.FC<CoinTypeSelectorProps> = ({
  currentType,
  onTypeChange,
  isFlipping,
}) => {
  return (
    <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
      <h3 className="text-xl font-bold mb-4">Choose Your Coin</h3>
      <div className="grid grid-cols-2 gap-4">
        {(Object.keys(COIN_TYPES) as CoinType[]).map((type) => {
          const coin = COIN_TYPES[type];
          return (
            <button
              key={type}
              onClick={() => onTypeChange(type)}
              disabled={isFlipping}
              className={`p-4 rounded-xl border-2 transition-all duration-300
                ${
                  currentType === type
                    ? `bg-gradient-to-r ${coin.color} border-transparent text-white`
                    : 'border-gray-700 hover:border-gray-600 bg-gray-800/30'
                }`}
            >
              <div className="text-3xl mb-2">{coin.icon}</div>
              <div className="font-semibold">{coin.name}</div>
              <div className="text-xs opacity-75">
                {coin.multiplier}x multiplier
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
