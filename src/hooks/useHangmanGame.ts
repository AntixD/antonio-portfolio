import { useState, useEffect, useCallback } from 'react';
import { GameStats, HangmanGameState, GameStatus } from '../types/games';
import { getRandomWord, getWordCategory } from '../utils/gameUtils';

export const useHangmanGame = () => {
  const [gameState, setGameState] = useState<HangmanGameState>({
    currentWord: '',
    guessedLetters: new Set(),
    wrongGuesses: [],
    gameStatus: 'playing',
    hint: '',
    showHint: false,
  });

  const [stats, setStats] = useState<GameStats>({
    wins: 0,
    losses: 0,
    gamesPlayed: 0,
    currentStreak: 0,
    bestStreak: 0,
  });

  const maxWrongGuesses = 6;

  const startNewGame = useCallback(() => {
    const randomWord = getRandomWord();
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

      const newGuessedLetters = new Set(gameState.guessedLetters);
      newGuessedLetters.add(letter);

      setGameState((prev) => ({
        ...prev,
        guessedLetters: newGuessedLetters,
        wrongGuesses: !prev.currentWord.includes(letter)
          ? [...prev.wrongGuesses, letter]
          : prev.wrongGuesses,
      }));
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
      gameState.wrongGuesses.length >= maxWrongGuesses &&
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
  }, [
    gameState.currentWord,
    gameState.guessedLetters,
    gameState.wrongGuesses,
    gameState.gameStatus,
  ]);

  useEffect(() => {
    startNewGame();
  }, [startNewGame]);

  return {
    gameState,
    stats,
    maxWrongGuesses,
    startNewGame,
    guessLetter,
    toggleHint,
    resetStats,
  };
};
