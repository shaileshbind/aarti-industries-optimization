"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";

interface SmoothScrollContainerProps {
  children: React.ReactNode;
  className?: string;
}

export default function SmoothScrollContainer({
  children,
  className,
}: SmoothScrollContainerProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const content = contentRef.current;
    if (!wrapper || !content) return;

    const nestedLenis = new Lenis({
      wrapper,
      content,
      duration: 1.3,
      orientation: "vertical",
      virtualScroll: (data) => {
        const { deltaY } = data;
        const target = nestedLenis.targetScroll;
        const limit = nestedLenis.limit;

        const atTop = target <= 0 && deltaY < 0;
        const atBottom = target >= limit && deltaY > 0;

        if (atTop || atBottom) return false;

        return true;
      },
    });
    lenisRef.current = nestedLenis;

    const tickerCallback = (time: number) => {
      nestedLenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerCallback);

    return () => {
      gsap.ticker.remove(tickerCallback);
      nestedLenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return (
    <div ref={wrapperRef} className={className}>
      <div ref={contentRef}>{children}</div>
    </div>
  );
}
