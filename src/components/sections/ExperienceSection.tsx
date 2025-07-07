'use client';

import React, { memo, useState } from 'react';
import {
  Calendar,
  MapPin,
  Building,
  ChevronDown,
  Award,
  Users,
  TrendingUp,
} from 'lucide-react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { experience } from '../../data/experience';
import { SECTION_TITLES, GRADIENTS } from '../../data/constants';
import SectionTitle from '../ui/SectionTitle';
import { Experience } from '../../types/portfolio';

const ExperienceSection: React.FC = memo(() => {
  const [ref, isVisible] = useIntersectionObserver<HTMLElement>({
    threshold: 0.1,
    triggerOnce: true,
  });

  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set());

  const toggleExpanded = (index: number) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedItems(newExpanded);
  };

  return (
    <section
      id="experience"
      ref={ref}
      className="py-20 px-4 sm:px-6 lg:px-8 relative z-20"
    >
      <div className="max-w-5xl mx-auto">
        <SectionTitle
          title={SECTION_TITLES.experience}
          gradient={GRADIENTS.experience}
        />

        <ExperienceStats isVisible={isVisible} />

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-400 via-blue-500 to-purple-600 hidden md:block"></div>

          <div className="space-y-8">
            {experience.map((exp, index) => (
              <ExperienceCard
                key={index}
                experience={exp}
                index={index}
                isVisible={isVisible}
                isExpanded={expandedItems.has(index)}
                onToggleExpanded={() => toggleExpanded(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});

const ExperienceStats: React.FC<{ isVisible: boolean }> = memo(
  ({ isVisible }) => {
    const stats = [
      {
        icon: Calendar,
        label: 'Years Experience',
        value: '5+',
        color: 'text-cyan-400',
      },
      {
        icon: Building,
        label: 'Companies',
        value: '4',
        color: 'text-blue-400',
      },
      {
        icon: Award,
        label: 'Projects Completed',
        value: '20+',
        color: 'text-purple-400',
      },
      {
        icon: Users,
        label: 'Team Collaborations',
        value: '15+',
        color: 'text-green-400',
      },
    ];

    return (
      <div
        className={`grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 transform transition-all duration-700 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}
      >
        {stats.map(({ icon: Icon, label, value, color }, index) => (
          <div
            key={label}
            className="text-center p-6 glass-effect rounded-xl hover-lift"
            style={{ transitionDelay: `${index * 100}ms` }}
          >
            <Icon className={`w-8 h-8 ${color} mx-auto mb-3`} />
            <div className="text-2xl font-bold mb-1">{value}</div>
            <div className="text-sm text-gray-400">{label}</div>
          </div>
        ))}
      </div>
    );
  }
);

const ExperienceCard: React.FC<{
  experience: Experience;
  index: number;
  isVisible: boolean;
  isExpanded: boolean;
  onToggleExpanded: () => void;
}> = memo(({ experience, index, isVisible, isExpanded, onToggleExpanded }) => (
  <div
    className={`relative flex items-start space-x-6 transform transition-all duration-700 ${
      isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
    }`}
    style={{ transitionDelay: `${index * 200}ms` }}
  >
    <div className="hidden md:flex flex-shrink-0 items-center justify-center">
      <div
        className={`w-16 h-16 bg-gradient-to-br ${experience.color} rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg relative z-10`}
      >
        {experience.year}
      </div>
    </div>

    {/* Content Card */}
    <div className="flex-1">
      <div className="glass-effect rounded-xl p-6 hover:shadow-xl transition-all duration-300 border border-gray-800/50">
        <ExperienceHeader
          experience={experience}
          isExpanded={isExpanded}
          onToggleExpanded={onToggleExpanded}
        />

        <ExperienceDetails experience={experience} />

        <ExperienceDescription
          description={experience.description}
          isExpanded={isExpanded}
        />

        <ExperienceMetrics experience={experience} index={index} />
      </div>
    </div>
  </div>
));

const ExperienceHeader: React.FC<{
  experience: Experience;
  isExpanded: boolean;
  onToggleExpanded: () => void;
}> = memo(({ experience, isExpanded, onToggleExpanded }) => (
  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
    <div className="flex-1">
      <div className="flex items-center gap-3 mb-2">
        <h3 className="text-xl font-bold">{experience.title}</h3>
        <button
          onClick={onToggleExpanded}
          className="p-1 rounded-full hover:bg-gray-700/50 transition-colors duration-200"
          aria-label={isExpanded ? 'Collapse details' : 'Expand details'}
        >
          <ChevronDown
            className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${
              isExpanded ? 'rotate-180' : ''
            }`}
          />
        </button>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
        <div className="flex items-center gap-2">
          <Building className="w-4 h-4 text-cyan-400" />
          <span className="text-cyan-400 font-semibold">
            {experience.company}
          </span>
        </div>
        <span className="hidden sm:block text-gray-500">•</span>
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-gray-500" />
          <span className="text-gray-500 text-sm">{experience.location}</span>
        </div>
      </div>
    </div>

    <div className="flex items-center gap-2 text-sm text-gray-500 mt-2 sm:mt-0">
      <Calendar className="w-4 h-4" />
      <span>{experience.period}</span>
    </div>
  </div>
));

const ExperienceDetails: React.FC<{ experience: Experience }> = memo(
  ({ experience }) => (
    <div className="mb-4">
      <div className="flex items-center gap-2 mb-2">
        <div
          className={`w-2 h-2 bg-gradient-to-r ${experience.color} rounded-full`}
        ></div>
        <span className="text-sm font-medium text-gray-300">Key Role</span>
      </div>
    </div>
  )
);

const ExperienceDescription: React.FC<{
  description: string;
  isExpanded: boolean;
}> = memo(({ description, isExpanded }) => (
  <div
    className={`overflow-hidden transition-all duration-300 ${
      isExpanded ? 'max-h-40' : 'max-h-20'
    }`}
  >
    <p className="text-gray-400 leading-relaxed">{description}</p>
  </div>
));

const ExperienceMetrics: React.FC<{
  experience: Experience;
  index: number;
}> = memo(({ experience, index }) => {
  const getMetrics = (company: string) => {
    switch (company) {
      case 'LostHex':
        return [
          { label: 'Platform Features', value: '15+', icon: TrendingUp },
          { label: 'User Growth', value: '200%', icon: Users },
        ];
      case 'Upheave Technologies':
        return [
          { label: 'Applications Built', value: '8', icon: TrendingUp },
          { label: 'Performance Gain', value: '40%', icon: Award },
        ];
      case 'Netscale Agency':
        return [
          { label: 'Client Projects', value: '12+', icon: Building },
          { label: 'Team Size', value: '6', icon: Users },
        ];
      case 'Microsoft':
        return [
          { label: 'Time Saved', value: '4hrs', icon: TrendingUp },
          { label: 'Efficiency Gain', value: '40%', icon: Award },
        ];
      default:
        return [];
    }
  };

  const metrics = getMetrics(experience.company);

  if (metrics.length === 0) return null;

  return (
    <div className="mt-6 pt-4 border-t border-gray-800/50">
      <div className="grid grid-cols-2 gap-4">
        {metrics.map(({ label, value, icon: Icon }, metricIndex) => (
          <div
            key={label}
            className="text-center p-3 bg-gray-800/30 rounded-lg"
            style={{ animationDelay: `${index * 200 + metricIndex * 100}ms` }}
          >
            <Icon className="w-5 h-5 text-cyan-400 mx-auto mb-1" />
            <div className="text-lg font-bold text-white">{value}</div>
            <div className="text-xs text-gray-400">{label}</div>
          </div>
        ))}
      </div>
    </div>
  );
});

ExperienceSection.displayName = 'ExperienceSection';
ExperienceStats.displayName = 'ExperienceStats';
ExperienceCard.displayName = 'ExperienceCard';
ExperienceHeader.displayName = 'ExperienceHeader';
ExperienceDetails.displayName = 'ExperienceDetails';
ExperienceDescription.displayName = 'ExperienceDescription';
ExperienceMetrics.displayName = 'ExperienceMetrics';

export default ExperienceSection;
