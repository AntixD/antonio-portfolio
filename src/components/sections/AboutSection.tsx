'use client';

import React, { memo } from 'react';
import { Code, Palette, Zap, Globe } from 'lucide-react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { personalInfo } from '../../data/personalInfo';
import { SECTION_TITLES, GRADIENTS } from '../../data/constants';
import SectionTitle from '../ui/SectionTitle';

const AboutSection: React.FC = memo(() => {
  const [ref, isVisible] = useIntersectionObserver<HTMLElement>({
    threshold: 0.2,
    triggerOnce: true,
  });

  const features = [
    { icon: Code, text: 'Full-Stack Development', color: 'text-cyan-400' },
    { icon: Palette, text: 'UI/UX Design', color: 'text-blue-400' },
    { icon: Zap, text: 'Performance Optimization', color: 'text-purple-400' },
    { icon: Globe, text: 'Web3 & Blockchain', color: 'text-green-400' },
  ];

  return (
    <section
      id="about"
      ref={ref}
      className="py-20 px-4 sm:px-6 lg:px-8 relative z-20"
    >
      <div className="max-w-7xl mx-auto">
        <SectionTitle title={SECTION_TITLES.about} gradient={GRADIENTS.about} />

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <AboutContent isVisible={isVisible} features={features} />
          <ProfileCard isVisible={isVisible} />
        </div>
      </div>
    </section>
  );
});

const AboutContent: React.FC<{
  isVisible: boolean;
  features: Array<{ icon: React.ElementType; text: string; color: string }>;
}> = memo(({ isVisible, features }) => (
  <div
    className={`space-y-6 transform transition-all duration-700 ${
      isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
    }`}
  >
    <p className="text-lg leading-relaxed text-gray-300">
      I'm an experienced software developer with close to 5 years of experience
      in building scalable, user-friendly web applications. I specialize in
      modern frameworks like React, Next.js, and have extensive experience with
      both frontend and backend technologies.
    </p>

    <p className="text-lg leading-relaxed text-gray-300">
      My expertise spans from traditional web development to cutting-edge Web3
      technologies, blockchain integrations, and complex full-stack
      applications. I'm passionate about creating efficient solutions that
      deliver exceptional user experiences.
    </p>

    <div className="flex flex-wrap gap-4">
      {features.map(({ icon: Icon, text, color }, index) => (
        <div
          key={text}
          className={`flex items-center space-x-2 transform transition-all duration-500`}
          style={{ transitionDelay: `${index * 100 + 300}ms` }}
        >
          <Icon className={`w-5 h-5 ${color}`} />
          <span className="text-gray-300">{text}</span>
        </div>
      ))}
    </div>
  </div>
));

const ProfileCard: React.FC<{ isVisible: boolean }> = memo(({ isVisible }) => (
  <div
    className={`transform transition-all duration-700 ${
      isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
    }`}
    style={{ transitionDelay: '200ms' }}
  >
    <div className="p-8 rounded-2xl glass-effect hover-lift border border-gray-800/50">
      <div className="text-center">
        <div className="w-32 h-32 bg-gradient-to-br from-cyan-500 via-blue-500 to-purple-600 rounded-full mx-auto mb-6 flex items-center justify-center text-6xl">
          👨‍💻
        </div>
        <h3 className="text-2xl font-bold mb-2">{personalInfo.name}</h3>
        <p className="text-gray-400 mb-4">{personalInfo.title}</p>
        <div className="w-16 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 mx-auto mb-4 rounded-full"></div>
        <p className="text-sm text-gray-500 italic">"{personalInfo.tagline}"</p>
      </div>
    </div>
  </div>
));

AboutSection.displayName = 'AboutSection';
AboutContent.displayName = 'AboutContent';
ProfileCard.displayName = 'ProfileCard';

export default AboutSection;
