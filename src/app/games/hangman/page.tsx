'use client';

import React from 'react';
import { RotateCcw, Lightbulb } from 'lucide-react';
import { useHangman } from '@/hooks/games/useHangman';
import { HangmanGame } from '@/components/games/hangman/HangmanGame';
import { HangmanDrawing } from '@/components/games/hangman/HangmanDrawing';
import { WordDisplay } from '@/components/games/hangman/WordDisplay';
import { LetterGrid } from '@/components/games/hangman/LetterGrid';
import { HangmanStats } from '@/components/games/hangman/HangmanStats';
import {
  HANGMAN_ACHIEVEMENTS,
  MAX_WRONG_GUESSES,
  PROGRAMMING_WORDS,
} from '@/data/games/hangman';
import { GameHeader } from '@/components/games/shared/GameHeader';
import { GameStats } from '@/components/games/shared/GameStats';
import { Achievements } from '@/components/games/shared/Achievements';

export default function HangmanPage() {
  const {
    gameState,
    stats,
    guessLetter,
    startNewGame,
    toggleHint,
    resetStats,
    getWinRate,
  } = useHangman();

  const gameStats = [
    { label: 'Games Won', value: stats.wins, color: 'text-green-400' },
    { label: 'Games Lost', value: stats.losses, color: 'text-red-400' },
    { label: 'Total Played', value: stats.gamesPlayed, color: 'text-cyan-400' },
    { label: 'Win Rate', value: `${getWinRate()}%`, color: 'text-purple-400' },
    {
      label: 'Current Streak',
      value: stats.currentStreak,
      color: 'text-orange-400',
    },
    { label: 'Best Streak', value: stats.bestStreak, color: 'text-pink-400' },
  ];

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-6xl mx-auto">
        <GameHeader
          title="Programming Hangman"
          gradientColors="from-red-400 to-pink-400"
        />

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <HangmanGame
              gameState={gameState}
              onNewGame={startNewGame}
              onToggleHint={toggleHint}
            />
            <WordDisplay
              currentWord={gameState.currentWord}
              guessedLetters={gameState.guessedLetters}
            />
            <HangmanDrawing
              wrongGuessesCount={gameState.wrongGuesses.length}
              maxWrongGuesses={MAX_WRONG_GUESSES}
            />
            {gameState.wrongGuesses.length > 0 && (
              <div className="text-center bg-gray-900/50 rounded-xl p-4 border border-gray-800">
                <div className="text-red-400 font-semibold mb-2">
                  Wrong Guesses:
                </div>
                <div className="flex justify-center gap-2">
                  {gameState.wrongGuesses.map((letter, index) => (
                    <span
                      key={index}
                      className="bg-red-500/20 text-red-400 px-2 py-1 rounded"
                    >
                      {letter}
                    </span>
                  ))}
                </div>
              </div>
            )}
            <LetterGrid
              guessedLetters={gameState.guessedLetters}
              currentWord={gameState.currentWord}
              onLetterClick={guessLetter}
              disabled={gameState.gameStatus !== 'playing'}
            />
          </div>
          <div className="space-y-6">
            <GameStats stats={gameStats} onReset={resetStats} />
            <Achievements achievements={HANGMAN_ACHIEVEMENTS} stats={stats} />
            <HangmanStats />
            <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
              <h3 className="text-xl font-bold mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button
                  onClick={startNewGame}
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 rounded-lg font-semibold hover:scale-105 transition-transform duration-300"
                >
                  <RotateCcw className="w-4 h-4" />
                  New Game
                </button>
                <button
                  onClick={toggleHint}
                  disabled={gameState.gameStatus !== 'playing'}
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-2 rounded-lg font-semibold hover:scale-105 transition-transform duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Lightbulb className="w-4 h-4" />
                  {gameState.showHint ? 'Hide Hint' : 'Show Hint'}
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 bg-gray-900/50 rounded-xl p-6 border border-gray-800">
          <h3 className="text-xl font-bold mb-4 text-center">
            Sample Words You Might Encounter
          </h3>
          <div className="flex flex-wrap justify-center gap-2 text-sm">
            {PROGRAMMING_WORDS.slice(0, 20).map((word, index) => (
              <span
                key={index}
                className="bg-gray-800/50 px-3 py-1 rounded-full text-gray-400"
              >
                {word}
              </span>
            ))}
            <span className="bg-gradient-to-r from-purple-500 to-pink-500 px-3 py-1 rounded-full text-white font-semibold">
              +{PROGRAMMING_WORDS.length - 20} more...
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
