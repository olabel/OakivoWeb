import { useState, useEffect, useRef, RefObject } from 'react';

export interface UseIntersectionObserverOptions {
  threshold?: number | number[];
  rootMargin?: string;
  triggerOnce?: boolean;
}

/**
 * Custom hook to detect when an element enters the viewport using the browser IntersectionObserver.
 * Gracefully handles SSR, reduced-motion preferences, and legacy browsers.
 */
export function useIntersectionObserver<T extends HTMLElement = HTMLDivElement>(
  options: UseIntersectionObserverOptions = {}
): [RefObject<T | null>, boolean] {
  const { threshold = 0.15, rootMargin = '0px 0px -50px 0px', triggerOnce = true } = options;
  const elementRef = useRef<T | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // If running in SSR or browser does not support IntersectionObserver
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      setIsVisible(true);
      return;
    }

    // Respect reduced motion preference
    try {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      if (mediaQuery.matches) {
        setIsVisible(true);
        return;
      }
    } catch {
      // Fallback
    }

    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            if (triggerOnce) {
              observer.unobserve(entry.target);
            }
          } else if (!triggerOnce) {
            setIsVisible(false);
          }
        });
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, triggerOnce]);

  return [elementRef, isVisible];
}

export default useIntersectionObserver;
