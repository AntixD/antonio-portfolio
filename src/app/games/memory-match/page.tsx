'use client';

import React from 'react';
import { Brain } from 'lucide-react';
import { useMemoryMatch } from '@/hooks/games/useMemoryMatch';
import { GameHeader } from '@/components/games/shared/GameHeader';
import { GameStats } from '@/components/games/shared/GameStats';
import { Achievements } from '@/components/games/shared/Achievements';
import { MemoryGrid } from '@/components/games/memory-match/MemoryGrid';
import { GameStatus } from '@/components/games/memory-match/GameStatus';
import { DifficultySelector } from '@/components/games/memory-match/DifficultySelector';
import { MEMORY_ACHIEVEMENTS } from '@/data/games/memoryMatch';

export default function MemoryMatchPage() {
  const {
    gameState,
    stats,
    flipCard,
    startNewGame,
    setDifficulty,
    resetStats,
    getWinRate,
    getAverageMoves,
  } = useMemoryMatch();

  const gameStats = [
    { label: 'Games Won', value: stats.gamesWon, color: 'text-green-400' },
    { label: 'Win Rate', value: `${getWinRate()}%`, color: 'text-purple-400' },
    {
      label: 'Best Moves',
      value: stats.bestMoves === Infinity ? '-' : stats.bestMoves,
      color: 'text-cyan-400',
    },
    {
      label: 'Best Time',
      value: stats.bestTime === Infinity ? '-' : `${stats.bestTime}s`,
      color: 'text-pink-400',
    },
    { label: 'Avg Moves', value: getAverageMoves(), color: 'text-orange-400' },
    {
      label: 'Perfect Games',
      value: stats.perfectGames,
      color: 'text-yellow-400',
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-6xl mx-auto">
        <GameHeader
          title="Memory Match"
          gradientColors="from-purple-400 to-pink-400"
        />

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <GameStatus
              moves={gameState.moves}
              timeElapsed={gameState.timeElapsed}
              isComplete={gameState.isComplete}
              onNewGame={() => startNewGame()}
            />
            <MemoryGrid
              cards={gameState.cards}
              difficulty={gameState.difficulty}
              onCardClick={flipCard}
            />
          </div>
          <div className="space-y-6">
            <DifficultySelector
              currentDifficulty={gameState.difficulty}
              onDifficultyChange={setDifficulty}
            />
            <GameStats stats={gameStats} onReset={resetStats} />
            <Achievements achievements={MEMORY_ACHIEVEMENTS} stats={stats} />
            <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Brain className="w-5 h-5 text-purple-400" />
                How to Play
              </h3>
              <div className="space-y-2 text-sm text-gray-400">
                <p>• Click cards to flip them</p>
                <p>• Find matching pairs of programming tools</p>
                <p>• Match all pairs to win</p>
                <p>• Try to use fewer moves</p>
                <p>• Complete as fast as possible!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
