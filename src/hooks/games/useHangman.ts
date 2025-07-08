import { useState, useCallback, useEffect } from 'react';
import { HangmanGameState, HangmanGameStats } from '@/types/games';
import {
  PROGRAMMING_WORDS,
  getWordCategory,
  MAX_WRONG_GUESSES,
} from '@/data/games/hangman';

export const useHangman = () => {
  const [gameState, setGameState] = useState<HangmanGameState>({
    currentWord: '',
    guessedLetters: new Set(),
    wrongGuesses: [],
    gameStatus: 'playing',
    hint: '',
    showHint: false,
  });

  const [stats, setStats] = useState<HangmanGameStats>({
    wins: 0,
    losses: 0,
    gamesPlayed: 0,
    currentStreak: 0,
    bestStreak: 0,
  });

  const startNewGame = useCallback(() => {
    const randomWord =
      PROGRAMMING_WORDS[Math.floor(Math.random() * PROGRAMMING_WORDS.length)];
    setGameState({
      currentWord: randomWord,
      guessedLetters: new Set(),
      wrongGuesses: [],
      gameStatus: 'playing',
      hint: getWordCategory(randomWord),
      showHint: false,
    });
  }, []);

  const guessLetter = useCallback(
    (letter: string) => {
      if (
        gameState.guessedLetters.has(letter) ||
        gameState.gameStatus !== 'playing'
      )
        return;

      setGameState((prev) => {
        const newGuessedLetters = new Set(prev.guessedLetters);
        newGuessedLetters.add(letter);

        const newWrongGuesses = prev.currentWord.includes(letter)
          ? prev.wrongGuesses
          : [...prev.wrongGuesses, letter];

        return {
          ...prev,
          guessedLetters: newGuessedLetters,
          wrongGuesses: newWrongGuesses,
        };
      });
    },
    [gameState.guessedLetters, gameState.gameStatus, gameState.currentWord]
  );

  const toggleHint = useCallback(() => {
    setGameState((prev) => ({ ...prev, showHint: !prev.showHint }));
  }, []);

  const resetStats = useCallback(() => {
    setStats({
      wins: 0,
      losses: 0,
      gamesPlayed: 0,
      currentStreak: 0,
      bestStreak: 0,
    });
  }, []);

  useEffect(() => {
    if (!gameState.currentWord) return;

    const wordLetters = new Set(gameState.currentWord.split(''));
    const correctGuesses = new Set(
      [...gameState.guessedLetters].filter((letter) => wordLetters.has(letter))
    );

    if (
      wordLetters.size === correctGuesses.size &&
      gameState.gameStatus === 'playing'
    ) {
      setGameState((prev) => ({ ...prev, gameStatus: 'won' }));
      setStats((prev) => ({
        ...prev,
        wins: prev.wins + 1,
        gamesPlayed: prev.gamesPlayed + 1,
        currentStreak: prev.currentStreak + 1,
        bestStreak: Math.max(prev.bestStreak, prev.currentStreak + 1),
      }));
    } else if (
      gameState.wrongGuesses.length >= MAX_WRONG_GUESSES &&
      gameState.gameStatus === 'playing'
    ) {
      setGameState((prev) => ({ ...prev, gameStatus: 'lost' }));
      setStats((prev) => ({
        ...prev,
        losses: prev.losses + 1,
        gamesPlayed: prev.gamesPlayed + 1,
        currentStreak: 0,
      }));
    }
  }, [gameState]);

  useEffect(() => {
    startNewGame();
  }, [startNewGame]);

  return {
    gameState,
    stats,
    guessLetter,
    startNewGame,
    toggleHint,
    resetStats,
    getWinRate: () =>
      stats.gamesPlayed === 0
        ? 0
        : Math.round((stats.wins / stats.gamesPlayed) * 100),
  };
};
