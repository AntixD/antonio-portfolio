import { Achievement } from '@/types/games';

export const COIN_TYPES = {
  classic: {
    name: 'Classic Coin',
    icon: '🪙',
    color: 'from-yellow-500 to-amber-500',
    heads: 'Heads',
    tails: 'Tails',
    multiplier: 1,
  },
  bitcoin: {
    name: 'Bitcoin',
    icon: '₿',
    color: 'from-orange-500 to-yellow-500',
    heads: 'To the Moon',
    tails: 'HODL',
    multiplier: 1.5,
  },
  ethereum: {
    name: 'Ethereum',
    icon: 'Ξ',
    color: 'from-purple-500 to-blue-500',
    heads: 'Smart',
    tails: 'Contract',
    multiplier: 1.3,
  },
  doge: {
    name: 'Dogecoin',
    icon: '🐕',
    color: 'from-yellow-400 to-orange-400',
    heads: 'Much Wow',
    tails: 'Very Flip',
    multiplier: 2,
  },
};

export const BET_AMOUNTS = [10, 25, 50, 100, 250, 500];

export const COINFLIP_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first-flip',
    title: 'First Flip',
    icon: '🎯',
    condition: (stats) => stats.totalFlips >= 1,
  },
  {
    id: 'lucky-seven',
    title: 'Lucky Seven',
    description: '7 wins in a row',
    icon: '🍀',
    condition: (stats) => stats.bestStreak >= 7,
  },
  {
    id: 'high-roller',
    title: 'High Roller',
    description: 'Win 1000+ points in one flip',
    icon: '💰',
    condition: (stats) => stats.biggestWin >= 1000,
  },
  {
    id: 'coin-master',
    title: 'Coin Master',
    description: '100 total flips',
    icon: '👑',
    condition: (stats) => stats.totalFlips >= 100,
  },
  {
    id: 'perfect-balance',
    title: 'Perfect Balance',
    description: 'Equal heads and tails (50+ flips)',
    icon: '⚖️',
    condition: (stats) =>
      stats.totalFlips >= 50 &&
      Math.abs(stats.headsCount - stats.tailsCount) <= 2,
  },
];
