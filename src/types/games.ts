export interface HangmanGameStats {
  wins: number;
  losses: number;
  gamesPlayed: number;
  currentStreak: number;
  bestStreak: number;
}

export type HangmanGameStatus = 'playing' | 'won' | 'lost';

export interface HangmanGameState {
  currentWord: string;
  guessedLetters: Set<string>;
  wrongGuesses: string[];
  gameStatus: HangmanGameStatus;
  hint: string;
  showHint: boolean;
}

export type TicTacToePlayer = 'X' | 'O' | null;
export type TicTacToeBoard = TicTacToePlayer[];
export type TicTacToeGameMode = 'easy' | 'medium' | 'impossible';
export type TicTacToeWinner = TicTacToePlayer | 'draw' | null;

export interface TicTacToeGameStats {
  playerWins: number;
  aiWins: number;
  draws: number;
  gamesPlayed: number;
}

export interface TicTacToeGameState {
  board: TicTacToeBoard;
  isPlayerTurn: boolean;
  winner: TicTacToeWinner;
  gameMode: TicTacToeGameMode;
  isAiThinking: boolean;
}

export interface Achievement {
  id: string;
  title: string;
  description?: string;
  icon: string;
  condition: (stats: any) => boolean;
}

export interface CoinFlipStats {
  totalFlips: number;
  headsCount: number;
  tailsCount: number;
  currentStreak: number;
  bestStreak: number;
  totalPoints: number;
  biggestWin: number;
  biggestLoss: number;
}

export type CoinSide = 'heads' | 'tails';
export type CoinType = 'classic' | 'bitcoin' | 'ethereum' | 'doge';

export interface CoinFlipGameState {
  isFlipping: boolean;
  lastResult: CoinSide | null;
  prediction: CoinSide | null;
  betAmount: number;
  coinType: CoinType;
  consecutiveWins: number;
  multiplier: number;
}

export interface MemoryCard {
  id: number;
  content: string;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export interface MemoryMatchStats {
  gamesPlayed: number;
  gamesWon: number;
  totalMoves: number;
  bestMoves: number;
  totalTime: number;
  bestTime: number;
  perfectGames: number;
}

export type MemoryDifficulty = 'easy' | 'medium' | 'hard';

export interface MemoryMatchGameState {
  cards: MemoryCard[];
  flippedCards: number[];
  moves: number;
  startTime: number | null;
  isComplete: boolean;
  difficulty: MemoryDifficulty;
  timeElapsed: number;
}
