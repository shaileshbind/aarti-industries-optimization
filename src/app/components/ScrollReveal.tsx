"use client";

import React, { ReactNode, useRef, useEffect } from "react";
import { useScrollReveal, ScrollRevealConfig } from "../hooks/useScrollReveal";
import { gsap } from "gsap";
import SplitType from "split-type";

interface ScrollRevealProps extends ScrollRevealConfig {
  children: ReactNode;
  className?: string;
  as?: React.ElementType;
  disabled?: boolean;
}

/**
 * ScrollReveal Component
 * A wrapper component that automatically applies scroll-triggered reveal animations
 *
 * Usage:
 * <ScrollReveal animation="fadeIn" delay={0.2}>
 *   <div>Your content here</div>
 * </ScrollReveal>
 */
export const ScrollReveal = ({
  children,
  className = "",
  as: Component = "div",
  disabled = false,
  ...config
}: ScrollRevealProps) => {
  const ref = useScrollReveal(disabled ? {} : config);

  return (
    <Component ref={ref} className={className}>
      {children}
    </Component>
  );
};

/**
 * ScrollGroup Component
 * Groups multiple elements for staggered animations
 *
 * Usage:
 * <ScrollGroup animation="fadeIn" stagger={0.2}>
 *   <div data-scroll>Item 1</div>
 *   <div data-scroll>Item 2</div>
 *   <div data-scroll>Item 3</div>
 * </ScrollGroup>
 */
interface ScrollGroupProps extends ScrollRevealConfig {
  children: ReactNode;
  className?: string;
  as?: React.ElementType;
  disabled?: boolean;
  groupSelector?: string;
  y?: number;
}

export const ScrollGroup = ({
  children,
  className = "",
  as: Component = "div",
  disabled = false,
  groupSelector = "[data-scroll]",
  ...config
}: ScrollGroupProps) => {
  const ref = useScrollReveal(
    disabled
      ? {}
      : {
          ...config,
          isGroup: true,
          groupSelector,
        },
  );

  return (
    <Component ref={ref} className={className} data-scroll-group>
      {children}
    </Component>
  );
};

/**
 * Predefined animation components for common use cases
 */

// Fade in with slide up
export const FadeInReveal = ({
  children,
  className = "",
  delay = 0,
  duration = 1,
  stagger = 0.2,
  ...props
}: Omit<ScrollRevealProps, "from" | "to">) => (
  <ScrollReveal
    from={{ autoAlpha: 0, y: 16 }}
    to={{ autoAlpha: 1, y: 0 }}
    duration={duration}
    delay={delay}
    stagger={stagger}
    ease="power3.out"
    className={className}
    {...props}
  >
    {children}
  </ScrollReveal>
);

// Fade in with slide up + blur effect
export const FadeInRevealBlur = ({
  children,
  className = "",
  delay = 0,
  duration = 1,
  stagger = 0.2,
  ...props
}: Omit<ScrollRevealProps, "from" | "to">) => (
  <ScrollReveal
    from={{ autoAlpha: 0, y: 16 }}
    to={{ autoAlpha: 1, y: 0 }}
    duration={duration}
    delay={delay}
    stagger={stagger}
    ease="power3.out"
    className={className}
    {...props}
  >
    {children}
  </ScrollReveal>
);

// Scale in animation
export const ScaleInReveal = ({
  children,
  className = "",
  delay = 0,
  duration = 1,
  stagger = 0.2,
  ...props
}: Omit<ScrollRevealProps, "from" | "to">) => (
  <ScrollReveal
    from={{ autoAlpha: 0, scale: 0.8 }}
    to={{ autoAlpha: 1, scale: 1 }}
    duration={duration}
    delay={delay}
    stagger={stagger}
    ease="back.out(1.7)"
    className={className}
    {...props}
  >
    {children}
  </ScrollReveal>
);

// Slide in from left
export const SlideInLeftReveal = ({
  children,
  className = "",
  delay = 0,
  duration = 1,
  stagger = 0.2,
  ...props
}: Omit<ScrollRevealProps, "from" | "to">) => (
  <ScrollReveal
    from={{ autoAlpha: 0, x: -100 }}
    to={{ autoAlpha: 1, x: 0 }}
    duration={duration}
    delay={delay}
    stagger={stagger}
    ease="power3.out"
    className={className}
    {...props}
  >
    {children}
  </ScrollReveal>
);

