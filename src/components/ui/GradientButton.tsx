import React, { memo } from 'react';

interface GradientButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

const GradientButton: React.FC<GradientButtonProps> = memo(
  ({
    children,
    onClick,
    className = 'from-cyan-500 to-blue-600',
    disabled = false,
  }) => {
    return (
      <button
        onClick={onClick}
        disabled={disabled}
        className={`bg-gradient-to-r ${className} text-white px-8 py-3 rounded-full font-semibold hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        {children}
      </button>
    );
  }
);

GradientButton.displayName = 'GradientButton';

export default GradientButton;
