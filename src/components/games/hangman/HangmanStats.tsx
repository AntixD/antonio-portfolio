import React from 'react';
import { Lightbulb, Skull } from 'lucide-react';
import { PROGRAMMING_WORDS } from '@/data/games/hangman';

export const HangmanStats: React.FC = () => {
  return (
    <>
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
    </>
  );
};
