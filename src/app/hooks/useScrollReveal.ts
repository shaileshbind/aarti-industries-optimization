'use client';

import { useEffect, useRef, RefObject } from 'react';
import { useGSAP } from '../contexts/GSAPContext';

type GsapTweenVars = Record<string, unknown>;

export interface ScrollRevealConfig {
  // Animation properties
  from?: GsapTweenVars;
  to?: GsapTweenVars;
  duration?: number;
  delay?: number;
  stagger?: number;
  ease?: string;
  
  // ScrollTrigger properties
  trigger?: string | Element;
  start?: string;
  end?: string;
  toggleActions?: string;
  scrub?: boolean | number;
  pin?: boolean;
  pinSpacing?: boolean;
  
  // Group animation properties
  isGroup?: boolean;
  groupSelector?: string;
  
  // Callbacks
  onComplete?: () => void;
  onStart?: () => void;
  onUpdate?: () => void;
}

/**
 * Hook for creating scroll-triggered reveal animations
 * Perfect for animating elements as they come into view
 */
export const useScrollReveal = (
  config: ScrollRevealConfig = {},
  dependencies: React.DependencyList = []
): RefObject<HTMLElement | null> => {
  const elementRef = useRef<HTMLElement>(null);
  const { gsap: gsapInstance, ScrollTrigger: ST } = useGSAP();

  useEffect(() => {
    if (!elementRef.current) return;

    const element = elementRef.current;
    const {
      from = { autoAlpha: 0, y: 50, scale: 0.9 },
      to = { autoAlpha: 1, y: 0, scale: 1 },
      duration = 1,
      delay = 0,
      stagger = 0.2,
      ease = 'power3.out',
      trigger,
      start = 'top 80%',
      end,
      toggleActions = 'play none none reverse',
      scrub = false,
      pin = false,
      pinSpacing = true,
      isGroup = false,
      groupSelector = '[data-scroll]',
      onComplete,
      onStart,
      onUpdate,
    } = config;

    // Don't set initial styles inline to avoid visibility issues
    // Instead, we'll use fromTo animation which handles initial state properly
    let elements: Element | NodeListOf<Element> = element;
    
    // If it's a group, get all child elements
    if (isGroup) {
      const nodeList = element.querySelectorAll(groupSelector);
      if (nodeList.length === 0) return;
      elements = nodeList;
    }

    // Create animation using fromTo to properly handle initial state
    const animation = gsapInstance.fromTo(elements, from ?? {}, {
      ...(to ?? {}),
      duration,
      delay,
      stagger: isGroup ? stagger : undefined,
      ease,
      onComplete,
      onStart,
      onUpdate,
    });

    // Create ScrollTrigger
    const scrollTrigger = ST.create({
      trigger: trigger || element,
      animation,
      start,
      end,
      toggleActions,
      scrub,
      pin,
      pinSpacing,
    });

    return () => {
      animation.kill();
      scrollTrigger.kill();
    };
  }, [ST, config, gsapInstance, dependencies]);

  return elementRef;
};

/**
 * Predefined scroll reveal animations
 */

// Fade in with slide up
export const useFadeInReveal = (
  duration: number = 1,
  delay: number = 0,
  stagger: number = 0.2,
  dependencies: React.DependencyList = []
) => {
  return useScrollReveal({
    from: { autoAlpha: 0, y: 50 },
    to: { autoAlpha: 1, y: 0 },
    duration,
    delay,
    stagger,
    ease: 'power3.out',
  }, dependencies);
};

// Scale in animation
export const useScaleInReveal = (
  duration: number = 1,
  delay: number = 0,
  stagger: number = 0.2,
  dependencies: React.DependencyList = []
) => {
  return useScrollReveal({
    from: { autoAlpha: 0, scale: 0.8 },
    to: { autoAlpha: 1, scale: 1 },
    duration,
    delay,
    stagger,
    ease: 'back.out(1.7)',
  }, dependencies);
};

// Slide in from left
export const useSlideInLeftReveal = (
  duration: number = 1,
  delay: number = 0,
  stagger: number = 0.2,
  dependencies: React.DependencyList = []
) => {
  return useScrollReveal({
    from: { autoAlpha: 0, x: -100 },
    to: { autoAlpha: 1, x: 0 },
    duration,
    delay,
    stagger,
    ease: 'power3.out',
  }, dependencies);
};

// Slide in from right
export const useSlideInRightReveal = (
  duration: number = 1,
  delay: number = 0,
  stagger: number = 0.2,
  dependencies: React.DependencyList = []
) => {
  return useScrollReveal({
    from: { autoAlpha: 0, x: 100 },
    to: { autoAlpha: 1, x: 0 },
    duration,
    delay,
    stagger,
    ease: 'power3.out',
  }, dependencies);
};

// Rotate in animation
export const useRotateInReveal = (
  duration: number = 1,
  delay: number = 0,
  stagger: number = 0.2,
  dependencies: React.DependencyList = []
) => {
  return useScrollReveal({
    from: { autoAlpha: 0, rotation: -180 },
    to: { autoAlpha: 1, rotation: 0 },
    duration,
    delay,
    stagger,
    ease: 'power3.out',
  }, dependencies);
};

// Bounce in animation
export const useBounceInReveal = (
  duration: number = 1,
  delay: number = 0,
  stagger: number = 0.2,
  dependencies: React.DependencyList = []
) => {
  return useScrollReveal({
    from: { autoAlpha: 0, scale: 0.3 },
    to: { autoAlpha: 1, scale: 1 },
    duration,
    delay,
    stagger,
    ease: 'bounce.out',
  }, dependencies);
};

// Group animation for multiple elements
export const useGroupReveal = (
  animationType: 'fadeIn' | 'scaleIn' | 'slideInLeft' | 'slideInRight' | 'rotateIn' | 'bounceIn' = 'fadeIn',
  duration: number = 1,
  delay: number = 0,
  stagger: number = 0.2,
  dependencies: React.DependencyList = []
) => {
  const animations = {
    fadeIn: { from: { autoAlpha: 0, y: 50 }, to: { autoAlpha: 1, y: 0 } },
    scaleIn: { from: { autoAlpha: 0, scale: 0.8 }, to: { autoAlpha: 1, scale: 1 } },
    slideInLeft: { from: { autoAlpha: 0, x: -100 }, to: { autoAlpha: 1, x: 0 } },
    slideInRight: { from: { autoAlpha: 0, x: 100 }, to: { autoAlpha: 1, x: 0 } },
    rotateIn: { from: { autoAlpha: 0, rotation: -180 }, to: { autoAlpha: 1, rotation: 0 } },
    bounceIn: { from: { autoAlpha: 0, scale: 0.3 }, to: { autoAlpha: 1, scale: 1 } },
  };

  return useScrollReveal({
    ...animations[animationType],
    duration,
    delay,
    stagger,
    isGroup: true,
    groupSelector: '[data-scroll]',
    ease: animationType === 'bounceIn' ? 'bounce.out' : 'power3.out',
  }, dependencies);
};
