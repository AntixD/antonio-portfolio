import { useState, useCallback } from 'react';
import {
  TicTacToeStats,
  TicTacToeGameState,
  GameMode,
  Player,
} from '../types/games';
import { checkWinner, getAiMove } from '../utils/gameUtils';

export const useTicTacToeGame = () => {
  const [gameState, setGameState] = useState<TicTacToeGameState>({
    board: Array(9).fill(null),
    isPlayerTurn: true,
    winner: null,
    gameMode: 'medium',
    isAiThinking: false,
  });

  const [stats, setStats] = useState<TicTacToeStats>({
    playerWins: 0,
    aiWins: 0,
    draws: 0,
    gamesPlayed: 0,
  });

  const updateStats = useCallback((result: Player | 'draw') => {
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
      if (
        gameState.board[index] ||
        gameState.winner ||
        !gameState.isPlayerTurn ||
        gameState.isAiThinking
      )
        return;

      const newBoard = [...gameState.board];
      newBoard[index] = 'X';

      setGameState((prev) => ({
        ...prev,
        board: newBoard,
        isPlayerTurn: false,
      }));

      const gameResult = checkWinner(newBoard);
      if (gameResult) {
        setGameState((prev) => ({ ...prev, winner: gameResult }));
        updateStats(gameResult);
        return;
      }

      // AI turn
      setGameState((prev) => ({ ...prev, isAiThinking: true }));

      setTimeout(
        () => {
          const aiMove = getAiMove(newBoard, gameState.gameMode);
          if (aiMove !== -1) {
            newBoard[aiMove] = 'O';
            const finalResult = checkWinner(newBoard);

            setGameState((prev) => ({
              ...prev,
              board: newBoard,
              winner: finalResult,
              isPlayerTurn: !finalResult,
              isAiThinking: false,
            }));

            if (finalResult) {
              updateStats(finalResult);
            }
          } else {
            setGameState((prev) => ({ ...prev, isAiThinking: false }));
          }
        },
        gameState.gameMode === 'impossible' ? 1000 : 500
      );
    },
    [gameState, updateStats]
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
    (mode: GameMode) => {
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
  };
};
