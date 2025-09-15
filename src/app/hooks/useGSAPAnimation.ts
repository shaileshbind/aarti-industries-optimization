'use client';

import { useEffect, useRef } from 'react';
import { useGSAP } from '../contexts/GSAPContext';

interface AnimationConfig {
  from?: Record<string, string | number>;
  to?: Record<string, string | number>;
  duration?: number;
  delay?: number;
  ease?: string;
  scrollTrigger?: Record<string, unknown>;
  timeline?: { add: (animation: unknown, position?: number) => void };
  onComplete?: () => void;
  onStart?: () => void;
}

export const useGSAPAnimation = (
  config: AnimationConfig,
  dependencies: React.DependencyList = []
) => {
  const elementRef = useRef<HTMLElement>(null);
  const { gsap: gsapInstance, ScrollTrigger: ST } = useGSAP();

  useEffect(() => {
    if (!elementRef.current) return;

    const element = elementRef.current;
    const {
      from,
      to,
      duration = 1,
      delay = 0,
      ease = 'power2.out',
      scrollTrigger,
      timeline,
      onComplete,
      onStart,
    } = config;

    // Set initial state
    if (from) {
      gsapInstance.set(element, from);
    }

    // Create animation
    const animation = gsapInstance.to(element, {
      ...to,
      duration,
      delay,
      ease,
      onComplete,
      onStart,
    });

    // Add ScrollTrigger if provided
    if (scrollTrigger) {
      ST.create({
        trigger: element,
        animation,
        ...scrollTrigger,
      });
    }

    // Add to timeline if provided
    if (timeline) {
      timeline.add(animation, 0);
    }

    return () => {
      animation.kill();
      ST.getAll().forEach(trigger => {
        if (trigger.animation === animation) {
          trigger.kill();
        }
      });
    };
  }, [ST, config, gsapInstance, dependencies]);

  return elementRef;
};

// Hook for fade in animation
export const useFadeIn = (
  duration: number = 1,
  delay: number = 0,
  scrollTrigger?: Record<string, unknown>
) => {
  return useGSAPAnimation({
    from: { opacity: 0, y: 20 },
    to: { opacity: 1, y: 0 },
    duration,
    delay,
    scrollTrigger,
  });
};

// Hook for slide in from left
export const useSlideInLeft = (
  duration: number = 1,
  delay: number = 0,
  scrollTrigger?: Record<string, unknown>
) => {
  return useGSAPAnimation({
    from: { x: -100, opacity: 0 },
    to: { x: 0, opacity: 1 },
    duration,
    delay,
    scrollTrigger,
  });
};

// Hook for slide in from right
export const useSlideInRight = (
  duration: number = 1,
  delay: number = 0,
  scrollTrigger?: Record<string, unknown>
) => {
  return useGSAPAnimation({
    from: { x: 100, opacity: 0 },
    to: { x: 0, opacity: 1 },
    duration,
    delay,
    scrollTrigger,
  });
};

// Hook for scale animation
export const useScaleIn = (
  duration: number = 1,
  delay: number = 0,
  scrollTrigger?: Record<string, unknown>
) => {
  return useGSAPAnimation({
    from: { scale: 0, opacity: 0 },
    to: { scale: 1, opacity: 1 },
    duration,
    delay,
    scrollTrigger,
  });
};

// Hook for rotation animation
export const useRotateIn = (
  duration: number = 1,
  delay: number = 0,
  scrollTrigger?: Record<string, unknown>
) => {
  return useGSAPAnimation({
    from: { rotation: -180, opacity: 0 },
    to: { rotation: 0, opacity: 1 },
    duration,
    delay,
    scrollTrigger,
  });
};
