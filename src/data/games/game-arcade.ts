export interface Game {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  difficulty: string;
  features: string[];
  tech: string;
}

export const games: Game[] = [
  {
    id: 'hangman',
    title: 'Programming Hangman',
    description:
      'Test your knowledge of programming terms in this classic word-guessing game. Can you save the stick figure from its doom?',
    icon: '🎯',
    color: 'from-red-400 to-pink-400',
    difficulty: 'Medium',
    features: [
      '50+ Programming Terms',
      'Hints System',
      'Streak Tracking',
      'Achievements',
    ],
    tech: 'React + TypeScript',
  },
  {
    id: 'tic-tac-toe',
    title: 'Tic-Tac-Toe AI Challenge',
    description:
      'Face off against an unbeatable AI in this classic game. Choose your difficulty and see if you can outsmart the machine!',
    icon: '🤖',
    color: 'from-blue-400 to-cyan-400',
    difficulty: 'Variable',
    features: [
      '3 AI Difficulties',
      'Minimax Algorithm',
      'Win Statistics',
      'Perfect AI Mode',
    ],
    tech: 'React + AI Logic',
  },
  {
    id: 'coin-flip',
    title: 'Crypto Coin Flip',
    description:
      'Take your chances with our crypto-themed coin flip game! Choose your coin, place your bets, and ride the winning streaks.',
    icon: '🪙',
    color: 'from-yellow-400 to-orange-400',
    difficulty: 'Easy',
    features: [
      '4 Coin Types',
      'Betting System',
      'Streak Multipliers',
      'Point Economy',
    ],
    tech: 'React + Animations',
  },
  {
    id: 'memory-match',
    title: 'Dev Tools Memory Match',
    description:
      'Match pairs of programming languages and tools in this brain-training memory game. How fast can you clear the board?',
    icon: '🧠',
    color: 'from-purple-400 to-pink-400',
    difficulty: 'Variable',
    features: [
      '3 Difficulty Levels',
      'Timer Challenge',
      '3D Card Flips',
      'Perfect Game Bonus',
    ],
    tech: 'React + CSS 3D',
  },
];
