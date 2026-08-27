"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/all";

gsap.registerPlugin(SplitText);

interface AnimatedTextProps {
  children: React.ReactNode;
  className?: string;
}

const AnimatedText: React.FC<AnimatedTextProps> = ({ children, className }) => {
  const comp = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!comp.current) return;

    const ctx = gsap.context(() => {
      const element = comp.current;

      if (!element) return;

      const splitText = new SplitText(element, {
        type: "words",
        wordsClass: "word",
      });

      gsap.from(splitText.words, {
        opacity: 0.2,
        duration: 1,
        stagger: 0.1,
        ease: "power2.in",
        scrollTrigger: {
          trigger: element,
          start: "top 80%",
          end: "bottom 80%",
          scrub: true,
        },
      });
    }, comp);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={comp} className={className}>
      {children}
    </div>
  );
};

export default AnimatedText;
