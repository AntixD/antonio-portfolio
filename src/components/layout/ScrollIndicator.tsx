'use client';

import React, { memo, useEffect, useState } from 'react';
import { NAVIGATION_ITEMS } from '../../data/constants';

type NavigationItem = (typeof NAVIGATION_ITEMS)[number];

const ScrollIndicator: React.FC = memo(() => {
  const [activeSection, setActiveSection] = useState<NavigationItem>('home');

  useEffect(() => {
    let lastActiveSection: NavigationItem = 'home';

    const observerOptions = {
      threshold: [0.1, 0.3, 0.5],
      rootMargin: '-10% 0px -10% 0px',
    };

    const observer = new IntersectionObserver((entries) => {
      const sortedEntries = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

      if (sortedEntries.length > 0) {
        const mostVisibleEntry = sortedEntries[0];
        const sectionId = mostVisibleEntry.target.id as NavigationItem;

        if (NAVIGATION_ITEMS.includes(sectionId)) {
          lastActiveSection = sectionId;
          setActiveSection(sectionId);
        }
      }
    }, observerOptions);

    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      let currentSection: NavigationItem = 'home';

      NAVIGATION_ITEMS.forEach((sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          const elementTop = window.scrollY + rect.top;
          const elementBottom = elementTop + rect.height;

          if (scrollPosition >= elementTop && scrollPosition <= elementBottom) {
            currentSection = sectionId;
          }
        }
      });

      if (currentSection !== lastActiveSection) {
        lastActiveSection = currentSection;
        setActiveSection(currentSection);
      }
    };

    NAVIGATION_ITEMS.forEach((sectionId) => {
      const element = document.getElementById(sectionId);
      if (element) {
        observer.observe(element);
      }
    });

    window.addEventListener('scroll', handleScroll, { passive: true });

    handleScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToSection = (sectionId: NavigationItem) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.offsetTop;
      const offsetPosition = elementPosition - headerOffset;

      setActiveSection(sectionId);

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50 hidden lg:block">
      <div className="flex flex-col space-y-3">
        {NAVIGATION_ITEMS.map((section, index) => (
          <div key={section} className="relative group">
            <button
              onClick={() => scrollToSection(section)}
              className={`block w-4 h-4 rounded-full transition-all duration-300 transform hover:scale-125 ${
                activeSection === section
                  ? 'bg-cyan-400 shadow-lg shadow-cyan-400/50 scale-125'
                  : 'bg-gray-600 hover:bg-gray-500'
              }`}
              aria-label={`Navigate to ${section} section`}
            />

            <div className="absolute right-6 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
              <div className="bg-black/90 text-white px-3 py-1 rounded-lg text-sm font-medium backdrop-blur-sm border border-gray-700/50 whitespace-nowrap">
                {section.charAt(0).toUpperCase() + section.slice(1)}
                <div className="absolute left-full top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-4 border-l-black/90 border-t-2 border-t-transparent border-b-2 border-b-transparent"></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-800 -z-10 transform -translate-x-1/2">
        <div
          className="w-full bg-gradient-to-b from-cyan-400 to-purple-500 transition-all duration-300 ease-out"
          style={{
            height: `${
              ((NAVIGATION_ITEMS.indexOf(activeSection) + 1) /
                NAVIGATION_ITEMS.length) *
              100
            }%`,
          }}
        />
      </div>
    </div>
  );
});

ScrollIndicator.displayName = 'ScrollIndicator';

export default ScrollIndicator;
