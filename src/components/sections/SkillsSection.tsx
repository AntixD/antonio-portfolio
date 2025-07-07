import React, { memo } from 'react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { skills } from '../../data/skills';
import { SECTION_TITLES, GRADIENTS } from '../../data/constants';
import SectionTitle from '../ui/SectionTitle';
import SkillCard from '../ui/SkillCard';

const SkillsSection: React.FC = memo(() => {
  const [ref, isVisible] = useIntersectionObserver<HTMLElement>({
    threshold: 0.2,
    triggerOnce: true,
  });

  return (
    <section
      id="skills"
      ref={ref}
      className="py-20 px-4 sm:px-6 lg:px-8 relative z-20"
    >
      <div className="max-w-7xl mx-auto">
        <SectionTitle
          title={SECTION_TITLES.skills}
          gradient={GRADIENTS.skills}
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {skills.map((skill, index) => (
            <SkillCard
              key={skill.name}
              skill={skill}
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>
      </div>
    </section>
  );
});

SkillsSection.displayName = 'SkillsSection';

export default SkillsSection;
