import React, { memo } from 'react';

interface SectionTitleProps {
  title: string;
  gradient: string;
}

const SectionTitle: React.FC<SectionTitleProps> = memo(
  ({ title, gradient }) => {
    return (
      <h2
        className={`text-4xl md:text-6xl font-bold text-center mb-16 bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}
      >
        {title}
      </h2>
    );
  }
);

SectionTitle.displayName = 'SectionTitle';

export default SectionTitle;
