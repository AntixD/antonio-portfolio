'use client';

import React from 'react';
import { useTicTacToe } from '@/hooks/games/useTicTacToe';
import { TICTACTOE_ACHIEVEMENTS } from '@/data/games/ticTacToe';
import { GameModeSelector } from '@/components/games/tic-tac-toe/GameModeSelector';
import { GameBoard } from '@/components/games/tic-tac-toe/GameBoard';
import { TicTacToeStats } from '@/components/games/tic-tac-toe/TicTacToeStats';
import { GameHeader } from '@/components/games/shared/GameHeader';
import { GameStats } from '@/components/games/shared/GameStats';
import { Achievements } from '@/components/games/shared/Achievements';

export default function TicTacToePage() {
  const {
    gameState,
    stats,
    handleCellClick,
    resetGame,
    setGameMode,
    resetStats,
    getWinRate,
  } = useTicTacToe();

  const gameStats = [
    { label: 'Your Wins', value: stats.playerWins, color: 'text-green-400' },
    { label: 'AI Wins', value: stats.aiWins, color: 'text-red-400' },
    { label: 'Draws', value: stats.draws, color: 'text-yellow-400' },
    { label: 'Total Games', value: stats.gamesPlayed, color: 'text-cyan-400' },
    { label: 'Win Rate', value: `${getWinRate()}%`, color: 'text-purple-400' },
  ];

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-4xl mx-auto">
        <GameHeader
          title="Tic-Tac-Toe AI Challenge"
          gradientColors="from-blue-400 to-cyan-400"
        />
        <GameModeSelector
          currentMode={gameState.gameMode}
          onModeChange={setGameMode}
        />

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <GameBoard
              board={gameState.board}
              winner={gameState.winner}
              isPlayerTurn={gameState.isPlayerTurn}
              isAiThinking={gameState.isAiThinking}
              gameMode={gameState.gameMode}
              onCellClick={handleCellClick}
              onReset={resetGame}
            />
          </div>
          <div className="space-y-6">
            <GameStats stats={gameStats} onReset={resetStats} />
            <Achievements
              achievements={TICTACTOE_ACHIEVEMENTS}
              stats={stats}
              gameMode={gameState.gameMode}
            />
            <TicTacToeStats />
          </div>
        </div>
      </div>
    </div>
  );
}
