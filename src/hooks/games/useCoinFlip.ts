import { useState, useCallback, useEffect } from 'react';
import {
  CoinFlipGameState,
  CoinFlipStats,
  CoinSide,
  CoinType,
} from '@/types/games';
import { COIN_TYPES } from '@/data/games/coinFlip';

const INITIAL_POINTS = 1000;

export const useCoinFlip = () => {
  const [gameState, setGameState] = useState<CoinFlipGameState>({
    isFlipping: false,
    lastResult: null,
    prediction: null,
    betAmount: 10,
    coinType: 'classic',
    consecutiveWins: 0,
    multiplier: 1,
  });

  const [stats, setStats] = useState<CoinFlipStats>({
    totalFlips: 0,
    headsCount: 0,
    tailsCount: 0,
    currentStreak: 0,
    bestStreak: 0,
    totalPoints: INITIAL_POINTS,
    biggestWin: 0,
    biggestLoss: 0,
  });

  const setPrediction = useCallback(
    (side: CoinSide) => {
      if (!gameState.isFlipping) {
        setGameState((prev) => ({ ...prev, prediction: side }));
      }
    },
    [gameState.isFlipping]
  );

  const setBetAmount = useCallback(
    (amount: number) => {
      if (!gameState.isFlipping && amount <= stats.totalPoints) {
        setGameState((prev) => ({ ...prev, betAmount: amount }));
      }
    },
    [gameState.isFlipping, stats.totalPoints]
  );

  const setCoinType = useCallback(
    (type: CoinType) => {
      if (!gameState.isFlipping) {
        setGameState((prev) => ({ ...prev, coinType: type }));
      }
    },
    [gameState.isFlipping]
  );

  const calculateWinnings = useCallback(
    (
      won: boolean,
      betAmount: number,
      consecutiveWins: number,
      coinType: CoinType
    ) => {
      if (!won) return -betAmount;

      const baseMultiplier = COIN_TYPES[coinType].multiplier;
      const streakMultiplier = 1 + consecutiveWins * 0.1;
      const totalMultiplier = baseMultiplier * streakMultiplier;

      return Math.floor(betAmount * totalMultiplier);
    },
    []
  );

  const flipCoin = useCallback(() => {
    if (
      gameState.isFlipping ||
      !gameState.prediction ||
      gameState.betAmount > stats.totalPoints
    ) {
      return;
    }

    setGameState((prev) => ({ ...prev, isFlipping: true }));

    setTimeout(() => {
      const result: CoinSide = Math.random() < 0.5 ? 'heads' : 'tails';
      const won = result === gameState.prediction;
      const winnings = calculateWinnings(
        won,
        gameState.betAmount,
        gameState.consecutiveWins,
        gameState.coinType
      );

      setStats((prev) => ({
        ...prev,
        totalFlips: prev.totalFlips + 1,
        headsCount: result === 'heads' ? prev.headsCount + 1 : prev.headsCount,
        tailsCount: result === 'tails' ? prev.tailsCount + 1 : prev.tailsCount,
        currentStreak: won ? prev.currentStreak + 1 : 0,
        bestStreak: won
          ? Math.max(prev.bestStreak, prev.currentStreak + 1)
          : prev.bestStreak,
        totalPoints: prev.totalPoints + winnings,
        biggestWin:
          won && winnings > prev.biggestWin ? winnings : prev.biggestWin,
        biggestLoss:
          !won && Math.abs(winnings) > prev.biggestLoss
            ? Math.abs(winnings)
            : prev.biggestLoss,
      }));

      setGameState((prev) => ({
        ...prev,
        isFlipping: false,
        lastResult: result,
        consecutiveWins: won ? prev.consecutiveWins + 1 : 0,
        multiplier: won ? 1 + (prev.consecutiveWins + 1) * 0.1 : 1,
      }));
    }, 2000);
  }, [gameState, stats.totalPoints, calculateWinnings]);

  const resetStats = useCallback(() => {
    setStats({
      totalFlips: 0,
      headsCount: 0,
      tailsCount: 0,
      currentStreak: 0,
      bestStreak: 0,
      totalPoints: INITIAL_POINTS,
      biggestWin: 0,
      biggestLoss: 0,
    });
    setGameState((prev) => ({
      ...prev,
      consecutiveWins: 0,
      multiplier: 1,
      lastResult: null,
    }));
  }, []);

  const getHeadsPercentage = () => {
    if (stats.totalFlips === 0) return 50;
    return Math.round((stats.headsCount / stats.totalFlips) * 100);
  };

  return {
    gameState,
    stats,
    setPrediction,
    setBetAmount,
    setCoinType,
    flipCoin,
    resetStats,
    getHeadsPercentage,
    canBet: stats.totalPoints >= gameState.betAmount,
  };
};
