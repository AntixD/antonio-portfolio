export interface GameStats {
  wins: number;
  losses: number;
  gamesPlayed: number;
  currentStreak: number;
  bestStreak: number;
}

export interface TicTacToeStats {
  playerWins: number;
  aiWins: number;
  draws: number;
  gamesPlayed: number;
}

export type Player = 'X' | 'O' | null;
export type Board = Player[];
export type GameMode = 'easy' | 'medium' | 'impossible';
export type GameStatus = 'playing' | 'won' | 'lost';
export type TicTacToeWinner = Player | 'draw' | null;

export interface HangmanGameState {
  currentWord: string;
  guessedLetters: Set<string>;
  wrongGuesses: string[];
  gameStatus: GameStatus;
  hint: string;
  showHint: boolean;
}

export interface TicTacToeGameState {
  board: Board;
  isPlayerTurn: boolean;
  winner: TicTacToeWinner;
  gameMode: GameMode;
  isAiThinking: boolean;
}

export interface GameInfo {
  id: string;
  title: string;
  description: string;
  icon: string;
  difficulty: string;
  color: string;
  tech: string;
  features: string[];
}
