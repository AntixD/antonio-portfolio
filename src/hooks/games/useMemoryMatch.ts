import { useState, useCallback, useEffect } from 'react';
import {
  MemoryCard,
  MemoryMatchGameState,
  MemoryMatchStats,
  MemoryDifficulty,
} from '@/types/games';
import { PROGRAMMING_PAIRS, DIFFICULTY_CONFIG } from '@/data/games/memoryMatch';

export const useMemoryMatch = () => {
  const [gameState, setGameState] = useState<MemoryMatchGameState>({
    cards: [],
    flippedCards: [],
    moves: 0,
    startTime: null,
    isComplete: false,
    difficulty: 'medium',
    timeElapsed: 0,
  });

  const [stats, setStats] = useState<MemoryMatchStats>({
    gamesPlayed: 0,
    gamesWon: 0,
    totalMoves: 0,
    bestMoves: Infinity,
    totalTime: 0,
    bestTime: Infinity,
    perfectGames: 0,
  });

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (gameState.startTime && !gameState.isComplete) {
      interval = setInterval(() => {
        setGameState((prev) => ({
          ...prev,
          timeElapsed: Math.floor((Date.now() - prev.startTime!) / 1000),
        }));
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [gameState.startTime, gameState.isComplete]);

  const shuffleArray = <T>(array: T[]): T[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const createCards = useCallback(
    (difficulty: MemoryDifficulty): MemoryCard[] => {
      const numPairs = DIFFICULTY_CONFIG[difficulty].pairs;
      const selectedPairs = shuffleArray(PROGRAMMING_PAIRS).slice(0, numPairs);

      const cards: MemoryCard[] = [];
      selectedPairs.forEach((pair, index) => {
        cards.push({
          id: index * 2,
          content: pair.content,
          emoji: pair.emoji,
          isFlipped: false,
          isMatched: false,
        });
        cards.push({
          id: index * 2 + 1,
          content: pair.content,
          emoji: pair.emoji,
          isFlipped: false,
          isMatched: false,
        });
      });

      return shuffleArray(cards);
    },
    []
  );

  const startNewGame = useCallback(
    (difficulty?: MemoryDifficulty) => {
      const newDifficulty = difficulty || gameState.difficulty;
      setGameState({
        cards: createCards(newDifficulty),
        flippedCards: [],
        moves: 0,
        startTime: null,
        isComplete: false,
        difficulty: newDifficulty,
        timeElapsed: 0,
      });
    },
    [gameState.difficulty, createCards]
  );

  const flipCard = useCallback(
    (cardId: number) => {
      const { cards, flippedCards, isComplete, startTime } = gameState;

      if (
        isComplete ||
        flippedCards.includes(cardId) ||
        cards[cardId].isMatched
      ) {
        return;
      }

      if (!startTime) {
        setGameState((prev) => ({ ...prev, startTime: Date.now() }));
      }

      if (flippedCards.length >= 2) {
        return;
      }

      const newFlippedCards = [...flippedCards, cardId];
      setGameState((prev) => ({
        ...prev,
        flippedCards: newFlippedCards,
        cards: prev.cards.map((card, index) =>
          index === cardId ? { ...card, isFlipped: true } : card
        ),
      }));

      if (newFlippedCards.length === 2) {
        const [firstId, secondId] = newFlippedCards;
        const firstCard = cards[firstId];
        const secondCard = cards[secondId];

        if (firstCard.content === secondCard.content) {
          setTimeout(() => {
            setGameState((prev) => ({
              ...prev,
              cards: prev.cards.map((card, index) =>
                index === firstId || index === secondId
                  ? { ...card, isMatched: true }
                  : card
              ),
              flippedCards: [],
              moves: prev.moves + 1,
            }));
          }, 500);
        } else {
          setTimeout(() => {
            setGameState((prev) => ({
              ...prev,
              cards: prev.cards.map((card, index) =>
                index === firstId || index === secondId
                  ? { ...card, isFlipped: false }
                  : card
              ),
              flippedCards: [],
              moves: prev.moves + 1,
            }));
          }, 1000);
        }
      }
    },
    [gameState]
  );

  useEffect(() => {
    const allMatched =
      gameState.cards.length > 0 &&
      gameState.cards.every((card) => card.isMatched);

    if (allMatched && !gameState.isComplete) {
      const timeElapsed = Math.floor(
        (Date.now() - gameState.startTime!) / 1000
      );
      const minimumMoves = gameState.cards.length / 2;
      const isPerfect = gameState.moves === minimumMoves;

      setGameState((prev) => ({ ...prev, isComplete: true, timeElapsed }));

      setStats((prev) => ({
        ...prev,
        gamesPlayed: prev.gamesPlayed + 1,
        gamesWon: prev.gamesWon + 1,
        totalMoves: prev.totalMoves + gameState.moves,
        bestMoves: Math.min(prev.bestMoves, gameState.moves),
        totalTime: prev.totalTime + timeElapsed,
        bestTime: Math.min(
          prev.bestTime === Infinity ? timeElapsed : prev.bestTime,
          timeElapsed
        ),
        perfectGames: isPerfect ? prev.perfectGames + 1 : prev.perfectGames,
      }));
    }
  }, [
    gameState.cards,
    gameState.isComplete,
    gameState.moves,
    gameState.startTime,
  ]);

  const setDifficulty = useCallback(
    (difficulty: MemoryDifficulty) => {
      startNewGame(difficulty);
    },
    [startNewGame]
  );

  const resetStats = useCallback(() => {
    setStats({
      gamesPlayed: 0,
      gamesWon: 0,
      totalMoves: 0,
      bestMoves: Infinity,
      totalTime: 0,
      bestTime: Infinity,
      perfectGames: 0,
    });
  }, []);

  const getWinRate = () => {
    if (stats.gamesPlayed === 0) return 0;
    return Math.round((stats.gamesWon / stats.gamesPlayed) * 100);
  };

  const getAverageMoves = () => {
    if (stats.gamesWon === 0) return 0;
    return Math.round(stats.totalMoves / stats.gamesWon);
  };

  useEffect(() => {
    startNewGame();
  }, []);

  return {
    gameState,
    stats,
    flipCard,
    startNewGame,
    setDifficulty,
    resetStats,
    getWinRate,
    getAverageMoves,
  };
};