// Slide in from right
export const SlideInRightReveal = ({
  children,
  className = "",
  delay = 0,
  duration = 1,
  stagger = 0.2,
  ...props
}: Omit<ScrollRevealProps, "from" | "to">) => (
  <ScrollReveal
    from={{ autoAlpha: 0, x: 100 }}
    to={{ autoAlpha: 1, x: 0 }}
    duration={duration}
    delay={delay}
    stagger={stagger}
    ease="power3.out"
    className={className}
    {...props}
  >
    {children}
  </ScrollReveal>
);

// Rotate in animation
export const RotateInReveal = ({
  children,
  className = "",
  delay = 0,
  duration = 1,
  stagger = 0.2,
  ...props
}: Omit<ScrollRevealProps, "from" | "to">) => (
  <ScrollReveal
    from={{ autoAlpha: 0, rotation: -180 }}
    to={{ autoAlpha: 1, rotation: 0 }}
    duration={duration}
    delay={delay}
    stagger={stagger}
    ease="power3.out"
    className={className}
    {...props}
  >
    {children}
  </ScrollReveal>
);

// Bounce in animation
export const BounceInReveal = ({
  children,
  className = "",
  delay = 0,
  duration = 1,
  stagger = 0.2,
  ...props
}: Omit<ScrollRevealProps, "from" | "to">) => (
  <ScrollReveal
    from={{ autoAlpha: 0, scale: 0.3 }}
    to={{ autoAlpha: 1, scale: 1 }}
    duration={duration}
    delay={delay}
    stagger={stagger}
    ease="bounce.out"
    className={className}
    {...props}
  >
    {children}
  </ScrollReveal>
);

// Group animations
export const FadeInGroup = ({
  children,
  className = "",
  delay = 0,
  duration = 1,
  stagger = 0.2,
  y = 50,
  ...props
}: Omit<ScrollGroupProps, "from" | "to">) => (
  <ScrollGroup
    from={{ autoAlpha: 0, y: y }}
    to={{ autoAlpha: 1, y: 0 }}
    duration={duration}
    delay={delay}
    stagger={stagger}
    ease="power3.out"
    className={className}
    {...props}
  >
    {children}
  </ScrollGroup>
);

export const ScaleInGroup = ({
  children,
  className = "",
  delay = 0,
  duration = 1,
  stagger = 0.2,
  ...props
}: Omit<ScrollGroupProps, "from" | "to">) => (
  <ScrollGroup
    from={{ autoAlpha: 0, scale: 0.8 }}
    to={{ autoAlpha: 1, scale: 1 }}
    duration={duration}
    delay={delay}
    stagger={stagger}
    ease="back.out(1.7)"
    className={className}
    {...props}
  >
    {children}
  </ScrollGroup>
);

export const SlideInLeftGroup = ({
  children,
  className = "",
  delay = 0,
  duration = 1,
  stagger = 0.2,
  ...props
}: Omit<ScrollGroupProps, "from" | "to">) => (
  <ScrollGroup
    from={{ autoAlpha: 0, x: -100 }}
    to={{ autoAlpha: 1, x: 0 }}
    duration={duration}
    delay={delay}
    stagger={stagger}
    ease="power3.out"
    className={className}
    {...props}
  >
    {children}
  </ScrollGroup>
);

export const SlideInRightGroup = ({
  children,
  className = "",
  delay = 0,
  duration = 1,
  stagger = 0.2,
  ...props
}: Omit<ScrollGroupProps, "from" | "to">) => (
  <ScrollGroup
    from={{ autoAlpha: 0, x: 100 }}
    to={{ autoAlpha: 1, x: 0 }}
    duration={duration}
    delay={delay}
    stagger={stagger}
    ease="power3.out"
    className={className}
    {...props}
  >
    {children}
  </ScrollGroup>
);

export const RotateInGroup = ({
  children,
  className = "",
  delay = 0,
  duration = 1,
  stagger = 0.2,
  ...props
}: Omit<ScrollGroupProps, "from" | "to">) => (
  <ScrollGroup
    from={{ autoAlpha: 0, rotation: -180 }}
    to={{ autoAlpha: 1, rotation: 0 }}
    duration={duration}
    delay={delay}
    stagger={stagger}
    ease="power3.out"
    className={className}
    {...props}
  >
    {children}
  </ScrollGroup>
);

