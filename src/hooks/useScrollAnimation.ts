import { useState, useEffect } from 'react';

interface ScrollAnimationConfig {
  threshold?: number;
  rootMargin?: string;
}

export const useScrollAnimation = (
  ref: React.RefObject<HTMLElement>,
  config?: ScrollAnimationConfig
): boolean => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const { threshold = 0.1, rootMargin = '0px' } = config || {};

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin }
    );

    const element = ref.current;
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, [ref, config]);

  return isVisible;
};
