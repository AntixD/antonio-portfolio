import React, { memo } from 'react';

const LoadingSpinner: React.FC = memo(() => {
  return (
    <div className="flex items-center justify-center py-20">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-gray-800 border-t-cyan-400 rounded-full animate-spin"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 border-2 border-gray-600 border-b-blue-400 rounded-full animate-spin animate-reverse"></div>
      </div>
    </div>
  );
});

LoadingSpinner.displayName = 'LoadingSpinner';

export default LoadingSpinner;