export const BounceInGroup = ({
  children,
  className = "",
  delay = 0,
  duration = 1,
  stagger = 0.2,
  ...props
}: Omit<ScrollGroupProps, "from" | "to">) => (
  <ScrollGroup
    from={{ autoAlpha: 0, scale: 0.3 }}
    to={{ autoAlpha: 1, scale: 1 }}
    duration={duration}
    delay={delay}
    stagger={stagger}
    ease="bounce.out"
    className={className}
    {...props}
  >
    {children}
  </ScrollGroup>
);

/**
 * Typewriter animation component
 * Creates a typewriter effect by animating individual characters
 */
interface TypewriterRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  stagger?: number;
  trigger?: boolean;
  start?: string;
  end?: string;
  toggleActions?: string;
}

export const TypewriterReveal = ({
  children,
  className = "",
  delay = 0,
  duration = 0.05,
  stagger = 0.05,
  trigger = true,
  start = "top 80%",
  end = "bottom 20%",
  toggleActions = "play none none none",
}: TypewriterRevealProps) => {
  const textRef = useRef<HTMLDivElement>(null);
  const isInitializedRef = useRef(false);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (!textRef.current || !trigger || isInitializedRef.current) return;

    const text = textRef.current;

    // Split text into characters for typewriter effect
    const textContent = text.textContent || "";
    text.innerHTML = textContent
      .split("")
      .map(
        (char) =>
          `<span class="inline-block">${char === " " ? "&nbsp;" : char}</span>`,
      )
      .join("");

    const spans = text.querySelectorAll("span");

    // Set initial state - all characters invisible
    gsap.set(spans, { opacity: 0 });

    // Create animation timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: text,
        start,
        end,
        toggleActions, // Only play once
      },
    });

    // Animate each character with stagger
    tl.to(spans, {
      opacity: 1,
      duration,
      delay,
      stagger,
      ease: "power2.out",
    });

    timelineRef.current = tl;
    isInitializedRef.current = true;

    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
        timelineRef.current = null;
      }
      isInitializedRef.current = false;
    };
  }, []); // Empty deps - only run once on mount

  return (
    <div ref={textRef} className={className}>
      {children}
    </div>
  );
};

/**
 * SplitType animation components
 * These components use SplitType to break text into lines, words, or characters
 * and animate them with scroll-triggered reveals
 */

interface SplitTextRevealProps {
  children: ReactNode;
  className?: string;
  splitType?: "lines" | "words" | "chars";
  delay?: number;
  duration?: number;
  stagger?: number;
  fromY?: number;
  ease?: string;
  trigger?: boolean;
  start?: string;
  end?: string;
  toggleActions?: string;
}

/**
 * LineReveal Component
 * Animates text line by line with scroll trigger
 */
export const LineReveal = ({
  children,
  className = "",
  delay = 0,
  duration = 0.8,
  stagger = 0.1,
  fromY = 40,
  ease = "power4.out",
  trigger = true,
  start = "top 80%",
  end = "bottom 20%",
  toggleActions = "play none none none",
}: SplitTextRevealProps) => {
  const textRef = useRef<HTMLDivElement>(null);
  const splitRef = useRef<InstanceType<typeof SplitType> | null>(null);
  const isInitializedRef = useRef(false);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (!textRef.current || !trigger || isInitializedRef.current) return;

    const text = textRef.current;

    const split = new SplitType(text, { types: "lines" });
    splitRef.current = split;

    // Set initial state
    gsap.set(split.lines, { y: fromY, opacity: 0 });

    // Create animation timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: text,
        start,
        end,
        toggleActions, // Only play once
      },
    });

    // Animate lines
    tl.to(split.lines, {
      y: 0,
      opacity: 1,
      duration,
      delay,
      stagger,
      ease,
    });

    timelineRef.current = tl;
    isInitializedRef.current = true;

    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
        timelineRef.current = null;
      }
      if (splitRef.current) {
        splitRef.current.revert();
        splitRef.current = null;
      }
      isInitializedRef.current = false;
    };
  }, []); // Empty deps - only run once on mount

  return (
    <div ref={textRef} className={className}>
      {children}
    </div>
  );
};

/**
 * WordReveal Component
 * Animates text word by word with scroll trigger
 */
