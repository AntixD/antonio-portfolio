import React from 'react';

interface HangmanDrawingProps {
  wrongGuessesCount: number;
  maxWrongGuesses: number;
}

export const HangmanDrawing: React.FC<HangmanDrawingProps> = ({
  wrongGuessesCount,
  maxWrongGuesses,
}) => {
  const parts = [
    '  ┌─────┐',
    '  │     │',
    '  │     ' + (wrongGuessesCount >= 1 ? '😵' : ''),
    '  │    ' +
      (wrongGuessesCount >= 2 ? '/' : ' ') +
      (wrongGuessesCount >= 3 ? '│' : '') +
      (wrongGuessesCount >= 4 ? '\\' : ''),
    '  │    ' +
      (wrongGuessesCount >= 5 ? '/' : ' ') +
      ' ' +
      (wrongGuessesCount >= 6 ? '\\' : ''),
    '  │',
    '──┴──',
  ];

  return (
    <div className="text-center font-mono text-sm leading-tight bg-gray-900/50 p-6 rounded-xl border border-gray-700">
      <div className="text-gray-400 mb-2">
        Wrong guesses: {wrongGuessesCount}/{maxWrongGuesses}
      </div>
      <pre className="text-cyan-400 text-lg">{parts.join('\n')}</pre>
    </div>
  );
};
