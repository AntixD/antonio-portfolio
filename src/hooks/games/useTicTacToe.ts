import { useState, useCallback, useEffect } from 'react';
import {
  TicTacToeBoard,
  TicTacToeGameMode,
  TicTacToeGameState,
  TicTacToeGameStats,
  TicTacToePlayer,
  TicTacToeWinner,
} from '@/types/games';
import { WINNING_LINES, GAME_MODE_CONFIG } from '@/data/games/ticTacToe';

export const useTicTacToe = () => {
  const [gameState, setGameState] = useState<TicTacToeGameState>({
    board: Array(9).fill(null),
    isPlayerTurn: true,
    winner: null,
    gameMode: 'medium',
    isAiThinking: false,
  });

  const [stats, setStats] = useState<TicTacToeGameStats>({
    playerWins: 0,
    aiWins: 0,
    draws: 0,
    gamesPlayed: 0,
  });

  const checkWinner = useCallback((board: TicTacToeBoard): TicTacToeWinner => {
    for (const [a, b, c] of WINNING_LINES) {
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return board.every((cell) => cell !== null) ? 'draw' : null;
  }, []);

  const minimax = useCallback(
    (board: TicTacToeBoard, depth: number, isMaximizing: boolean): number => {
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

  const getAiMove = useCallback(
    (board: TicTacToeBoard, mode: TicTacToeGameMode): number => {
      const availableMoves = board
        .map((cell, index) => (cell === null ? index : null))
        .filter((val) => val !== null) as number[];

      if (availableMoves.length === 0) return -1;

      switch (mode) {
        case 'easy':
          return availableMoves[
            Math.floor(Math.random() * availableMoves.length)
          ];
        case 'medium':
          if (Math.random() < 0.3) {
            return availableMoves[
              Math.floor(Math.random() * availableMoves.length)
            ];
          }
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

  const updateStats = useCallback((result: TicTacToePlayer | 'draw') => {
    setStats((prev) => ({
      ...prev,
      playerWins: result === 'X' ? prev.playerWins + 1 : prev.playerWins,
      aiWins: result === 'O' ? prev.aiWins + 1 : prev.aiWins,
      draws: result === 'draw' ? prev.draws + 1 : prev.draws,
      gamesPlayed: prev.gamesPlayed + 1,
    }));
  }, []);

  const handleCellClick = useCallback(
    (index: number) => {
      const { board, winner, isPlayerTurn, isAiThinking, gameMode } = gameState;
      if (board[index] || winner || !isPlayerTurn || isAiThinking) return;

      const newBoard = [...board];
      newBoard[index] = 'X';

      const gameResult = checkWinner(newBoard);
      if (gameResult) {
        setGameState((prev) => ({
          ...prev,
          board: newBoard,
          winner: gameResult,
        }));
        updateStats(gameResult);
        return;
      }

      setGameState((prev) => ({
        ...prev,
        board: newBoard,
        isPlayerTurn: false,
        isAiThinking: true,
      }));

      setTimeout(() => {
        const aiMove = getAiMove(newBoard, gameMode);
        if (aiMove !== -1) {
          newBoard[aiMove] = 'O';
          const finalResult = checkWinner(newBoard);

          setGameState((prev) => ({
            ...prev,
            board: [...newBoard],
            winner: finalResult,
            isPlayerTurn: !finalResult,
            isAiThinking: false,
          }));

          if (finalResult) {
            updateStats(finalResult);
          }
        }
      }, GAME_MODE_CONFIG[gameMode].thinkingTime);
    },
    [gameState, checkWinner, getAiMove, updateStats]
  );

  const resetGame = useCallback(() => {
    setGameState((prev) => ({
      ...prev,
      board: Array(9).fill(null),
      isPlayerTurn: true,
      winner: null,
      isAiThinking: false,
    }));
  }, []);

  const setGameMode = useCallback(
    (mode: TicTacToeGameMode) => {
      setGameState((prev) => ({ ...prev, gameMode: mode }));
      resetGame();
    },
    [resetGame]
  );

  const resetStats = useCallback(() => {
    setStats({
      playerWins: 0,
      aiWins: 0,
      draws: 0,
      gamesPlayed: 0,
    });
  }, []);

  return {
    gameState,
    stats,
    handleCellClick,
    resetGame,
    setGameMode,
    resetStats,
    getWinRate: () =>
      stats.gamesPlayed === 0
        ? 0
        : Math.round((stats.playerWins / stats.gamesPlayed) * 100),
  };
};
