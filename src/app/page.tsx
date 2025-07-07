'use client';

import React, { Suspense, lazy } from 'react';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { PortfolioProvider } from '@/context/PortfolioContext';

const ThreeBackground = lazy(
  () => import('@/components/three/ThreeBackground')
);
const Header = lazy(() => import('@/components/layout/Header'));
const HeroSection = lazy(() => import('@/components/sections/HeroSection'));
const AboutSection = lazy(() => import('@/components/sections/AboutSection'));
const SkillsSection = lazy(() => import('@/components/sections/SkillsSection'));
const ProjectsSection = lazy(
  () => import('@/components/sections/ProjectsSection')
);
const ExperienceSection = lazy(
  () => import('@/components/sections/ExperienceSection')
);
const ContactSection = lazy(
  () => import('@/components/sections/ContactSection')
);
const Footer = lazy(() => import('@/components/layout/Footer'));
const ScrollIndicator = lazy(
  () => import('@/components/layout/ScrollIndicator')
);

const Portfolio: React.FC = () => {
  return (
    <PortfolioProvider>
      <div
        className="min-h-screen bg-black text-white relative overflow-hidden"
        style={{
          fontFamily:
            "'JetBrains Mono', 'Fira Code', 'Source Code Pro', monospace",
        }}
      >
        <Suspense fallback={<div className="fixed inset-0 bg-black" />}>
          <ThreeBackground />
        </Suspense>
        <div className="fixed inset-0 pointer-events-none z-10 bg-gradient-to-br from-black/80 via-gray-900/60 to-black/80" />
        <Suspense
          fallback={
            <div className="h-16 bg-black/20 backdrop-blur-xl border-b border-gray-800/50" />
          }
        >
          <Header />
        </Suspense>
        <main>
          <Suspense fallback={<LoadingSpinner />}>
            <HeroSection />
          </Suspense>

          <Suspense fallback={<LoadingSpinner />}>
            <AboutSection />
          </Suspense>

          <Suspense fallback={<LoadingSpinner />}>
            <SkillsSection />
          </Suspense>

          <Suspense fallback={<LoadingSpinner />}>
            <ProjectsSection />
          </Suspense>

          <Suspense fallback={<LoadingSpinner />}>
            <ExperienceSection />
          </Suspense>

          <Suspense fallback={<LoadingSpinner />}>
            <ContactSection />
          </Suspense>
        </main>

        <Suspense
          fallback={
            <div className="h-32 bg-black/20 backdrop-blur-sm border-t border-gray-800/50" />
          }
        >
          <Footer />
        </Suspense>

        <Suspense fallback={null}>
          <ScrollIndicator />
        </Suspense>
      </div>
    </PortfolioProvider>
  );
};

export default Portfolio;
