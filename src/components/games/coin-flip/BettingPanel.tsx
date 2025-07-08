import React from 'react';
import { CoinSide } from '@/types/games';
import { BET_AMOUNTS } from '@/data/games/coinFlip';

interface BettingPanelProps {
  prediction: CoinSide | null;
  betAmount: number;
  totalPoints: number;
  isFlipping: boolean;
  multiplier: number;
  onPredictionChange: (side: CoinSide) => void;
  onBetAmountChange: (amount: number) => void;
}

export const BettingPanel: React.FC<BettingPanelProps> = ({
  prediction,
  betAmount,
  totalPoints,
  isFlipping,
  multiplier,
  onPredictionChange,
  onBetAmountChange,
}) => {
  return (
    <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
      <h3 className="text-xl font-bold mb-4">Place Your Bet</h3>
      <div className="mb-6">
        <label className="text-sm text-gray-400 mb-2 block">Choose Side:</label>
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => onPredictionChange('heads')}
            disabled={isFlipping}
            className={`p-4 rounded-lg border-2 transition-all duration-300 font-semibold
              ${
                prediction === 'heads'
                  ? 'border-cyan-400 bg-cyan-400/20 text-cyan-400'
                  : 'border-gray-700 hover:border-gray-600'
              }`}
          >
            Heads
          </button>
          <button
            onClick={() => onPredictionChange('tails')}
            disabled={isFlipping}
            className={`p-4 rounded-lg border-2 transition-all duration-300 font-semibold
              ${
                prediction === 'tails'
                  ? 'border-pink-400 bg-pink-400/20 text-pink-400'
                  : 'border-gray-700 hover:border-gray-600'
              }`}
          >
            Tails
          </button>
        </div>
      </div>
      <div className="mb-6">
        <label className="text-sm text-gray-400 mb-2 block">Bet Amount:</label>
        <div className="grid grid-cols-3 gap-2">
          {BET_AMOUNTS.map((amount) => (
            <button
              key={amount}
              onClick={() => onBetAmountChange(amount)}
              disabled={isFlipping || amount > totalPoints}
              className={`p-2 rounded-lg border transition-all duration-300 font-semibold
                ${
                  betAmount === amount
                    ? 'border-purple-400 bg-purple-400/20 text-purple-400'
                    : 'border-gray-700 hover:border-gray-600'
                }
                ${amount > totalPoints ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {amount}
            </button>
          ))}
        </div>
      </div>
      {multiplier > 1 && (
        <div className="mb-4 p-3 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-lg border border-yellow-500/50">
          <div className="text-sm text-yellow-400">
            🔥 Streak Multiplier: {multiplier.toFixed(1)}x
          </div>
        </div>
      )}
      <div className="text-center">
        <div className="text-sm text-gray-400 mb-1">Potential Win:</div>
        <div className="text-2xl font-bold text-green-400">
          +{Math.floor(betAmount * multiplier)}
        </div>
      </div>
    </div>
  );
};
