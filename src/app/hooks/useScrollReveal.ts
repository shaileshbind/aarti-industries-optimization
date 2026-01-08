'use client';

import { useEffect, useRef, RefObject } from 'react';
import { useGSAP } from '../contexts/GSAPContext';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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
  config: ScrollRevealConfig = {}
): RefObject<HTMLElement | null> => {
  const elementRef = useRef<HTMLElement>(null);
  const animationRef = useRef<gsap.core.Tween | null>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);
  const isInitializedRef = useRef(false);
  const configRef = useRef(config);
  const { gsap: gsapInstance, ScrollTrigger: ST } = useGSAP();

  // Update config ref when config changes, but don't re-initialize
  useEffect(() => {
    configRef.current = config;
  }, [config]);

  useEffect(() => {
    if (!ST || !gsapInstance) return;
    if (isInitializedRef.current) return;

    // Use requestAnimationFrame to ensure DOM is ready
    const initAnimation = () => {
      if (!elementRef.current || isInitializedRef.current) return;

      const element = elementRef.current;
      const currentConfig = configRef.current;
      const {
        from = { autoAlpha: 0, y: 50, scale: 0.9 },
        to = { autoAlpha: 1, y: 0, scale: 1 },
        duration = 1,
        delay = 0,
        stagger = 0.2,
        ease = 'power3.out',
        trigger,
        start = 'top 90%',
        end,
        toggleActions = 'play reverse play reverse', // Allow re-triggering on scroll
        scrub = false,
        pin = false,
        pinSpacing = true,
        isGroup = false,
        groupSelector = '[data-scroll]',
        onComplete,
        onStart,
        onUpdate,
      } = currentConfig;

      // Set initial state explicitly to ensure element is hidden before animation
      let elements: Element | NodeListOf<Element> = element;
      
      // If it's a group, get all child elements
      if (isGroup) {
        const nodeList = element.querySelectorAll(groupSelector);
        if (nodeList.length === 0) return;
        elements = nodeList;
      }

      // Set initial state explicitly to ensure visibility is controlled
      if (elements instanceof NodeList) {
        Array.from(elements).forEach((el) => {
          gsapInstance.set(el, from ?? {});
        });
      } else {
        gsapInstance.set(elements, from ?? {});
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

      // Create ScrollTrigger - allows re-triggering on scroll but prevents re-initialization on re-renders
      const scrollTrigger = ST.create({
        trigger: trigger || element,
        animation,
        start,
        end,
        toggleActions, // 'play reverse play reverse' allows animation to play again when scrolling
        scrub,
        pin,
        pinSpacing,
      });

      // Store references
      animationRef.current = animation;
      scrollTriggerRef.current = scrollTrigger;
      isInitializedRef.current = true;

      // Refresh ScrollTrigger after a brief delay to ensure it's properly initialized
      requestAnimationFrame(() => {
        ST.refresh();
      });
    };

    // Use double requestAnimationFrame to ensure DOM is fully ready
    const rafId = requestAnimationFrame(() => {
      requestAnimationFrame(initAnimation);
    });

    return () => {
      cancelAnimationFrame(rafId);
      if (animationRef.current) {
        animationRef.current.kill();
        animationRef.current = null;
      }
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill();
        scrollTriggerRef.current = null;
      }
      isInitializedRef.current = false;
    };
  }, [ST, gsapInstance]); // Only depend on ST and gsapInstance, not config

  return elementRef;
};

/**
 * Predefined scroll reveal animations
 */

// Fade in with slide up
export const useFadeInReveal = (
  duration: number = 1,
  delay: number = 0,
  stagger: number = 0.2
) => {
  return useScrollReveal({
    from: { autoAlpha: 0, y: 50 },
    to: { autoAlpha: 1, y: 0 },
    duration,
    delay,
    stagger,
    ease: 'power3.out',
  });
};

// Scale in animation
export const useScaleInReveal = (
  duration: number = 1,
  delay: number = 0,
  stagger: number = 0.2
) => {
  return useScrollReveal({
    from: { autoAlpha: 0, scale: 0.8 },
    to: { autoAlpha: 1, scale: 1 },
    duration,
    delay,
    stagger,
    ease: 'back.out(1.7)',
  });
};

// Slide in from left
export const useSlideInLeftReveal = (
  duration: number = 1,
  delay: number = 0,
  stagger: number = 0.2
) => {
  return useScrollReveal({
    from: { autoAlpha: 0, x: -100 },
    to: { autoAlpha: 1, x: 0 },
    duration,
    delay,
    stagger,
    ease: 'power3.out',
  });
};

// Slide in from right
export const useSlideInRightReveal = (
  duration: number = 1,
  delay: number = 0,
  stagger: number = 0.2
) => {
  return useScrollReveal({
    from: { autoAlpha: 0, x: 100 },
    to: { autoAlpha: 1, x: 0 },
    duration,
    delay,
    stagger,
    ease: 'power3.out',
  });
};

// Rotate in animation
export const useRotateInReveal = (
  duration: number = 1,
  delay: number = 0,
  stagger: number = 0.2
) => {
  return useScrollReveal({
    from: { autoAlpha: 0, rotation: -180 },
    to: { autoAlpha: 1, rotation: 0 },
    duration,
    delay,
    stagger,
    ease: 'power3.out',
  });
};

// Bounce in animation
export const useBounceInReveal = (
  duration: number = 1,
  delay: number = 0,
  stagger: number = 0.2
) => {
  return useScrollReveal({
    from: { autoAlpha: 0, scale: 0.3 },
    to: { autoAlpha: 1, scale: 1 },
    duration,
    delay,
    stagger,
    ease: 'bounce.out',
  });
};

// Group animation for multiple elements
export const useGroupReveal = (
  animationType: 'fadeIn' | 'scaleIn' | 'slideInLeft' | 'slideInRight' | 'rotateIn' | 'bounceIn' = 'fadeIn',
  duration: number = 1,
  delay: number = 0,
  stagger: number = 0.2
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
  });
};