export const WordReveal = ({
  children,
  className = "",
  delay = 0,
  duration = 0.6,
  stagger = 0.05,
  fromY = 30,
  ease = "power3.out",
  trigger = true,
  start = "top 80%",
  end = "bottom 20%",
  toggleActions = "play none none none",
}: SplitTextRevealProps) => {
  const textRef = useRef<HTMLDivElement>(null);
  const splitRef = useRef<InstanceType<typeof SplitType> | null>(null);
  const isInitializedRef = useRef(false);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (!textRef.current || !trigger || isInitializedRef.current) return;

    const text = textRef.current;

    const split = new SplitType(text, { types: "words" });
    splitRef.current = split;

    // Set initial state
    gsap.set(split.words, { y: fromY, opacity: 0 });

    // Create animation timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: text,
        start,
        end,
        toggleActions, // Only play once
      },
    });

    // Animate words
    tl.to(split.words, {
      y: 0,
      opacity: 1,
      duration,
      delay,
      stagger,
      ease,
    });

    timelineRef.current = tl;
    isInitializedRef.current = true;

    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
        timelineRef.current = null;
      }
      if (splitRef.current) {
        splitRef.current.revert();
        splitRef.current = null;
      }
      isInitializedRef.current = false;
    };
  }, []); // Empty deps - only run once on mount

  return (
    <div ref={textRef} className={className}>
      {children}
    </div>
  );
};

/**
 * LetterReveal Component
 * Animates text character by character with scroll trigger
 */
export const LetterReveal = ({
  children,
  className = "",
  delay = 0,
  duration = 0.4,
  stagger = 0.02,
  fromY = 20,
  ease = "power2.out",
  trigger = true,
  start = "top 80%",
  end = "bottom 20%",
  toggleActions = "play none none none",
}: SplitTextRevealProps) => {
  const textRef = useRef<HTMLDivElement>(null);
  const splitRef = useRef<InstanceType<typeof SplitType> | null>(null);
  const isInitializedRef = useRef(false);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (!textRef.current || !trigger || isInitializedRef.current) return;

    const text = textRef.current;

    const split = new SplitType(text, { types: "words,chars" });
    splitRef.current = split;

    if (split.words) {
      split.words.forEach((word) => {
        (word as HTMLElement).style.whiteSpace = "nowrap";
      });
    }

    // Set initial state
    gsap.set(split.chars, { y: fromY, opacity: 0 });

    // Create animation timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: text,
        start,
        end,
        toggleActions, // Only play once
      },
    });

    // Animate characters
    tl.to(split.chars, {
      y: 0,
      opacity: 1,
      duration,
      delay,
      stagger,
      ease,
    });

    timelineRef.current = tl;
    isInitializedRef.current = true;

    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
        timelineRef.current = null;
      }
      if (splitRef.current) {
        splitRef.current.revert();
        splitRef.current = null;
      }
      isInitializedRef.current = false;
    };
  }, []); // Empty deps - only run once on mount

  return (
    <div ref={textRef} className={className}>
      {children}
    </div>
  );
};

/**
 * SplitTextReveal Component
 * A flexible component that allows switching between lines, words, and chars
 */
export const SplitTextReveal = ({
  children,
  className = "",
  splitType = "lines",
  delay = 0,
  duration = 0.8,
  stagger = 0.05,
  fromY = 40,
  ease = "power4.out",
  trigger = true,
  start = "top 80%",
  end = "bottom 20%",
  toggleActions = "play none none none",
}: SplitTextRevealProps) => {
  const textRef = useRef<HTMLDivElement>(null);
  const splitRef = useRef<InstanceType<typeof SplitType> | null>(null);
  const isInitializedRef = useRef(false);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (!textRef.current || !trigger || isInitializedRef.current) return;

    const text = textRef.current;

    const split = new SplitType(text, { types: splitType });
    splitRef.current = split;

    // Set initial state
    gsap.set(split[splitType], { y: fromY, opacity: 0 });

    // Create animation timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: text,
        start,
        end,
        toggleActions, // Only play once
      },
    });

    // Animate based on split type
    tl.to(split[splitType], {
      y: 0,
      opacity: 1,
      duration,
      delay,
      stagger,
      ease,
    });

    timelineRef.current = tl;
    isInitializedRef.current = true;

    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
        timelineRef.current = null;
      }
      if (splitRef.current) {
        splitRef.current.revert();
        splitRef.current = null;
      }
      isInitializedRef.current = false;
    };
  }, []); // Empty deps - only run once on mount

  return (
    <div ref={textRef} className={className}>
      {children}
    </div>
  );
};
