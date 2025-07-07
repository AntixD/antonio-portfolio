'use client';

import React, { memo, useState } from 'react';
import { ExternalLink, Github, ChevronLeft, ChevronRight } from 'lucide-react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { projects } from '../../data/projects';
import { SECTION_TITLES, GRADIENTS } from '../../data/constants';
import SectionTitle from '../ui/SectionTitle';
import { Project } from '../../types/portfolio';

const ProjectsSection: React.FC = memo(() => {
  const [ref, isVisible] = useIntersectionObserver<HTMLElement>({
    threshold: 0.1,
    triggerOnce: true,
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [filter, setFilter] = useState<string>('all');

  const filteredProjects =
    filter === 'all'
      ? projects
      : projects.filter((project) =>
          project.tech.some((tech) => {
            const techLower = tech.toLowerCase().replace(/[^a-z0-9]/g, '');
            const filterLower = filter.toLowerCase().replace(/[^a-z0-9]/g, '');

            if (filterLower === 'typescript') {
              return techLower.includes('typescript') || techLower.includes('');
            }
            if (filterLower === 'nextjs') {
              return techLower.includes('next') || techLower.includes('nextjs');
            }
            if (filterLower === 'react') {
              return (
                techLower.includes('react') && !techLower.includes('native')
              );
            }
            if (filterLower === 'blockchain') {
              return (
                techLower.includes('blockchain') ||
                techLower.includes('web3') ||
                techLower.includes('crypto')
              );
            }

            return techLower.includes(filterLower);
          })
        );

  const techFilters = ['all', 'React', 'Next.js', 'Blockchain', 'TypeScript'];

  return (
    <section
      id="projects"
      ref={ref}
      className="py-20 px-4 sm:px-6 lg:px-8 relative z-20"
    >
      <div className="max-w-7xl mx-auto">
        <SectionTitle
          title={SECTION_TITLES.projects}
          gradient={GRADIENTS.projects}
        />

        <ProjectFilters
          filters={techFilters}
          activeFilter={filter}
          onFilterChange={setFilter}
          isVisible={isVisible}
        />

        <ProjectGrid projects={filteredProjects} isVisible={isVisible} />

        <FeaturedProjectCarousel
          projects={filteredProjects.slice(0, 3)}
          currentIndex={currentIndex}
          onIndexChange={setCurrentIndex}
          isVisible={isVisible}
        />
      </div>
    </section>
  );
});

const ProjectFilters: React.FC<{
  filters: string[];
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  isVisible: boolean;
}> = memo(({ filters, activeFilter, onFilterChange, isVisible }) => (
  <div
    className={`flex flex-wrap justify-center gap-4 mb-12 transform transition-all duration-700 ${
      isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
    }`}
  >
    {filters.map((filter, index) => (
      <button
        key={filter}
        onClick={() => onFilterChange(filter)}
        className={`px-6 py-2 rounded-full transition-all duration-300 transform hover:scale-105 ${
          activeFilter === filter
            ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white'
            : 'glass-effect text-gray-300 hover:text-white'
        }`}
        style={{ transitionDelay: `${index * 100}ms` }}
      >
        {filter === 'all' ? 'All Projects' : filter}
      </button>
    ))}
  </div>
));

const ProjectGrid: React.FC<{
  projects: Project[];
  isVisible: boolean;
}> = memo(({ projects, isVisible }) => (
  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
    {projects.map((project, index) => (
      <ProjectCard
        key={project.id}
        project={project}
        index={index}
        isVisible={isVisible}
      />
    ))}
  </div>
));

const ProjectCard: React.FC<{
  project: Project;
  index: number;
  isVisible: boolean;
}> = memo(({ project, index, isVisible }) => (
  <div
    className={`group relative overflow-hidden rounded-xl glass-effect hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-800/50 ${
      isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
    }`}
    style={{ transitionDelay: `${index * 100}ms` }}
  >
    <div
      className={`h-48 bg-gradient-to-br ${project.gradient} flex items-center justify-center text-6xl relative overflow-hidden`}
    >
      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-300"></div>
      <span className="relative z-10 transform group-hover:scale-110 transition-transform duration-300">
        {project.image}
      </span>
      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
        <span className="text-xs text-white bg-black/50 px-2 py-1 rounded backdrop-blur-sm">
          {project.role}
        </span>
      </div>
    </div>

    <div className="p-6">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-xl font-bold group-hover:text-cyan-400 transition-colors duration-300">
          {project.title}
        </h3>
        <ProjectLinks project={project} />
      </div>

      <p className="text-gray-400 mb-4 leading-relaxed text-sm line-clamp-3">
        {project.description}
      </p>

      <div className="flex flex-wrap gap-1 mb-4">
        {project.tech.map((tech, techIndex) => (
          <span
            key={tech}
            className="px-2 py-1 rounded-full text-xs bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 transition-colors duration-200"
            style={{ animationDelay: `${techIndex * 50}ms` }}
          >
            {tech}
          </span>
        ))}
      </div>

      <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
        <div
          className={`h-full bg-gradient-to-r ${
            project.gradient
          } rounded-full transform origin-left transition-transform duration-1000 ${
            isVisible ? 'scale-x-100' : 'scale-x-0'
          }`}
          style={{ transitionDelay: `${index * 100 + 500}ms` }}
        />
      </div>
    </div>
  </div>
));

const ProjectLinks: React.FC<{ project: Project }> = memo(({ project }) => (
  <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
    {project.githubUrl && (
      <a
        href={project.githubUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 rounded-full bg-gray-800/50 hover:bg-gray-700/50 transition-all duration-300 transform hover:scale-110"
        aria-label="View on GitHub"
      >
        <Github className="w-4 h-4" />
      </a>
    )}
    {project.demoUrl && (
      <a
        href={project.demoUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 rounded-full bg-gray-800/50 hover:bg-gray-700/50 transition-all duration-300 transform hover:scale-110"
        aria-label="View live demo"
      >
        <ExternalLink className="w-4 h-4" />
      </a>
    )}
  </div>
));

const FeaturedProjectCarousel: React.FC<{
  projects: Project[];
  currentIndex: number;
  onIndexChange: (index: number) => void;
  isVisible: boolean;
}> = memo(({ projects, currentIndex, onIndexChange, isVisible }) => {
  if (projects.length === 0) return null;

  const nextProject = () => {
    onIndexChange((currentIndex + 1) % projects.length);
  };

  const prevProject = () => {
    onIndexChange(currentIndex === 0 ? projects.length - 1 : currentIndex - 1);
  };

  return (
    <div
      className={`mt-16 transform transition-all duration-700 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      }`}
      style={{ transitionDelay: '400ms' }}
    >
      <h3 className="text-2xl font-bold text-center mb-8 text-gradient">
        Featured Projects
      </h3>

      <div className="relative max-w-4xl mx-auto">
        <div className="overflow-hidden rounded-2xl glass-effect">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {projects.map((project) => (
              <div key={project.id} className="w-full flex-shrink-0">
                <FeaturedProjectCard project={project} />
              </div>
            ))}
          </div>
        </div>

        <CarouselControls
          onPrev={prevProject}
          onNext={nextProject}
          currentIndex={currentIndex}
          totalItems={projects.length}
        />
      </div>
    </div>
  );
});

const FeaturedProjectCard: React.FC<{ project: Project }> = memo(
  ({ project }) => (
    <div className="grid md:grid-cols-2 gap-8 p-8">
      <div
        className={`h-64 bg-gradient-to-br ${project.gradient} rounded-xl flex items-center justify-center text-8xl relative overflow-hidden`}
      >
        <div className="absolute inset-0 bg-black/30"></div>
        <span className="relative z-10">{project.image}</span>
      </div>

      <div className="flex flex-col justify-center space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-2xl font-bold">{project.title}</h4>
          <span className="text-sm text-gray-500 bg-gray-800/50 px-3 py-1 rounded-full">
            {project.role}
          </span>
        </div>

        <p className="text-gray-400 leading-relaxed">{project.description}</p>

        <div className="flex flex-wrap gap-2">
          {project.tech.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 rounded-full text-sm bg-gray-800/50 text-gray-300"
            >
              {tech}
            </span>
          ))}
          {project.tech.length > 4 && (
            <span className="px-3 py-1 rounded-full text-sm bg-gray-800/50 text-gray-500">
              +{project.tech.length - 4} more
            </span>
          )}
        </div>
      </div>
    </div>
  )
);

const CarouselControls: React.FC<{
  onPrev: () => void;
  onNext: () => void;
  currentIndex: number;
  totalItems: number;
}> = memo(({ onPrev, onNext, currentIndex, totalItems }) => (
  <div className="flex items-center justify-center mt-6 space-x-4">
    <button
      onClick={onPrev}
      className="p-3 rounded-full glass-effect hover:bg-gray-700/50 transition-all duration-300 transform hover:scale-110"
      aria-label="Previous project"
    >
      <ChevronLeft className="w-5 h-5" />
    </button>

    <div className="flex space-x-2">
      {Array.from({ length: totalItems }).map((_, index) => (
        <button
          key={index}
          className={`w-3 h-3 rounded-full transition-all duration-300 ${
            index === currentIndex ? 'bg-cyan-400' : 'bg-gray-600'
          }`}
          aria-label={`Go to project ${index + 1}`}
        />
      ))}
    </div>

    <button
      onClick={onNext}
      className="p-3 rounded-full glass-effect hover:bg-gray-700/50 transition-all duration-300 transform hover:scale-110"
      aria-label="Next project"
    >
      <ChevronRight className="w-5 h-5" />
    </button>
  </div>
));

ProjectsSection.displayName = 'ProjectsSection';
ProjectFilters.displayName = 'ProjectFilters';
ProjectGrid.displayName = 'ProjectGrid';
ProjectCard.displayName = 'ProjectCard';
ProjectLinks.displayName = 'ProjectLinks';
FeaturedProjectCarousel.displayName = 'FeaturedProjectCarousel';
FeaturedProjectCard.displayName = 'FeaturedProjectCard';
CarouselControls.displayName = 'CarouselControls';

export default ProjectsSection;
