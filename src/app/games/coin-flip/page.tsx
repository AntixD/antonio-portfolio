'use client';

import React from 'react';
import { Coins } from 'lucide-react';
import { useCoinFlip } from '@/hooks/games/useCoinFlip';
import { GameHeader } from '@/components/games/shared/GameHeader';
import { GameStats } from '@/components/games/shared/GameStats';
import { Achievements } from '@/components/games/shared/Achievements';
import { CoinDisplay } from '@/components/games/coin-flip/CoinDisplay';
import { BettingPanel } from '@/components/games/coin-flip/BettingPanel';
import { CoinTypeSelector } from '@/components/games/coin-flip/CoinTypeSelector';
import { COINFLIP_ACHIEVEMENTS } from '@/data/games/coinFlip';

export default function CoinFlipPage() {
  const {
    gameState,
    stats,
    setPrediction,
    setBetAmount,
    setCoinType,
    flipCoin,
    resetStats,
    getHeadsPercentage,
    canBet,
  } = useCoinFlip();

  const gameStats = [
    {
      label: 'Total Points',
      value: stats.totalPoints,
      color: 'text-yellow-400',
    },
    { label: 'Total Flips', value: stats.totalFlips, color: 'text-cyan-400' },
    {
      label: 'Current Streak',
      value: stats.currentStreak,
      color: 'text-orange-400',
    },
    { label: 'Best Streak', value: stats.bestStreak, color: 'text-pink-400' },
    {
      label: 'Heads %',
      value: `${getHeadsPercentage()}%`,
      color: 'text-blue-400',
    },
    { label: 'Biggest Win', value: stats.biggestWin, color: 'text-green-400' },
  ];

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-6xl mx-auto">
        <GameHeader
          title="Crypto Coin Flip"
          gradientColors="from-yellow-400 to-orange-400"
        />

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="text-center bg-gray-900/50 rounded-xl p-6 border border-gray-800">
              <div className="text-sm text-gray-400 mb-2">Your Points</div>
              <div className="text-4xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                {stats.totalPoints.toLocaleString()}
              </div>
              {gameState.lastResult && (
                <div
                  className={`mt-4 text-lg font-semibold ${
                    gameState.prediction === gameState.lastResult
                      ? 'text-green-400'
                      : 'text-red-400'
                  }`}
                >
                  {gameState.prediction === gameState.lastResult
                    ? `+${Math.floor(
                        gameState.betAmount * gameState.multiplier
                      )}`
                    : `-${gameState.betAmount}`}
                </div>
              )}
            </div>
            <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
              <CoinDisplay
                coinType={gameState.coinType}
                isFlipping={gameState.isFlipping}
                lastResult={gameState.lastResult}
              />
              <div className="text-center mt-6">
                <button
                  onClick={flipCoin}
                  disabled={
                    gameState.isFlipping || !gameState.prediction || !canBet
                  }
                  className={`px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 transform
                    ${
                      gameState.isFlipping || !gameState.prediction || !canBet
                        ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                        : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:scale-105'
                    }`}
                >
                  <Coins className="inline-block w-5 h-5 mr-2" />
                  {gameState.isFlipping ? 'Flipping...' : 'Flip Coin!'}
                </button>
                {!gameState.prediction && !gameState.isFlipping && (
                  <div className="text-sm text-yellow-400 mt-2">
                    Choose heads or tails first!
                  </div>
                )}
                {!canBet && !gameState.isFlipping && (
                  <div className="text-sm text-red-400 mt-2">
                    Not enough points for this bet!
                  </div>
                )}
              </div>
            </div>
            <BettingPanel
              prediction={gameState.prediction}
              betAmount={gameState.betAmount}
              totalPoints={stats.totalPoints}
              isFlipping={gameState.isFlipping}
              multiplier={gameState.multiplier}
              onPredictionChange={setPrediction}
              onBetAmountChange={setBetAmount}
            />
          </div>
          <div className="space-y-6">
            <CoinTypeSelector
              currentType={gameState.coinType}
              onTypeChange={setCoinType}
              isFlipping={gameState.isFlipping}
            />
            <GameStats stats={gameStats} onReset={resetStats} />
            <Achievements achievements={COINFLIP_ACHIEVEMENTS} stats={stats} />
            <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Coins className="w-5 h-5 text-yellow-400" />
                How to Play
              </h3>
              <div className="space-y-2 text-sm text-gray-400">
                <p>• Start with 1000 points</p>
                <p>• Choose heads or tails</p>
                <p>• Select your bet amount</p>
                <p>• Different coins have different multipliers</p>
                <p>• Build streaks for bonus multipliers!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
