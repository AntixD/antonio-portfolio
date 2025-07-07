'use client';

import React, { memo } from 'react';
import { ChevronDown, ArrowRight, MapPin, Phone } from 'lucide-react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { personalInfo } from '../../data/personalInfo';
import GradientButton from '../ui/GradientButton';
import SocialLinks from '../ui/SocialLinks';
import { usePortfolio } from '@/context/PortfolioContext';

const HeroSection: React.FC = memo(() => {
  const { scrollToSection } = usePortfolio();
  const [ref, isVisible] = useIntersectionObserver<HTMLElement>({
    threshold: 0.5,
    triggerOnce: true,
  });

  return (
    <section
      id="home"
      ref={ref}
      className="min-h-screen flex items-center justify-center relative z-20"
    >
      <div className="text-center px-4">
        <div
          className={`transform transition-all duration-1000 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <h1 className="text-5xl md:text-8xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">
              {personalInfo.name}
            </span>
          </h1>

          <p className="text-xl md:text-2xl mb-4 text-gray-300">
            {personalInfo.title}
          </p>

          <div className="flex items-center justify-center gap-4 mb-8 text-gray-400">
            <ContactItem icon={MapPin} text={personalInfo.contact.location} />
            <ContactItem icon={Phone} text={personalInfo.contact.phone} />
          </div>

          <p className="text-lg mb-12 max-w-3xl mx-auto text-gray-400 leading-relaxed">
            {personalInfo.description}
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
            <GradientButton
              onClick={() => scrollToSection('projects')}
              className="from-cyan-500 to-blue-600"
            >
              <span>View My Projects</span>
              <ArrowRight className="w-4 h-4" />
            </GradientButton>

            <button
              onClick={() => scrollToSection('contact')}
              className="border-2 border-cyan-500 text-cyan-400 px-8 py-3 rounded-full font-semibold hover:bg-cyan-500 hover:text-black transition-all duration-300"
            >
              Get In Touch
            </button>
          </div>
        </div>

        <SocialLinks />
      </div>

      <ScrollDownIndicator />
    </section>
  );
});

HeroSection.displayName = 'HeroSection';

const ContactItem: React.FC<{ icon: React.ElementType; text: string }> = ({
  icon: Icon,
  text,
}) => (
  <div className="flex items-center gap-2">
    <Icon className="w-4 h-4" />
    <span>{text}</span>
  </div>
);

const ScrollDownIndicator: React.FC = () => (
  <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
    <ChevronDown className="w-6 h-6 text-cyan-400" />
  </div>
);

export default HeroSection;
