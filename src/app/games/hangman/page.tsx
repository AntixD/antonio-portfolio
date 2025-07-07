'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  RotateCcw,
  Trophy,
  Lightbulb,
  Target,
  Skull,
} from 'lucide-react';

interface GameStats {
  wins: number;
  losses: number;
  gamesPlayed: number;
  currentStreak: number;
  bestStreak: number;
}

const PROGRAMMING_WORDS = [
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

export default function HangmanPage() {
  const [currentWord, setCurrentWord] = useState('');
  const [guessedLetters, setGuessedLetters] = useState<Set<string>>(new Set());
  const [wrongGuesses, setWrongGuesses] = useState<string[]>([]);
  const [gameStatus, setGameStatus] = useState<'playing' | 'won' | 'lost'>(
    'playing'
  );
  const [stats, setStats] = useState<GameStats>({
    wins: 0,
    losses: 0,
    gamesPlayed: 0,
    currentStreak: 0,
    bestStreak: 0,
  });
  const [hint, setHint] = useState('');
  const [showHint, setShowHint] = useState(false);

  const maxWrongGuesses = 6;

  // Word categories for hints
  const getWordCategory = (word: string): string => {
    const languages = ['JAVASCRIPT', 'TYPESCRIPT', 'PYTHON', 'HTML', 'CSS'];
    const frameworks = [
      'REACT',
      'ANGULAR',
      'NEXTJS',
      'NUXTJS',
      'JQUERY',
      'TAILWIND',
      'BOOTSTRAP',
    ];
    const concepts = [
      'ALGORITHM',
      'RECURSION',
      'CLOSURE',
      'PROMISE',
      'ASYNC',
      'AWAIT',
      'CALLBACK',
      'VARIABLE',
      'FUNCTION',
    ];
    const databases = ['MONGODB', 'POSTGRESQL', 'MYSQL', 'REDIS', 'GRAPHQL'];
    const tools = [
      'GIT',
      'GITHUB',
      'DOCKER',
      'KUBERNETES',
      'AWS',
      'AZURE',
      'FIREBASE',
    ];

    if (languages.includes(word)) return 'Programming Language/Technology';
    if (frameworks.includes(word)) return 'Framework/Library';
    if (concepts.includes(word)) return 'Programming Concept';
    if (databases.includes(word)) return 'Database/Data Technology';
    if (tools.includes(word)) return 'Development Tool';
    return 'Programming Term';
  };

  // Initialize new game
  const startNewGame = useCallback(() => {
    const randomWord =
      PROGRAMMING_WORDS[Math.floor(Math.random() * PROGRAMMING_WORDS.length)];
    setCurrentWord(randomWord);
    setGuessedLetters(new Set());
    setWrongGuesses([]);
    setGameStatus('playing');
    setHint(getWordCategory(randomWord));
    setShowHint(false);
  }, []);

  // Initialize game on component mount
  useEffect(() => {
    startNewGame();
  }, [startNewGame]);

  // Check game status
  useEffect(() => {
    if (!currentWord) return;

    const wordLetters = new Set(currentWord.split(''));
    const correctGuesses = new Set(
      [...guessedLetters].filter((letter) => wordLetters.has(letter))
    );

    if (wordLetters.size === correctGuesses.size && gameStatus === 'playing') {
      setGameStatus('won');
      setStats((prev) => ({
        ...prev,
        wins: prev.wins + 1,
        gamesPlayed: prev.gamesPlayed + 1,
        currentStreak: prev.currentStreak + 1,
        bestStreak: Math.max(prev.bestStreak, prev.currentStreak + 1),
      }));
    } else if (
      wrongGuesses.length >= maxWrongGuesses &&
      gameStatus === 'playing'
    ) {
      setGameStatus('lost');
      setStats((prev) => ({
        ...prev,
        losses: prev.losses + 1,
        gamesPlayed: prev.gamesPlayed + 1,
        currentStreak: 0,
      }));
    }
  }, [currentWord, guessedLetters, wrongGuesses, gameStatus]);

  // Handle letter guess
  const guessLetter = (letter: string) => {
    if (guessedLetters.has(letter) || gameStatus !== 'playing') return;

    const newGuessedLetters = new Set(guessedLetters);
    newGuessedLetters.add(letter);
    setGuessedLetters(newGuessedLetters);

    if (!currentWord.includes(letter)) {
      setWrongGuesses((prev) => [...prev, letter]);
    }
  };

  // Render word with guessed letters
  const renderWord = () => {
    return currentWord.split('').map((letter, index) => (
      <span
        key={index}
        className={`inline-block w-8 h-10 mx-1 text-center text-2xl font-bold border-b-2 transition-all duration-300 ${
          guessedLetters.has(letter)
            ? 'text-cyan-400 border-cyan-400'
            : 'text-transparent border-gray-600'
        }`}
      >
        {guessedLetters.has(letter) ? letter : ''}
      </span>
    ));
  };

  // Render hangman drawing
  const renderHangman = () => {
    const parts = [
      '  ┌─────┐',
      '  │     │',
      '  │     ' + (wrongGuesses.length >= 1 ? '😵' : ''),
      '  │    ' +
        (wrongGuesses.length >= 2 ? '/' : ' ') +
        (wrongGuesses.length >= 3 ? '│' : '') +
        (wrongGuesses.length >= 4 ? '\\' : ''),
      '  │    ' +
        (wrongGuesses.length >= 5 ? '/' : ' ') +
        ' ' +
        (wrongGuesses.length >= 6 ? '\\' : ''),
      '  │',
      '──┴──',
    ];

    return (
      <div className="text-center font-mono text-sm leading-tight bg-gray-900/50 p-6 rounded-xl border border-gray-700">
        <div className="text-gray-400 mb-2">
          Wrong guesses: {wrongGuesses.length}/{maxWrongGuesses}
        </div>
        <pre className="text-cyan-400 text-lg">{parts.join('\n')}</pre>
      </div>
    );
  };

  // Render alphabet
  const renderAlphabet = () => {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    return (
      <div className="grid grid-cols-6 md:grid-cols-9 gap-2">
        {alphabet.split('').map((letter) => {
          const isGuessed = guessedLetters.has(letter);
          const isCorrect = isGuessed && currentWord.includes(letter);
          const isWrong = isGuessed && !currentWord.includes(letter);

          return (
            <button
              key={letter}
              onClick={() => guessLetter(letter)}
              disabled={isGuessed || gameStatus !== 'playing'}
              className={`w-10 h-10 rounded-lg font-bold transition-all duration-300 transform hover:scale-110 disabled:cursor-not-allowed ${
                isCorrect
                  ? 'bg-green-500 text-white'
                  : isWrong
                  ? 'bg-red-500 text-white'
                  : !isGuessed
                  ? 'bg-gray-700 hover:bg-gray-600 text-white'
                  : 'bg-gray-800 text-gray-500'
              }`}
            >
              {letter}
            </button>
          );
        })}
      </div>
    );
  };

  const getWinRate = () => {
    if (stats.gamesPlayed === 0) return 0;
    return Math.round((stats.wins / stats.gamesPlayed) * 100);
  };

  const resetStats = () => {
    setStats({
      wins: 0,
      losses: 0,
      gamesPlayed: 0,
      currentStreak: 0,
      bestStreak: 0,
    });
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link
            href="/games"
            className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-all duration-300 transform hover:scale-105"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Games</span>
          </Link>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent">
            Programming Hangman
          </h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Game Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Game Status */}
            <div className="text-center bg-gray-900/50 rounded-xl p-6 border border-gray-800">
              {gameStatus === 'won' && (
                <div className="space-y-4">
                  <div className="text-3xl">🎉</div>
                  <div className="text-2xl font-bold text-green-400">
                    Congratulations!
                  </div>
                  <div className="text-gray-300">
                    You guessed the word correctly!
                  </div>
                </div>
              )}
              {gameStatus === 'lost' && (
                <div className="space-y-4">
                  <div className="text-3xl">💀</div>
                  <div className="text-2xl font-bold text-red-400">
                    Game Over!
                  </div>
                  <div className="text-gray-300">
                    The word was:{' '}
                    <span className="text-cyan-400 font-bold">
                      {currentWord}
                    </span>
                  </div>
                </div>
              )}
              {gameStatus === 'playing' && (
                <div className="space-y-4">
                  <div className="text-2xl font-bold text-cyan-400">
                    Guess the Programming Term!
                  </div>
                  <div className="flex items-center justify-center gap-4">
                    <button
                      onClick={() => setShowHint(!showHint)}
                      className="flex items-center gap-2 text-yellow-400 hover:text-yellow-300 transition-colors duration-300"
                    >
                      <Lightbulb className="w-4 h-4" />
                      <span>Hint</span>
                    </button>
                    {showHint && (
                      <div className="text-sm text-gray-400 bg-gray-800 px-3 py-1 rounded-full">
                        Category: {hint}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {(gameStatus === 'won' || gameStatus === 'lost') && (
                <button
                  onClick={startNewGame}
                  className="mt-4 flex items-center gap-2 mx-auto bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-full font-semibold hover:scale-105 transition-transform duration-300"
                >
                  <RotateCcw className="w-4 h-4" />
                  New Game
                </button>
              )}
            </div>

            {/* Word Display */}
            <div className="text-center bg-gray-900/50 rounded-xl p-8 border border-gray-800">
              <div className="mb-6">{renderWord()}</div>
              <div className="text-sm text-gray-400">
                Length: {currentWord.length} letters
              </div>
            </div>

            {/* Hangman Drawing */}
            {renderHangman()}

            {/* Wrong Letters */}
            {wrongGuesses.length > 0 && (
              <div className="text-center bg-gray-900/50 rounded-xl p-4 border border-gray-800">
                <div className="text-red-400 font-semibold mb-2">
                  Wrong Guesses:
                </div>
                <div className="flex justify-center gap-2">
                  {wrongGuesses.map((letter, index) => (
                    <span
                      key={index}
                      className="bg-red-500/20 text-red-400 px-2 py-1 rounded"
                    >
                      {letter}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Alphabet */}
            <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
              <div className="text-center mb-4">
                <div className="text-lg font-semibold text-gray-300">
                  Click a letter to guess:
                </div>
              </div>
              {renderAlphabet()}
            </div>
          </div>

          {/* Stats and Info Panel */}
          <div className="space-y-6">
            {/* Game Statistics */}
            <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-400" />
                Game Statistics
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Games Won:</span>
                  <span className="text-green-400 font-bold">{stats.wins}</span>
                </div>
                <div className="flex justify-between">
                  <span>Games Lost:</span>
                  <span className="text-red-400 font-bold">{stats.losses}</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Played:</span>
                  <span className="text-cyan-400 font-bold">
                    {stats.gamesPlayed}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Win Rate:</span>
                  <span className="text-purple-400 font-bold">
                    {getWinRate()}%
                  </span>
                </div>
                <div className="pt-2 border-t border-gray-700">
                  <div className="flex justify-between">
                    <span>Current Streak:</span>
                    <span className="text-orange-400 font-bold">
                      {stats.currentStreak}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Best Streak:</span>
                    <span className="text-pink-400 font-bold">
                      {stats.bestStreak}
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={resetStats}
                className="w-full mt-4 text-sm text-gray-400 hover:text-white transition-colors duration-300"
              >
                Reset Statistics
              </button>
            </div>

            {/* Achievements */}
            <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Target className="w-5 h-5 text-purple-400" />
                Achievements
              </h3>
              <div className="space-y-3">
                <div
                  className={`flex items-center gap-2 ${
                    stats.wins >= 1 ? 'text-green-400' : 'text-gray-500'
                  }`}
                >
                  <span>{stats.wins >= 1 ? '🎯' : '🔒'}</span>
                  <span className="text-sm">First Victory</span>
                </div>
                <div
                  className={`flex items-center gap-2 ${
                    stats.wins >= 5 ? 'text-green-400' : 'text-gray-500'
                  }`}
                >
                  <span>{stats.wins >= 5 ? '🏆' : '🔒'}</span>
                  <span className="text-sm">Word Master (5 wins)</span>
                </div>
                <div
                  className={`flex items-center gap-2 ${
                    stats.currentStreak >= 3
                      ? 'text-green-400'
                      : 'text-gray-500'
                  }`}
                >
                  <span>{stats.currentStreak >= 3 ? '🔥' : '🔒'}</span>
                  <span className="text-sm">Hot Streak (3 in a row)</span>
                </div>
                <div
                  className={`flex items-center gap-2 ${
                    getWinRate() >= 80 && stats.gamesPlayed >= 10
                      ? 'text-green-400'
                      : 'text-gray-500'
                  }`}
                >
                  <span>
                    {getWinRate() >= 80 && stats.gamesPlayed >= 10
                      ? '🧠'
                      : '🔒'}
                  </span>
                  <span className="text-sm">Genius (80% win rate)</span>
                </div>
                <div
                  className={`flex items-center gap-2 ${
                    stats.wins >= 10 ? 'text-green-400' : 'text-gray-500'
                  }`}
                >
                  <span>{stats.wins >= 10 ? '👑' : '🔒'}</span>
                  <span className="text-sm">Programming Guru</span>
                </div>
              </div>
            </div>

            {/* Game Rules */}
            <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Skull className="w-5 h-5 text-red-400" />
                How to Play
              </h3>
              <div className="space-y-2 text-sm text-gray-400">
                <p>• Guess the programming term letter by letter</p>
                <p>• You have 6 wrong guesses before losing</p>
                <p>• All words are programming-related terms</p>
                <p>• Use the hint button if you're stuck!</p>
                <p>• Try to build up your win streak!</p>
              </div>
            </div>

            {/* Programming Tips */}
            <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-yellow-400" />
                Pro Tips
              </h3>
              <div className="space-y-2 text-sm text-gray-400">
                <p>• Start with common vowels: A, E, I, O, U</p>
                <p>• Try frequent consonants: R, S, T, N, L</p>
                <p>• Think about programming patterns</p>
                <p>• JavaScript terms are very common</p>
                <p>• Framework names often end in JS</p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
              <h3 className="text-xl font-bold mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button
                  onClick={startNewGame}
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 rounded-lg font-semibold hover:scale-105 transition-transform duration-300"
                >
                  <RotateCcw className="w-4 h-4" />
                  New Game
                </button>
                <button
                  onClick={() => setShowHint(!showHint)}
                  disabled={gameStatus !== 'playing'}
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-2 rounded-lg font-semibold hover:scale-105 transition-transform duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Lightbulb className="w-4 h-4" />
                  {showHint ? 'Hide Hint' : 'Show Hint'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Word Bank Preview */}
        <div className="mt-8 bg-gray-900/50 rounded-xl p-6 border border-gray-800">
          <h3 className="text-xl font-bold mb-4 text-center">
            Sample Words You Might Encounter
          </h3>
          <div className="flex flex-wrap justify-center gap-2 text-sm">
            {PROGRAMMING_WORDS.slice(0, 20).map((word, index) => (
              <span
                key={index}
                className="bg-gray-800/50 px-3 py-1 rounded-full text-gray-400"
              >
                {word}
              </span>
            ))}
            <span className="bg-gradient-to-r from-purple-500 to-pink-500 px-3 py-1 rounded-full text-white font-semibold">
              +{PROGRAMMING_WORDS.length - 20} more...
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
