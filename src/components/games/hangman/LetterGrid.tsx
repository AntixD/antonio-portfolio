import React from 'react';

interface LetterGridProps {
  guessedLetters: Set<string>;
  currentWord: string;
  onLetterClick: (letter: string) => void;
  disabled: boolean;
}

export const LetterGrid: React.FC<LetterGridProps> = ({
  guessedLetters,
  currentWord,
  onLetterClick,
  disabled,
}) => {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  return (
    <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
      <div className="text-center mb-4">
        <div className="text-lg font-semibold text-gray-300">
          Click a letter to guess:
        </div>
      </div>
      <div className="grid grid-cols-6 md:grid-cols-9 gap-2">
        {alphabet.split('').map((letter) => {
          const isGuessed = guessedLetters.has(letter);
          const isCorrect = isGuessed && currentWord.includes(letter);
          const isWrong = isGuessed && !currentWord.includes(letter);

          return (
            <button
              key={letter}
              onClick={() => onLetterClick(letter)}
              disabled={isGuessed || disabled}
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
    </div>
  );
};
