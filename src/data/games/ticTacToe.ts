import { Achievement, TicTacToeGameMode } from '@/types/games';

export const WINNING_LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export const GAME_MODE_CONFIG: Record<
  TicTacToeGameMode,
  {
    description: string;
    color: string;
    thinkingTime: number;
  }
> = {
  easy: {
    description: 'AI makes random moves - perfect for beginners!',
    color: 'from-green-500 to-emerald-500',
    thinkingTime: 500,
  },
  medium: {
    description: 'AI is smart but makes occasional mistakes',
    color: 'from-yellow-500 to-orange-500',
    thinkingTime: 500,
  },
  impossible: {
    description: 'Perfect AI - good luck beating this! 😈',
    color: 'from-red-500 to-pink-500',
    thinkingTime: 1000,
  },
};

interface TicTacToeStats {
  playerWins: number;
  gamesPlayed: number;
}

type TicTacToeGameModeType = 'easy' | 'medium' | 'impossible';

interface TicTacToeAchievement extends Achievement {
  condition: (
    stats: TicTacToeStats,
    gameMode?: TicTacToeGameModeType
  ) => boolean;
}

export const TICTACTOE_ACHIEVEMENTS: TicTacToeAchievement[] = [
  {
    id: 'first-victory',
    title: 'First Victory',
    icon: '🏆',
    condition: (stats: TicTacToeStats) => stats.playerWins >= 1,
  },
  {
    id: 'triple-threat',
    title: 'Triple Threat',
    icon: '🎯',
    condition: (stats: TicTacToeStats) => stats.playerWins >= 3,
  },
  {
    id: 'ai-challenger',
    title: 'AI Challenger',
    icon: '⚡',
    condition: (stats: TicTacToeStats) =>
      stats.gamesPlayed >= 10 &&
      (stats.playerWins / stats.gamesPlayed) * 100 >= 50,
  },
  {
    id: 'impossible-beaten',
    title: 'Impossible Beaten',
    icon: '🧠',
    condition: (stats: TicTacToeStats, gameMode?: TicTacToeGameModeType) =>
      gameMode === 'impossible' && stats.playerWins > 0,
  },
];

export const FUN_FACTS = [
  'The AI uses the Minimax algorithm',
  'In impossible mode, the AI is unbeatable',
  'There are 255,168 possible games',
  'Perfect play always results in a draw',
];
