import { useState, useEffect } from 'react';

export const useActiveSection = (sections: string[]): string => {
  const [activeSection, setActiveSection] = useState<string>(sections[0]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        threshold: 0.6,
        rootMargin: '-10% 0px -10% 0px',
      }
    );

    sections.forEach((section) => {
      const element = document.getElementById(section);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [sections]);

  return activeSection;
};
