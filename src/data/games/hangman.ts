import { Achievement } from '@/types/games';

export const PROGRAMMING_WORDS = [
  // Programming Languages
  'JAVASCRIPT',
  'TYPESCRIPT',
  'PYTHON',
  'REACT',
  'ANGULAR',
  'NODEJS',
  'EXPRESS',
  // Web Technologies
  'HTML',
  'CSS',
  'SASS',
  'WEBPACK',
  'BABEL',
  'VITE',
  'NEXTJS',
  'NUXTJS',
  // Concepts
  'ALGORITHM',
  'RECURSION',
  'CLOSURE',
  'PROMISE',
  'ASYNC',
  'AWAIT',
  'CALLBACK',
  'VARIABLE',
  'FUNCTION',
  'OBJECT',
  'ARRAY',
  'STRING',
  'BOOLEAN',
  'INTEGER',
  // Database
  'MONGODB',
  'POSTGRESQL',
  'MYSQL',
  'REDIS',
  'GRAPHQL',
  'REST',
  'API',
  // Tools
  'GIT',
  'GITHUB',
  'DOCKER',
  'KUBERNETES',
  'AWS',
  'AZURE',
  'FIREBASE',
  // Frameworks
  'TAILWIND',
  'BOOTSTRAP',
  'JQUERY',
  'REDUX',
  'VUEX',
  'MOBX',
  'ZUSTAND',
  // Other
  'COMPONENT',
  'PROPS',
  'STATE',
  'HOOK',
  'REDUCER',
  'MIDDLEWARE',
  'ROUTER',
];

export const WORD_CATEGORIES: Record<string, string[]> = {
  'Programming Language/Technology': [
    'JAVASCRIPT',
    'TYPESCRIPT',
    'PYTHON',
    'HTML',
    'CSS',
  ],
  'Framework/Library': [
    'REACT',
    'ANGULAR',
    'NEXTJS',
    'NUXTJS',
    'JQUERY',
    'TAILWIND',
    'BOOTSTRAP',
  ],
  'Programming Concept': [
    'ALGORITHM',
    'RECURSION',
    'CLOSURE',
    'PROMISE',
    'ASYNC',
    'AWAIT',
    'CALLBACK',
    'VARIABLE',
    'FUNCTION',
  ],
  'Database/Data Technology': [
    'MONGODB',
    'POSTGRESQL',
    'MYSQL',
    'REDIS',
    'GRAPHQL',
  ],
  'Development Tool': [
    'GIT',
    'GITHUB',
    'DOCKER',
    'KUBERNETES',
    'AWS',
    'AZURE',
    'FIREBASE',
  ],
};

export const HANGMAN_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first-victory',
    title: 'First Victory',
    icon: '🎯',
    condition: (stats) => stats.wins >= 1,
  },
  {
    id: 'word-master',
    title: 'Word Master',
    description: '5 wins',
    icon: '🏆',
    condition: (stats) => stats.wins >= 5,
  },
  {
    id: 'hot-streak',
    title: 'Hot Streak',
    description: '3 in a row',
    icon: '🔥',
    condition: (stats) => stats.currentStreak >= 3,
  },
  {
    id: 'genius',
    title: 'Genius',
    description: '80% win rate',
    icon: '🧠',
    condition: (stats) =>
      stats.gamesPlayed >= 10 && (stats.wins / stats.gamesPlayed) * 100 >= 80,
  },
  {
    id: 'programming-guru',
    title: 'Programming Guru',
    icon: '👑',
    condition: (stats) => stats.wins >= 10,
  },
];

export const MAX_WRONG_GUESSES = 6;

export const getWordCategory = (word: string): string => {
  for (const [category, words] of Object.entries(WORD_CATEGORIES)) {
    if (words.includes(word)) return category;
  }
  return 'Programming Term';
};
