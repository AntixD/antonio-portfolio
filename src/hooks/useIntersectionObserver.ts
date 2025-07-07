import { useEffect, useRef, useState } from 'react';

interface UseIntersectionObserverOptions extends IntersectionObserverInit {
  triggerOnce?: boolean;
}

export const useIntersectionObserver = <T extends HTMLElement>(
  options?: UseIntersectionObserverOptions
): [React.RefObject<T | null>, boolean] => {
  const ref = useRef<T | null>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const { triggerOnce = false, ...observerOptions } = options || {};

    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);

      if (entry.isIntersecting && triggerOnce) {
        observer.disconnect();
      }
    }, observerOptions);

    const element = ref.current;
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, [options]);

  return [ref, isIntersecting];
};
