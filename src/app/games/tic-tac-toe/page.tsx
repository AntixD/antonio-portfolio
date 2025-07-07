'use client';

import React, { useState, useCallback, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, RotateCcw, Trophy, Zap, Brain, Target } from 'lucide-react';

type Player = 'X' | 'O' | null;
type Board = Player[];
type GameMode = 'easy' | 'medium' | 'impossible';

interface GameStats {
  playerWins: number;
  aiWins: number;
  draws: number;
  gamesPlayed: number;
}

export default function TicTacToePage() {
  const [board, setBoard] = useState<Board>(Array(9).fill(null));
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [winner, setWinner] = useState<Player | 'draw' | null>(null);
  const [gameMode, setGameMode] = useState<GameMode>('medium');
  const [stats, setStats] = useState<GameStats>({
    playerWins: 0,
    aiWins: 0,
    draws: 0,
    gamesPlayed: 0,
  });
  const [isAiThinking, setIsAiThinking] = useState(false);

  // Check for winner
  const checkWinner = useCallback((board: Board): Player | 'draw' | null => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8], // rows
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8], // columns
      [0, 4, 8],
      [2, 4, 6], // diagonals
    ];

    for (const [a, b, c] of lines) {
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }

    if (board.every((cell) => cell !== null)) {
      return 'draw';
    }

    return null;
  }, []);

  // Minimax algorithm for impossible mode
  const minimax = useCallback(
    (board: Board, depth: number, isMaximizing: boolean): number => {
      const result = checkWinner(board);

      if (result === 'O') return 10 - depth;
      if (result === 'X') return depth - 10;
      if (result === 'draw') return 0;

      if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < 9; i++) {
          if (board[i] === null) {
            board[i] = 'O';
            const score = minimax(board, depth + 1, false);
            board[i] = null;
            bestScore = Math.max(score, bestScore);
          }
        }
        return bestScore;
      } else {
        let bestScore = Infinity;
        for (let i = 0; i < 9; i++) {
          if (board[i] === null) {
            board[i] = 'X';
            const score = minimax(board, depth + 1, true);
            board[i] = null;
            bestScore = Math.min(score, bestScore);
          }
        }
        return bestScore;
      }
    },
    [checkWinner]
  );

  // AI move logic
  const getAiMove = useCallback(
    (board: Board, mode: GameMode): number => {
      const availableMoves = board
        .map((cell, index) => (cell === null ? index : null))
        .filter((val) => val !== null) as number[];

      if (availableMoves.length === 0) return -1;

      switch (mode) {
        case 'easy':
          // Random move
          return availableMoves[
            Math.floor(Math.random() * availableMoves.length)
          ];

        case 'medium':
          // 70% chance of good move, 30% random
          if (Math.random() < 0.3) {
            return availableMoves[
              Math.floor(Math.random() * availableMoves.length)
            ];
          }
        // Fall through to impossible logic

        case 'impossible':
          let bestScore = -Infinity;
          let bestMove = availableMoves[0];

          for (const move of availableMoves) {
            board[move] = 'O';
            const score = minimax(board, 0, false);
            board[move] = null;

            if (score > bestScore) {
              bestScore = score;
              bestMove = move;
            }
          }
          return bestMove;
      }
    },
    [minimax]
  );

  // Handle player move
  const handleCellClick = (index: number) => {
    if (board[index] || winner || !isPlayerTurn || isAiThinking) return;

    const newBoard = [...board];
    newBoard[index] = 'X';
    setBoard(newBoard);
    setIsPlayerTurn(false);

    const gameResult = checkWinner(newBoard);
    if (gameResult) {
      setWinner(gameResult);
      updateStats(gameResult);
      return;
    }

    // AI turn
    setIsAiThinking(true);
    setTimeout(
      () => {
        const aiMove = getAiMove(newBoard, gameMode);
        if (aiMove !== -1) {
          newBoard[aiMove] = 'O';
          setBoard([...newBoard]);

          const finalResult = checkWinner(newBoard);
          if (finalResult) {
            setWinner(finalResult);
            updateStats(finalResult);
          } else {
            setIsPlayerTurn(true);
          }
        }
        setIsAiThinking(false);
      },
      gameMode === 'impossible' ? 1000 : 500
    );
  };

  // Update game statistics
  const updateStats = (result: Player | 'draw') => {
    setStats((prev) => ({
      ...prev,
      playerWins: result === 'X' ? prev.playerWins + 1 : prev.playerWins,
      aiWins: result === 'O' ? prev.aiWins + 1 : prev.aiWins,
      draws: result === 'draw' ? prev.draws + 1 : prev.draws,
      gamesPlayed: prev.gamesPlayed + 1,
    }));
  };

  // Reset game
  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsPlayerTurn(true);
    setWinner(null);
    setIsAiThinking(false);
  };

  // Reset all stats
  const resetStats = () => {
    setStats({
      playerWins: 0,
      aiWins: 0,
      draws: 0,
      gamesPlayed: 0,
    });
  };

  const getModeDescription = (mode: GameMode) => {
    switch (mode) {
      case 'easy':
        return 'AI makes random moves - perfect for beginners!';
      case 'medium':
        return 'AI is smart but makes occasional mistakes';
      case 'impossible':
        return 'Perfect AI - good luck beating this! 😈';
    }
  };

  const getModeColor = (mode: GameMode) => {
    switch (mode) {
      case 'easy':
        return 'from-green-500 to-emerald-500';
      case 'medium':
        return 'from-yellow-500 to-orange-500';
      case 'impossible':
        return 'from-red-500 to-pink-500';
    }
  };

  const getWinRate = () => {
    if (stats.gamesPlayed === 0) return 0;
    return Math.round((stats.playerWins / stats.gamesPlayed) * 100);
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link
            href="/games"
            className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-all duration-300 transform hover:scale-105"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Games</span>
          </Link>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Tic-Tac-Toe AI Challenge
          </h1>
        </div>

        {/* Game Mode Selection */}
        <div className="mb-8 p-6 bg-gray-900/50 rounded-xl border border-gray-800">
          <h2 className="text-xl font-bold mb-4 text-center">
            Choose Your Challenge Level
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            {(['easy', 'medium', 'impossible'] as GameMode[]).map((mode) => (
              <button
                key={mode}
                onClick={() => {
                  setGameMode(mode);
                  resetGame();
                }}
                className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                  gameMode === mode
                    ? `bg-gradient-to-r ${getModeColor(
                        mode
                      )} border-transparent text-white`
                    : 'border-gray-700 hover:border-gray-600 bg-gray-800/30'
                }`}
              >
                <div className="text-lg font-bold capitalize mb-2">{mode}</div>
                <div className="text-sm opacity-90">
                  {getModeDescription(mode)}
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Game Board */}
          <div className="lg:col-span-2">
            <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
              {/* Game Status */}
              <div className="text-center mb-6">
                {winner ? (
                  <div className="space-y-2">
                    <div className="text-2xl font-bold">
                      {winner === 'X' && (
                        <span className="text-green-400">
                          🎉 You Won! Amazing!
                        </span>
                      )}
                      {winner === 'O' && (
                        <span className="text-red-400">
                          🤖 AI Wins! Try Again?
                        </span>
                      )}
                      {winner === 'draw' && (
                        <span className="text-yellow-400">🤝 It's a Draw!</span>
                      )}
                    </div>
                    <button
                      onClick={resetGame}
                      className="flex items-center gap-2 mx-auto bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full font-semibold hover:scale-105 transition-transform duration-300"
                    >
                      <RotateCcw className="w-4 h-4" />
                      Play Again
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="text-xl font-bold">
                      {isAiThinking ? (
                        <span className="text-blue-400 animate-pulse">
                          🤖 AI is thinking...
                        </span>
                      ) : isPlayerTurn ? (
                        <span className="text-cyan-400">Your turn! (X)</span>
                      ) : (
                        <span className="text-orange-400">AI's turn (O)</span>
                      )}
                    </div>
                    <div className="text-sm text-gray-400">
                      Mode:{' '}
                      <span className="capitalize font-semibold">
                        {gameMode}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-3 gap-2 max-w-xs mx-auto">
                {board.map((cell, index) => (
                  <button
                    key={index}
                    onClick={() => handleCellClick(index)}
                    disabled={
                      !!cell || !!winner || !isPlayerTurn || isAiThinking
                    }
                    className={`aspect-square bg-gray-800 border-2 border-gray-700 rounded-lg text-4xl font-bold transition-all duration-300 transform hover:scale-105 disabled:cursor-not-allowed ${
                      !cell && !winner && isPlayerTurn && !isAiThinking
                        ? 'hover:bg-gray-700 hover:border-cyan-400'
                        : ''
                    }`}
                  >
                    <span
                      className={
                        cell === 'X'
                          ? 'text-cyan-400'
                          : cell === 'O'
                          ? 'text-orange-400'
                          : ''
                      }
                    >
                      {cell}
                    </span>
                  </button>
                ))}
              </div>

              <div className="text-center mt-6">
                <button
                  onClick={resetGame}
                  className="flex items-center gap-2 mx-auto text-gray-400 hover:text-white transition-colors duration-300"
                >
                  <RotateCcw className="w-4 h-4" />
                  Reset Game
                </button>
              </div>
            </div>
          </div>

          {/* Stats Panel */}
          <div className="space-y-6">
            {/* Current Game Stats */}
            <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-400" />
                Game Statistics
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Your Wins:</span>
                  <span className="text-green-400 font-bold">
                    {stats.playerWins}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>AI Wins:</span>
                  <span className="text-red-400 font-bold">{stats.aiWins}</span>
                </div>
                <div className="flex justify-between">
                  <span>Draws:</span>
                  <span className="text-yellow-400 font-bold">
                    {stats.draws}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Total Games:</span>
                  <span className="text-cyan-400 font-bold">
                    {stats.gamesPlayed}
                  </span>
                </div>
                <div className="pt-2 border-t border-gray-700">
                  <div className="flex justify-between">
                    <span>Win Rate:</span>
                    <span className="text-purple-400 font-bold">
                      {getWinRate()}%
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={resetStats}
                className="w-full mt-4 text-sm text-gray-400 hover:text-white transition-colors duration-300"
              >
                Reset Statistics
              </button>
            </div>

            {/* Achievements */}
            <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Target className="w-5 h-5 text-purple-400" />
                Achievements
              </h3>
              <div className="space-y-3">
                <div
                  className={`flex items-center gap-2 ${
                    stats.playerWins >= 1 ? 'text-green-400' : 'text-gray-500'
                  }`}
                >
                  <span>{stats.playerWins >= 1 ? '🏆' : '🔒'}</span>
                  <span className="text-sm">First Victory</span>
                </div>
                <div
                  className={`flex items-center gap-2 ${
                    stats.playerWins >= 3 ? 'text-green-400' : 'text-gray-500'
                  }`}
                >
                  <span>{stats.playerWins >= 3 ? '🎯' : '🔒'}</span>
                  <span className="text-sm">Triple Threat</span>
                </div>
                <div
                  className={`flex items-center gap-2 ${
                    getWinRate() >= 50 && stats.gamesPlayed >= 10
                      ? 'text-green-400'
                      : 'text-gray-500'
                  }`}
                >
                  <span>
                    {getWinRate() >= 50 && stats.gamesPlayed >= 10
                      ? '⚡'
                      : '🔒'}
                  </span>
                  <span className="text-sm">AI Challenger</span>
                </div>
                <div
                  className={`flex items-center gap-2 ${
                    gameMode === 'impossible' && stats.playerWins > 0
                      ? 'text-green-400'
                      : 'text-gray-500'
                  }`}
                >
                  <span>
                    {gameMode === 'impossible' && stats.playerWins > 0
                      ? '🧠'
                      : '🔒'}
                  </span>
                  <span className="text-sm">Impossible Beaten</span>
                </div>
              </div>
            </div>

            {/* Fun Facts */}
            <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Brain className="w-5 h-5 text-cyan-400" />
                Fun Facts
              </h3>
              <div className="space-y-2 text-sm text-gray-400">
                <p>• The AI uses the Minimax algorithm</p>
                <p>• In impossible mode, the AI is unbeatable</p>
                <p>• There are 255,168 possible games</p>
                <p>• Perfect play always results in a draw</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
