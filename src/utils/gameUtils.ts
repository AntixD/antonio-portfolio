import { Board, Player, GameMode, TicTacToeWinner } from '../types/games';
import { WORD_CATEGORIES, PROGRAMMING_WORDS } from '../data/games';

export const getRandomWord = (): string => {
  return PROGRAMMING_WORDS[
    Math.floor(Math.random() * PROGRAMMING_WORDS.length)
  ];
};

export const getWordCategory = (word: string): string => {
  const { languages, frameworks, concepts, databases, tools } = WORD_CATEGORIES;

  if (languages.includes(word)) return 'Programming Language/Technology';
  if (frameworks.includes(word)) return 'Framework/Library';
  if (concepts.includes(word)) return 'Programming Concept';
  if (databases.includes(word)) return 'Database/Data Technology';
  if (tools.includes(word)) return 'Development Tool';
  return 'Programming Term';
};

export const checkWinner = (board: Board): TicTacToeWinner => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
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
};

export const minimax = (
  board: Board,
  depth: number,
  isMaximizing: boolean
): number => {
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
};

export const getAiMove = (board: Board, mode: GameMode): number => {
  const availableMoves = board
    .map((cell, index) => (cell === null ? index : null))
    .filter((val) => val !== null) as number[];

  if (availableMoves.length === 0) return -1;

  switch (mode) {
    case 'easy':
      return availableMoves[Math.floor(Math.random() * availableMoves.length)];

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
};

export const calculateWinRate = (wins: number, total: number): number => {
  if (total === 0) return 0;
  return Math.round((wins / total) * 100);
};
