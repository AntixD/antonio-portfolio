import { Achievement } from '@/types/games';

export const PROGRAMMING_PAIRS = [
  { content: 'JavaScript', emoji: '🟨' },
  { content: 'Python', emoji: '🐍' },
  { content: 'React', emoji: '⚛️' },
  { content: 'Vue', emoji: '💚' },
  { content: 'Angular', emoji: '🔺' },
  { content: 'TypeScript', emoji: '🔷' },
  { content: 'Node.js', emoji: '🟢' },
  { content: 'Git', emoji: '🔀' },
  { content: 'Docker', emoji: '🐳' },
  { content: 'Kubernetes', emoji: '☸️' },
  { content: 'MongoDB', emoji: '🍃' },
  { content: 'PostgreSQL', emoji: '🐘' },
  { content: 'Redis', emoji: '🔴' },
  { content: 'GraphQL', emoji: '◈' },
  { content: 'AWS', emoji: '☁️' },
  { content: 'Firebase', emoji: '🔥' },
  { content: 'Rust', emoji: '🦀' },
  { content: 'Go', emoji: '🐹' },
];

export const DIFFICULTY_CONFIG = {
  easy: {
    pairs: 6,
    gridCols: 'grid-cols-3',
    description: '6 pairs - Perfect for warmup',
    color: 'from-green-500 to-emerald-500',
  },
  medium: {
    pairs: 9,
    gridCols: 'grid-cols-4',
    description: '9 pairs - Balanced challenge',
    color: 'from-yellow-500 to-orange-500',
  },
  hard: {
    pairs: 12,
    gridCols: 'grid-cols-4',
    description: '12 pairs - Memory master',
    color: 'from-red-500 to-pink-500',
  },
};

export const MEMORY_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first-match',
    title: 'First Match',
    icon: '🎯',
    condition: (stats) => stats.gamesPlayed >= 1,
  },
  {
    id: 'speed-demon',
    title: 'Speed Demon',
    description: 'Win in under 30 seconds',
    icon: '⚡',
    condition: (stats) => stats.bestTime > 0 && stats.bestTime < 30,
  },
  {
    id: 'perfect-memory',
    title: 'Perfect Memory',
    description: 'Win with minimum moves',
    icon: '🧠',
    condition: (stats) => stats.perfectGames >= 1,
  },
  {
    id: 'persistent',
    title: 'Persistent',
    description: 'Play 25 games',
    icon: '💪',
    condition: (stats) => stats.gamesPlayed >= 25,
  },
  {
    id: 'memory-master',
    title: 'Memory Master',
    description: '90% win rate (10+ games)',
    icon: '👑',
    condition: (stats) =>
      stats.gamesPlayed >= 10 && stats.gamesWon / stats.gamesPlayed >= 0.9,
  },
];
