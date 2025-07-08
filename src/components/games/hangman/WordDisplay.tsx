import React from 'react';

interface WordDisplayProps {
  currentWord: string;
  guessedLetters: Set<string>;
}

export const WordDisplay: React.FC<WordDisplayProps> = ({
  currentWord,
  guessedLetters,
}) => {
  return (
    <div className="text-center bg-gray-900/50 rounded-xl p-8 border border-gray-800">
      <div className="mb-6">
        {currentWord.split('').map((letter, index) => (
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
        ))}
      </div>
      <div className="text-sm text-gray-400">
        Length: {currentWord.length} letters
      </div>
    </div>
  );
};
